from flask import request, jsonify
from flask_restful import Resource
from models import db, User, Bookmark
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta

# User Registration
class UserRegisterResource(Resource):
    def post(self):
        data = request.get_json()
        if not data.get("email") or not data.get("password") or not data.get("name") or not data.get("mobile"):
            return {"message": "Name, email, password, and mobile are required."}, 400
        
        # Check if user already exists
        if User.query.filter_by(email=data["email"]).first():
            return {"message": "User with this email already exists."}, 400
        
        user = User(
            name=data["name"],
            email=data["email"],
            mobile=data["mobile"],
            role=data.get("role", "user")  # role is optional, defaults to user
        )
        user.set_password(data["password"])
        
        db.session.add(user)
        db.session.commit()
        
        return {"message": "User registered successfully."}, 201

# User Login
class UserLoginResource(Resource):
    def post(self):
        data = request.get_json()
        if not data.get("email") or not data.get("password"):
            return {"message": "Email and password are required."}, 400
        
        user = User.query.filter_by(email=data["email"]).first()
        if not user or not user.check_password(data["password"]):
            return {"message": "Invalid email or password."}, 401
        
        # Create JWT token with 1 day expiry (customize as needed)
        access_token = create_access_token(identity=str(user.id), expires_delta=timedelta(days=1))
        
        return {
            "message": "Login successful.",
            "access_token": access_token,
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "mobile": user.mobile,
                "role": user.role
            }
        }



class BookmarkSaveResource(Resource):
    @jwt_required()
    def post(self):
        user_id = int(get_jwt_identity())
        data = request.get_json()

        # Get and validate fields
        title = data.get("title")
        url = data.get("url")
        tags = data.get("tags")  # as comma separated string
        description = data.get("description")

        # Basic validation: url is required
        if not url:
            return {"message": "URL is required."}, 400

        # Example: tags could be split to a list if desired
        tags_list = [tag.strip() for tag in tags.split(",")] if tags else []

        # Create your Bookmark object according to your new model
        bookmark = Bookmark(
            user_id=user_id,
            title=title,
            url=url,
            category=tags,              # or tags=tags_list
            description=description
            # Add additional fields as per your db model
        )
        db.session.add(bookmark)
        db.session.commit()

        return {"message": "Bookmark saved successfully.", "bookmark_id": bookmark.id}, 201




# List Bookmarks for logged-in user
class BookmarkListResource(Resource):
    @jwt_required()
    def get(self):
        user_id = int(get_jwt_identity())
        bookmarks = Bookmark.query.filter_by(user_id=user_id).order_by(Bookmark.date_saved.desc()).all()
        
        results = []
        for b in bookmarks:
            results.append({
                "id": b.id,
                "url": b.url,
                "title": b.title,
                "description": b.description,
                "tags":  b.category.split(",") if b.category else [],
                "date_saved": b.date_saved.isoformat()
            })
        
        return {"bookmarks": results}
    

class BookmarkDetailResource(Resource):
    @jwt_required()
    def put(self, bookmark_id):
        user_id = int(get_jwt_identity())
        data = request.get_json()
        
        bookmark = Bookmark.query.filter_by(id=bookmark_id, user_id=user_id).first()
        if not bookmark:
            return {"message": "Bookmark not found"}, 404

        bookmark.title = data.get("title", bookmark.title)
        bookmark.url = data.get("url", bookmark.url)
        bookmark.category = data.get("tags", bookmark.category)
        bookmark.description = data.get("description", bookmark.description)

        db.session.commit()
        return {"message": "Bookmark updated", "bookmark": bookmark.id}

    @jwt_required()
    def delete(self, bookmark_id):
        user_id = int(get_jwt_identity())
        bookmark = Bookmark.query.filter_by(id=bookmark_id, user_id=user_id).first()
        if not bookmark:
            return {"message": "Bookmark not found"}, 404

        db.session.delete(bookmark)
        db.session.commit()
        return {"message": "Bookmark deleted successfully"}


# Search Bookmarks by title or description for logged-in user
class BookmarkSearchResource(Resource):
    @jwt_required()
    def get(self):
        query = request.args.get('q', '')
        user_id = int(get_jwt_identity())
        
        if not query:
            return {"results": []}
        
        # Use case-insensitive search on title or description
        results = Bookmark.query.filter(
            Bookmark.user_id == user_id,
            db.or_(
                Bookmark.title.ilike(f"%{query}%"),
                Bookmark.description.ilike(f"%{query}%")
            )
        ).order_by(Bookmark.date_saved.desc()).all()
        
        data = []
        for b in results:
            data.append({
                "id": b.id,
                "url": b.url,
                "title": b.title,
                "description": b.description,
                "category": b.category,
                "date_saved": b.date_saved.isoformat()
            })
        
        return {"results": data}



class ProfileResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)

        if not user:
            return {"msg": "User not found"}, 404

        return {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "mobile": user.mobile,
            "role": user.role
        }