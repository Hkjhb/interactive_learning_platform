'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CourseCard from '@/components/CourseCard';
import { courses, categories } from '@/lib/mockData';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? courses
    : courses.filter((c) => c.category === activeCategory);

  const featured = courses.slice(0, 3);

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────── */}
      <section className="hero container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="hero-label">
            New courses every week
          </div>

          <h1 className="hero-title">
            Learn without<br />
            <em>limits.</em> Grow<br />
            without bounds.
          </h1>

          <p className="hero-subtitle">
            Expert-crafted courses in development, design, and data science.
            Track your progress, earn certificates, and build real skills.
          </p>

          <div className="hero-actions">
            <Link href="/explore" className="btn btn-primary">
              Explore Courses →
            </Link>
            <Link href="/dashboard" className="btn btn-secondary">
              My Dashboard
            </Link>
          </div>

          <div className="hero-stats">
            {[
              { value: '50K+', label: 'Active Learners' },
              { value: '120+', label: 'Expert Courses' },
              { value: '95%', label: 'Completion Rate' },
              { value: '4.8★', label: 'Average Rating' },
            ].map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
              >
                <div className="hero-stat-value">{value}</div>
                <div className="hero-stat-label">{label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── Continue Learning ────────────────────────── */}
      <section className="section container">
        <div className="section-header">
          <span className="section-label">In Progress</span>
          <h2 className="section-title">Continue Learning</h2>
          <p className="section-subtitle">Pick up right where you left off.</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '16px',
          }}
        >
          {courses.filter((c) => c.progress > 0 && c.progress < 100).map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ scale: 1.01 }}
            >
              <Link
                href={`/courses/${course.id}`}
                style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center',
                  padding: '18px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'var(--transition)',
                }}
              >
                {/* Icon block */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: '12px',
                    background: `${course.accent}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                    color: course.accent,
                    flexShrink: 0,
                    border: `1px solid ${course.accent}28`,
                  }}
                >
                  ◉
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {course.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    {course.progress}% complete
                  </div>
                  <div className="progress-bar">
                    <motion.div
                      className="progress-fill"
                      style={{ background: course.accent }}
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 0.8, delay: i * 0.08 + 0.2 }}
                    />
                  </div>
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', flexShrink: 0 }}>
                  →
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── All Courses ──────────────────────────────── */}
      <section className="section container">
        <div className="section-header">
          <span className="section-label">Library</span>
          <h2 className="section-title">Browse All Courses</h2>
        </div>

        {/* Category Filters */}
        <div className="filter-bar">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              className={`filter-pill ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          className="courses-grid"
          layout
        >
          {filtered.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '60px 0',
              color: 'var(--text-muted)',
            }}
          >
            No courses in this category yet.
          </motion.div>
        )}
      </section>

      {/* ─── CTA Banner ──────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container"
        style={{ paddingBottom: '80px' }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(232, 197, 71, 0.06) 100%)',
            border: '1px solid rgba(232, 197, 71, 0.2)',
            borderRadius: 'var(--radius-xl)',
            padding: '60px 48px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,197,71,0.1) 0%, transparent 70%)',
          }} />

          <h2 style={{ marginBottom: '16px' }}>Ready to level up?</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '460px', margin: '0 auto 32px', fontSize: '1rem' }}>
            Join 50,000+ learners mastering new skills with structured, expert-led courses.
          </p>
          <Link href="/explore" className="btn btn-primary" style={{ fontSize: '1rem', padding: '14px 32px' }}>
            Start Learning for Free
          </Link>
        </div>
      </motion.section>
    </>
  );
}
