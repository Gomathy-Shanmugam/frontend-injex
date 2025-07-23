import React, { useEffect, useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import './UpcomingInterviewsCard.css';
import axios from 'axios';

interface User {
  name: string;
  role: string;
  createdAt: string;
}

const dummyUsers: User[] = [
  {
    name: 'Ananya Sharma',
    role: 'Student',
    createdAt: '2025-07-21T07:30:00Z',
  },
  {
    name: 'Rahul Verma',
    role: 'Faculty',
    createdAt: '2025-07-22T10:00:00Z',
  },
  {
    name: 'Priya Kumar',
    role: 'Admin',
    createdAt: '2025-07-20T15:00:00Z',
  },
];

const UpcomingInterviewsCard: React.FC = () => {
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get<User[]>('http://localhost:5000/api/interviews/upcoming');
        setUsers(
          res.data.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        );
      } catch (error) {
        console.error('Error fetching upcoming interviews:', error);
        // fallback to dummy data (optional)
        setUsers(dummyUsers);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
   <Card className="interview-card   p-2 me-3">
  <h6 className="fw-bold text-primary mb-3">Upcoming Interviews</h6>

  {users.length === 0 ? (
    <div className="text-muted">No upcoming interviews.</div>
  ) : (
    users.map((item, idx) => {
      const date = new Date(item.createdAt);
      return (
        <div
          key={idx}
          className={`d-flex justify-content-between align-items-start py-2 ${
            idx !== users.length - 1 ? 'border-bottom' : ''
          }`}
        >
          <div>
            <div className="fw-semibold">{item.name}</div>
            <small className="text-muted">{item.role}</small>
          </div>
          <div className="text-end">
            <div className="small">
              {date.toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              })}
            </div>
            <small className="text-muted">
              {date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </small>
          </div>
        </div>
      );
    })
  )}
</Card>

  );
};

export default UpcomingInterviewsCard;
