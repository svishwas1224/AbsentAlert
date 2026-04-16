from extensions import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'
    id          = db.Column(db.Integer, primary_key=True)
    roll_id     = db.Column(db.String(20), unique=True, nullable=False)
    name        = db.Column(db.String(100), nullable=False)
    email       = db.Column(db.String(120), unique=True, nullable=False)
    password    = db.Column(db.String(200), nullable=False)
    role        = db.Column(db.String(10), nullable=False)   # student | faculty
    dept        = db.Column(db.String(100))
    year        = db.Column(db.String(20))
    faculty     = db.Column(db.String(100))
    designation = db.Column(db.String(100))

    def to_dict(self):
        return {
            'id': self.id, 'roll_id': self.roll_id, 'name': self.name,
            'email': self.email, 'role': self.role, 'dept': self.dept,
            'year': self.year, 'faculty': self.faculty,
            'designation': self.designation
        }


class Leave(db.Model):
    __tablename__ = 'leaves'
    id         = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    type       = db.Column(db.String(30), nullable=False)
    from_date  = db.Column(db.String(12), nullable=False)
    to_date    = db.Column(db.String(12), nullable=False)
    days       = db.Column(db.Integer, nullable=False)
    reason     = db.Column(db.Text, nullable=False)
    status     = db.Column(db.String(15), default='Pending')
    remarks    = db.Column(db.String(200), default='—')
    applied_on = db.Column(db.String(12), default=lambda: datetime.now().strftime('%Y-%m-%d'))

    student = db.relationship('User', backref='leaves')

    def to_dict(self):
        return {
            'id': self.id, 'student_id': self.student_id,
            'student_name': self.student.name if self.student else '',
            'type': self.type, 'from': self.from_date, 'to': self.to_date,
            'days': self.days, 'reason': self.reason,
            'status': self.status, 'remarks': self.remarks,
            'ts': self.applied_on
        }


class Notification(db.Model):
    __tablename__ = 'notifications'
    id         = db.Column(db.Integer, primary_key=True)
    user_id    = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    type       = db.Column(db.String(20), nullable=False)   # approved|rejected|pending
    msg        = db.Column(db.Text, nullable=False)
    time_label = db.Column(db.String(30), default='Just now')
    is_read    = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id, 'type': self.type, 'msg': self.msg,
            'time': self.time_label, 'read': self.is_read
        }
