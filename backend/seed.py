from models import User, Leave, Notification
from extensions import db
from werkzeug.security import generate_password_hash

def seed_db():
    if User.query.count() > 0:
        return  # already seeded

    student = User(
        roll_id='CS2021045', name='Arjun Sharma',
        email='student@demo.com', password=generate_password_hash('1234'),
        role='student', dept='Computer Science', year='3rd Year',
        faculty='Dr. Priya Nair'
    )
    faculty = User(
        roll_id='FAC2015', name='Dr. Priya Nair',
        email='faculty@demo.com', password=generate_password_hash('1234'),
        role='faculty', dept='Computer Science', designation='Associate Professor'
    )
    db.session.add_all([student, faculty])
    db.session.flush()

    leaves = [
        Leave(student_id=student.id, type='medical',  from_date='2026-03-05', to_date='2026-03-06', days=2, reason='Fever and cold',                 status='Approved', remarks='Approved. Get well soon!', applied_on='2026-03-04'),
        Leave(student_id=student.id, type='personal', from_date='2026-03-18', to_date='2026-03-18', days=1, reason='Family function',                status='Approved', remarks='Approved.',                applied_on='2026-03-17'),
        Leave(student_id=student.id, type='academic', from_date='2026-04-10', to_date='2026-04-11', days=2, reason='State-level coding competition', status='Approved', remarks='Approved. All the best!',  applied_on='2026-04-08'),
        Leave(student_id=student.id, type='personal', from_date='2026-04-20', to_date='2026-04-21', days=2, reason='Visiting relatives',             status='Pending',  remarks='—',                        applied_on='2026-04-15'),
        Leave(student_id=student.id, type='medical',  from_date='2026-04-28', to_date='2026-04-28', days=1, reason='Doctor appointment',             status='Pending',  remarks='—',                        applied_on='2026-04-15'),
    ]
    db.session.add_all(leaves)

    notifs = [
        Notification(user_id=student.id, type='approved', msg='Your leave for Apr 10–11 has been approved!',  time_label='2 days ago',  is_read=False),
        Notification(user_id=student.id, type='pending',  msg='Leave application for Apr 20–21 submitted.',   time_label='1 day ago',   is_read=False),
        Notification(user_id=student.id, type='pending',  msg='Leave application for Apr 28 submitted.',      time_label='1 day ago',   is_read=False),
        Notification(user_id=student.id, type='approved', msg='Leave for Mar 18 was approved.',               time_label='4 weeks ago', is_read=True),
        Notification(user_id=student.id, type='approved', msg='Medical leave for Mar 5–6 was approved.',      time_label='6 weeks ago', is_read=True),
    ]
    db.session.add_all(notifs)
    db.session.commit()
    print('✅ Database seeded.')
