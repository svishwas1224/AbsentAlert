from flask import Flask
from flask_cors import CORS
from extensions import db
from routes.auth import auth_bp
from routes.leaves import leaves_bp
from routes.notifications import notifs_bp

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'absentalert-secret-2024'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///absentalert.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    CORS(app, resources={r"/api/*": {"origins": "*"}})
    db.init_app(app)

    app.register_blueprint(auth_bp,   url_prefix='/api/auth')
    app.register_blueprint(leaves_bp, url_prefix='/api/leaves')
    app.register_blueprint(notifs_bp, url_prefix='/api/notifications')

    with app.app_context():
        db.create_all()
        from seed import seed_db
        seed_db()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
