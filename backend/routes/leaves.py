from flask import Blueprint, request, jsonify, session
from models import Leave, Notification, User
from extensions import db
from datetime import datetime

leaves_bp = Blueprint('leaves', __name__)

@leaves_bp.route('/', methods=['GET'])
def get_leaves():
    uid  = session.get('user_id')
    if not uid:
        return jsonify({'error': 'Not authenticated'}), 401
    user = User.query.get(uid)
    if user.role == 'student':
        leaves = Leave.query.filter_by(student_id=uid).order_by(Leave.id).all()
    else:
        leaves = Leave.query.order_by(Leave.id).all()
    return jsonify([l.to_dict() for l in leaves]), 200

@leaves_bp.route('/', methods=['POST'])
def apply_leave():
    uid = session.get('user_id')
    if not uid:
        return jsonify({'error': 'Not authenticated'}), 401
    d = request.get_json()
    leave = Leave(
        student_id=uid,
        type=d['type'], from_date=d['from'], to_date=d['to'],
        days=d['days'], reason=d['reason'],
        applied_on=datetime.now().strftime('%Y-%m-%d')
    )
    db.session.add(leave)
    db.session.flush()

    notif = Notification(
        user_id=uid, type='pending',
        msg=f"Leave application for {d['from']}{' → ' + d['to'] if d['from'] != d['to'] else ''} submitted successfully.",
        time_label='Just now'
    )
    db.session.add(notif)
    db.session.commit()
    return jsonify(leave.to_dict()), 201

@leaves_bp.route('/<int:lid>', methods=['PATCH'])
def update_leave(lid):
    uid = session.get('user_id')
    if not uid:
        return jsonify({'error': 'Not authenticated'}), 401
    user = User.query.get(uid)
    if user.role != 'faculty':
        return jsonify({'error': 'Forbidden'}), 403

    leave = Leave.query.get_or_404(lid)
    d = request.get_json()
    leave.status  = d.get('status', leave.status)
    leave.remarks = d.get('remarks', leave.remarks)

    notif = Notification(
        user_id=leave.student_id,
        type='approved' if leave.status == 'Approved' else 'rejected',
        msg=f"Your {leave.type} leave for {leave.from_date}{' → ' + leave.to_date if leave.from_date != leave.to_date else ''} has been {leave.status.lower()}.",
        time_label='Just now'
    )
    db.session.add(notif)
    db.session.commit()
    return jsonify(leave.to_dict()), 200
