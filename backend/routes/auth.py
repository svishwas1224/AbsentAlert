from flask import Blueprint, request, jsonify, session
from models import User
from werkzeug.security import check_password_hash

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data  = request.get_json()
    email = data.get('email', '').strip()
    pwd   = data.get('password', '').strip()
    role  = data.get('role', '').strip()

    user = User.query.filter_by(email=email, role=role).first()
    if not user or not check_password_hash(user.password, pwd):
        return jsonify({'error': 'Invalid credentials'}), 401

    session['user_id'] = user.id
    return jsonify({'user': user.to_dict()}), 200

@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'message': 'Logged out'}), 200

@auth_bp.route('/me', methods=['GET'])
def me():
    uid = session.get('user_id')
    if not uid:
        return jsonify({'error': 'Not authenticated'}), 401
    user = User.query.get(uid)
    return jsonify({'user': user.to_dict()}), 200
