import React from 'react';
import CountUp from 'react-countup';

const stats = [
  {
    icon: 'fas fa-user-graduate',
    value: 1497,
    label: 'Students Enrolled',
    color: '#00b894',
  },
  {
    icon: 'fas fa-bookmark',
    value: 12,
    label: 'Courses',
    color: '#a29bfe',
  },
  {
    icon: 'fas fa-chalkboard-teacher',
    value: 91,
    label: 'Core topics',
    color: '#ff6b81',
  },
  {
    icon: 'fas fa-bookmark',
    value: 29,
    label: 'Industry Experts',
    color: '#a29bfe',
  },
];

const StatsSection: React.FC = () => {
  return (
    <div className="d-flex justify-content-center py-3">
      <div
        className="row bg-white w-100 align-items-center"
        style={{
          maxWidth: '1220px',
          borderRadius: '16px',
          minHeight: '120px',
          padding: '12px 0',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          margin: '0',
          rowGap: '8px',
          columnGap: '0px',
          paddingLeft: '0',
          paddingRight: '0',
          marginLeft: '0',
          marginRight: '0',
          gap: '0',
          // ✅ Removes Bootstrap gutter spacing
          '--bs-gutter-x': '0',
        } as React.CSSProperties}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className="col-6 col-md-3 d-flex flex-column align-items-center p-0"
            style={{
              rowGap: '4px',
              padding: '8px 0', // fine-tune vertical spacing if needed
            }}
          >
            <div className="d-flex align-items-center">
              <i
                className={stat.icon}
                style={{
                  color: stat.color,
                  fontSize: '30px',
                  marginRight: '6px',
                }}
              ></i>
              <h3 className="mb-0 fw-bold" style={{ fontSize: '24px' }}>
                <CountUp end={stat.value} duration={2} separator="," />+
              </h3>
            </div>
            <p className="text-center mb-0" style={{ fontSize: '14px' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
