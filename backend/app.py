from flask import Flask, request, send_from_directory, render_template,redirect
from flask_restful import Api, Resource
import os
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from models import User, Bookmark, db, bcrypt
from config import Config
from routes import UserLoginResource, UserRegisterResource
from flask_jwt_extended import jwt_required, JWTManager
from routes import BookmarkListResource, BookmarkSaveResource,BookmarkSearchResource,BookmarkDetailResource,ProfileResource
from flask_cors import CORS

from dotenv import load_dotenv
load_dotenv()

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config.from_object(Config)


db.init_app(app)
bcrypt.init_app(app)

api = Api(app)
jwt = JWTManager(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return "welcome to bookmark"


api.add_resource(UserRegisterResource, "/register")
api.add_resource(UserLoginResource, "/login")
api.add_resource(BookmarkSaveResource, "/save_bookmark")
api.add_resource(BookmarkListResource, "/bookmarks")
api.add_resource(BookmarkSearchResource, "/search-bookmarks")
api.add_resource(BookmarkDetailResource, "/bookmark/<int:bookmark_id>")
api.add_resource(ProfileResource, '/profile')



if __name__ == '__main__':
    app.run(debug=True)