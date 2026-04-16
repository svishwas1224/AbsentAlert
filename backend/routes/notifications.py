from flask import Blueprint, jsonify, session
from models import Notification
from extensions import db

notifs_bp = Blueprint('notifications', __name__)

@notifs_bp.route('/', methods=['GET'])
def get_notifs():
    uid = session.get('user_id')
    if not uid:
        return jsonify({'error': 'Not authenticated'}), 401
    notifs = Notification.query.filter_by(user_id=uid).order_by(Notification.id.desc()).all()
    return jsonify([n.to_dict() for n in notifs]), 200

@notifs_bp.route('/read-all', methods=['PATCH'])
def mark_read():
    uid = session.get('user_id')
    if not uid:
        return jsonify({'error': 'Not authenticated'}), 401
    Notification.query.filter_by(user_id=uid, is_read=False).update({'is_read': True})
    db.session.commit()
    return jsonify({'message': 'All marked read'}), 200
