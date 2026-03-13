'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getCourseById } from '@/lib/mockData';

export default function CourseDetailPage() {
  const params = useParams();
  const course = getCourseById(params.id);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState({ 'sec-1': true });
  const [enrolled, setEnrolled] = useState(course?.progress > 0);

  if (!course) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 24px', color: 'var(--text-muted)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)' }}>Course not found</h2>
        <Link href="/explore" className="btn btn-primary" style={{ marginTop: '24px', display: 'inline-flex' }}>
          Browse Courses
        </Link>
      </div>
    );
  }

  const totalLessons = course.curriculum.reduce((acc, s) => acc + s.lessons.length, 0);
  const completedLessons = course.curriculum.reduce(
    (acc, s) => acc + s.lessons.filter((l) => l.completed).length, 0
  );

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const typeIcon = { video: '▶', quiz: '◈', project: '◎' };

  return (
    <div>
      {/* Hero Header */}
      <div style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border)',
        padding: '48px 0 0',
      }}>
        <div className="container">
          <div className="course-detail-layout">
            {/* Left content */}
            <div>
              {/* Breadcrumb */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  marginBottom: '20px',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                }}
              >
                <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
                <span>›</span>
                <Link href="/explore" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Explore</Link>
                <span>›</span>
                <span style={{ color: course.accent }}>{course.category}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                  <span
                    className={`level-badge level-${course.level}`}
                    style={{ fontSize: '0.8rem', padding: '5px 14px' }}
                  >
                    {course.level}
                  </span>
                  {course.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>

                <h1
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    marginBottom: '16px',
                    lineHeight: '1.15',
                    maxWidth: '680px',
                  }}
                >
                  {course.title}
                </h1>

                <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', lineHeight: '1.7', marginBottom: '24px' }}>
                  {course.description}
                </p>

                {/* Stats row */}
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--gold)' }}>★ {course.rating}</span>
                    <span style={{ color: 'var(--text-muted)' }}>({course.reviews.toLocaleString()} reviews)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    ◉ {course.students.toLocaleString()} students
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    ◷ {course.duration}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    ◈ {totalLessons} lessons
                  </div>
                </div>

                {/* Instructor */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${course.accent}, ${course.accent}88)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    color: '#0C0C0F',
                  }}>
                    {course.instructorAvatar}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>{course.instructor}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Instructor</div>
                  </div>
                </div>
              </motion.div>

              {/* Tabs */}
              <div className="tabs" style={{ marginTop: '32px' }}>
                {['overview', 'curriculum', 'instructor'].map((tab) => (
                  <button
                    key={tab}
                    className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Sticky Purchase Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="course-sticky-card">
                {/* Video preview */}
                <div style={{
                  aspectRatio: '16/9',
                  background: 'var(--bg-primary)',
                  borderRadius: 'var(--radius)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  border: '1px solid var(--border)',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(135deg, ${course.accent}08, transparent)`,
                  }} />
                  <motion.div
                    className="play-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ background: course.accent }}
                  >
                    <span style={{ fontSize: '1.2rem', color: '#0C0C0F', marginLeft: '3px' }}>▶</span>
                  </motion.div>
                  <span style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '0.72rem',
                    color: 'var(--text-secondary)',
                  }}>
                    Preview this course
                  </span>
                </div>

                <div className="course-price">{course.price}</div>

                {enrolled ? (
                  <>
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.82rem' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Your Progress</span>
                        <span style={{ color: course.accent, fontWeight: '600' }}>{course.progress}%</span>
                      </div>
                      <div className="progress-bar" style={{ height: '6px', marginBottom: '16px' }}>
                        <motion.div
                          className="progress-fill"
                          style={{ background: course.accent }}
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                        />
                      </div>
                    </div>
                    <Link
                      href={`/lesson/${course.id}/l5`}
                      className="btn btn-primary"
                      style={{ width: '100%', justifyContent: 'center', backgroundColor: course.accent }}
                    >
                      Continue Learning →
                    </Link>
                  </>
                ) : (
                  <>
                    <motion.button
                      className="btn btn-primary"
                      style={{ width: '100%', justifyContent: 'center', backgroundColor: course.accent, marginBottom: '10px' }}
                      onClick={() => setEnrolled(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Enroll Now
                    </motion.button>
                    <button
                      className="btn btn-secondary"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      Add to Wishlist
                    </button>
                  </>
                )}

                <div style={{
                  marginTop: '20px',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}>
                  {[
                    { icon: '◎', text: `${totalLessons} lessons` },
                    { icon: '◷', text: course.duration + ' total' },
                    { icon: '◈', text: 'Certificate of completion' },
                    { icon: '♾', text: 'Full lifetime access' },
                  ].map(({ icon, text }) => (
                    <div key={text} style={{ display: 'flex', gap: '10px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      <span style={{ color: course.accent }}>{icon}</span>
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container" style={{ paddingBottom: '80px' }}>
        <div style={{ maxWidth: '720px' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ paddingTop: '32px' }}
              >
                <h3 style={{ marginBottom: '20px' }}>What you'll learn</h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '12px',
                  marginBottom: '40px',
                }}>
                  {course.whatYouLearn.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      style={{
                        display: 'flex',
                        gap: '10px',
                        fontSize: '0.88rem',
                        color: 'var(--text-secondary)',
                        alignItems: 'flex-start',
                      }}
                    >
                      <span style={{ color: 'var(--gold)', marginTop: '1px', flexShrink: 0 }}>✓</span>
                      {item}
                    </motion.div>
                  ))}
                </div>

                <h3 style={{ marginBottom: '16px' }}>About this course</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.95rem' }}>
                  {course.description} This course is designed for developers who want to push their skills to the next level.
                  You'll build real projects, learn from real-world patterns, and gain the confidence to architect sophisticated solutions.
                </p>
              </motion.div>
            )}

            {activeTab === 'curriculum' && (
              <motion.div
                key="curriculum"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ paddingTop: '32px' }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                }}>
                  <h3>{totalLessons} lessons · {course.duration}</h3>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {completedLessons}/{totalLessons} completed
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {course.curriculum.map((section, si) => (
                    <motion.div
                      key={section.id}
                      className="curriculum-section"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: si * 0.07 }}
                    >
                      <div
                        className="curriculum-section-header"
                        onClick={() => toggleSection(section.id)}
                      >
                        <div>
                          <div style={{ marginBottom: '2px' }}>{section.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '400' }}>
                            {section.lessons.length} lessons · {section.duration}
                          </div>
                        </div>
                        <motion.span
                          animate={{ rotate: expandedSections[section.id] ? 180 : 0 }}
                          style={{ color: 'var(--text-muted)' }}
                        >
                          ▾
                        </motion.span>
                      </div>

                      <AnimatePresence>
                        {expandedSections[section.id] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            {section.lessons.map((lesson) => (
                              <Link
                                key={lesson.id}
                                href={`/lesson/${course.id}/${lesson.id}`}
                                className="curriculum-lesson"
                              >
                                <span style={{
                                  width: 28,
                                  height: 28,
                                  borderRadius: '50%',
                                  background: lesson.completed ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-primary)',
                                  border: `1px solid ${lesson.completed ? '#10B981' : 'var(--border)'}`,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.65rem',
                                  color: lesson.completed ? '#10B981' : 'var(--text-muted)',
                                  flexShrink: 0,
                                }}>
                                  {lesson.completed ? '✓' : typeIcon[lesson.type]}
                                </span>
                                <span style={{ flex: 1 }}>{lesson.title}</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', flexShrink: 0 }}>
                                  {lesson.duration}
                                </span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'instructor' && (
              <motion.div
                key="instructor"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ paddingTop: '32px' }}
              >
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '24px' }}>
                  <div style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${course.accent}, ${course.accent}66)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    color: '#0C0C0F',
                    flexShrink: 0,
                  }}>
                    {course.instructorAvatar}
                  </div>
                  <div>
                    <h3 style={{ marginBottom: '4px' }}>{course.instructor}</h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      ★ {course.rating} Instructor Rating · {course.reviews.toLocaleString()} Reviews
                    </div>
                  </div>
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.95rem' }}>
                  {course.instructorBio}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
