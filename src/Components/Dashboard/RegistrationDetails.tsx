import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Qualification {
  degree: string;
  college: string;
  year: string;
}

interface Experience {
  company: string;
  role: string;
  duration: string;
}

interface UserProfile {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  resumeUrl: string;
  profileScore: number;
  qualifications: Qualification[];
  skills: string[];
  experience: Experience[];
}

const RegistrationDetails: React.FC = () => {
  const { email } = useParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    axios.get(`/api/profile/${email}`).then(res => {
      setProfile(res.data);
    });
  }, [email]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="p-4 shadow-sm rounded-4">
      <h5>{profile.name} <span className="text-muted">({profile.role})</span></h5>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
      <p><strong>Location:</strong> {profile.location}</p>
      <p><strong>Profile Score:</strong> {profile.profileScore} / 5</p>
      <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">Download Resume</a>

      <h6 className="mt-4">Qualifications</h6>
      <ul>
        {profile.qualifications.map((q, i) => (
          <li key={i}>{q.degree} - {q.college} ({q.year})</li>
        ))}
      </ul>

      <h6 className="mt-4">Skills</h6>
      <div>
        {profile.skills.map((skill, i) => (
          <span key={i} className="badge bg-info me-2">{skill}</span>
        ))}
      </div>

      <h6 className="mt-4">Work Experience</h6>
      <ul>
        {profile.experience.map((exp, i) => (
          <li key={i}>{exp.company} - {exp.role} ({exp.duration})</li>
        ))}
      </ul>
    </div>
  );
};

export default RegistrationDetails;
