import React from 'react';
import { Card } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface User {
  name: string;
  role: string;
  createdAt: string;
  avatarUrl?: string;
}

const getInitial = (name: string) => name.charAt(0).toUpperCase();

const dummyUsers: User[] = [
  {
    name: 'Ananya Sharma',
    role: 'Student',
    createdAt: dayjs().subtract(2, 'hour').toISOString(),
    avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    name: 'Rahul Verma',
    role: 'Faculty',
    createdAt: dayjs().subtract(1, 'day').toISOString()
  },
  {
    name: 'Priya Kumar',
    role: 'Admin',
    createdAt: dayjs().subtract(3, 'day').toISOString()
  },
   {
    name: 'Priya Kumar',
    role: 'Admin',
    createdAt: dayjs().subtract(3, 'day').toISOString()
  },
   {
    name: 'Priya Kumar',
    role: 'Admin',
    createdAt: dayjs().subtract(3, 'day').toISOString()
  }
];

const PendingRequestCard: React.FC = () => {
  return (
    <Card className="p-4 shadow-sm rounded-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold m-0">{dummyUsers.length} Pending Requests</h6>
        <a href="#" className="text-primary text-decoration-none fw-semibold">View All</a>
      </div>

      {dummyUsers.map((user, index) => (
        <div key={index} className="d-flex align-items-start mb-4 pb-2 border-bottom">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt="avatar"
              className="rounded-circle me-3"
              width={40}
              height={40}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://via.placeholder.com/40?text=' + getInitial(user.name);
              }}
            />
          ) : (
            <div
              className="bg-secondary text-white d-flex align-items-center justify-content-center rounded-circle me-3"
              style={{ width: '40px', height: '40px', fontWeight: 600 }}
            >
              {getInitial(user.name)}
            </div>
          )}

          <div className="flex-grow-1">
            <div className="fw-semibold">{user.name}</div>
            <div className="text-muted small">{user.role}</div>
            <a href="#" className="text-primary text-decoration-none d-inline-flex align-items-center small fw-semibold">
              View Registration Details <FaArrowRight className="ms-1" />
            </a>
            <div className="text-muted small mt-1">{dayjs(user.createdAt).fromNow()}</div>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default PendingRequestCard;
