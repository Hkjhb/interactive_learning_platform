'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const categoryGradients = {
  frontend: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)',
  backend: 'linear-gradient(135deg, #0D2137 0%, #0A3D5C 50%, #1A6985 100%)',
  design: 'linear-gradient(135deg, #2D1515 0%, #4A1A1A 50%, #6B2B2B 100%)',
  data: 'linear-gradient(135deg, #1A0D2E 0%, #2D1657 50%, #4A1F8A 100%)',
  mobile: 'linear-gradient(135deg, #1A1500 0%, #2E2400 50%, #4A3A00 100%)',
  devops: 'linear-gradient(135deg, #0D1F15 0%, #143320 50%, #1F5C35 100%)',
};

const categoryIcons = {
  frontend: '⟨/⟩',
  backend: '⚙',
  design: '◈',
  data: '◎',
  mobile: '☐',
  devops: '∞',
};

export default function CourseCard({ course, index = 0 }) {
  const gradient = categoryGradients[course.category] || categoryGradients.frontend;
  const icon = categoryIcons[course.category] || '◈';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{ y: -4 }}
    >
      <Link href={`/courses/${course.id}`} className="course-card" style={{ display: 'block' }}>
        {/* Banner */}
        <div
          className="course-card-banner"
          style={{
            position: 'relative',
          }}
        >
          {/* Stock image */}
          <img
            src={course.image}
            alt={course.title}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* Gradient overlay for readability */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(135deg, ${course.accent}33 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)`,
          }} />

          {/* Decorative geometric pattern */}
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '20px',
            transform: 'translateY(-50%)',
            fontSize: '4rem',
            opacity: 0.12,
            fontWeight: '700',
            color: course.accent,
            lineHeight: 1,
            zIndex: 1,
          }}>
            {icon}
          </div>

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
            <span
              className="course-card-category"
              style={{ color: course.accent }}
            >
              {course.category}
            </span>
            <span className={`level-badge level-${course.level}`}>
              {course.level}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="course-card-body">
          <div className="course-card-title">{course.title}</div>
          <div className="course-card-instructor">by {course.instructor}</div>

          <div className="course-card-meta">
            <span className="meta-item">
              <span className="icon">◷</span>
              {course.duration}
            </span>
            <span className="meta-item">
              <span className="icon">◈</span>
              {course.totalLessons} lessons
            </span>
            <span className="rating">
              ★ {course.rating}
            </span>
          </div>

          {/* Progress bar (if enrolled) */}
          {course.progress > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Progress</span>
                <span style={{ fontSize: '0.75rem', fontWeight: '600', color: course.accent }}>
                  {course.progress}%
                </span>
              </div>
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  style={{ background: course.accent }}
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ duration: 0.8, delay: index * 0.06 + 0.3, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {course.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: '700',
              fontSize: '1.1rem',
              color: 'var(--text-primary)',
            }}>
              {course.price}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
