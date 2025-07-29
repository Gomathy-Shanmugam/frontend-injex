import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegistrationDetails.css";

const RegistrationDetails: React.FC = () => {
  const { email } = useParams<{ email: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!email) return;

    axios.get(`/api/profile/${email}`).then((res) => {
      setProfile(res.data);
    }).catch(() => {
      console.error('Failed to fetch profile, using dummy');
      setProfile({
        name: "Ananya Sharma",
        email,
        role: "Student",
        phone: "9876543210",
        location: "Chennai",
        profileScore: 4.5,
        resumeUrl: "#",
        qualifications: [
          { degree: "B.Tech", college: "Anna University", year: "2024" }
        ],
        skills: ["React", "Node.js", "MongoDB"],
        experience: [
          { company: "TechCorp", role: "Intern", duration: "6 months" },
          { company: "Injex", role: "Software developer", duration: "1 year" },
          { company: "Smedge", role: "Software developer", duration: "2 year" }
        ]
      });
    });
  }, [email]);

  if (!profile) return <div className="text-center p-4">Loading...</div>;

  

  return (
    <div className="registration-modal-backdrop">
      <div className="registration-detail-modal">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h5 className="fw-bold">{profile.name}</h5>
            <div className="text-muted">{profile.role}</div>
          </div>
          <div className="text-end">
            <div className="text-success fw-bold fs-5">{profile.profileScore} / 5</div>
            <div className="small text-muted">Profile Score</div>
          </div>
        </div>

        <section className="mb-4">
          <h6 className="fw-bold mb-2">📄 Personal Information</h6>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Location:</strong> {profile.location}</p>
          <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-primary fw-semibold">
            Download Resume
          </a>
        </section>

        <section className="mb-4">
          <h6 className="fw-bold mb-2">🎓 Qualifications</h6>
          {(profile.qualifications || []).map((q: any, i: number) => (
            <div key={i} className="mb-1">
              <strong>{q.degree}</strong> - {q.college} ({q.year})
            </div>
          ))}
        </section>

        <section className="mb-4">
          <h6 className="fw-bold mb-2">💡 Skills</h6>
          <div className="d-flex flex-wrap gap-2">
            {(profile.skills || []).map((s: string, i: number) => (
              <span key={i} className="badge bg-primary-subtle text-primary">{s}</span>
            ))}
          </div>
        </section>

        <section>
          <h6 className="fw-bold mb-2">🏢 Work Experience</h6>
          <ul className="list-unstyled">
            {(profile.experience || []).map((exp: any, i: number) => (
              <li key={i} className="mb-2">
                <strong>{exp.company}</strong> - {exp.role} ({exp.duration})
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-4 d-flex justify-content-end gap-2">
          <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Close</button>
          <button className="btn btn-primary">Approve & Hold</button>
          <button className="btn btn-success">Schedule Interview</button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDetails;
