'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ProgressRing from '@/components/ProgressRing';
import { courses, userProfile } from '@/lib/mockData';

const enrolled = courses.filter((c) => c.progress > 0);

const activityTypeConfig = {
  lesson: { icon: '▶', color: 'var(--teal)' },
  quiz: { icon: '◈', color: 'var(--gold)' },
  streak: { icon: '🔥', color: 'var(--terracotta)' },
  cert: { icon: '◎', color: '#A855F7' },
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '40px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <span className="section-label">My Learning</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>
            Welcome back, <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Alex</em>
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
            Keep going — you're on a {userProfile.streak}-day streak! 🔥
          </p>
        </div>
        <Link href="/explore" className="btn btn-secondary">
          Browse More Courses
        </Link>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="stats-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ marginBottom: '48px' }}
      >
        {[
          { icon: '🔥', value: userProfile.streak, label: 'Day Streak', color: 'var(--terracotta)' },
          { icon: '◷', value: userProfile.totalHours + 'h', label: 'Hours Learned', color: 'var(--gold)' },
          { icon: '◎', value: userProfile.completedCourses, label: 'Courses Done', color: 'var(--teal)' },
          { icon: '⚡', value: userProfile.xp.toLocaleString(), label: 'XP Earned', color: '#A855F7' },
        ].map(({ icon, value, label, color }) => (
          <motion.div
            key={label}
            className="stat-card"
            variants={itemVariants}
            whileHover={{ y: -3, borderColor: color + '40' }}
          >
            <div className="stat-icon">{icon}</div>
            <div className="stat-value" style={{ color }}>{value}</div>
            <div className="stat-label">{label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Tabs */}
      <div className="tabs">
        {['overview', 'courses', 'activity'].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 340px',
            gap: '28px',
            alignItems: 'start',
          }}
        >
          {/* In Progress Courses */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '20px', marginTop: '28px' }}>
              In Progress
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {enrolled.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ x: 4 }}
                >
                  <Link
                    href={`/courses/${course.id}`}
                    style={{
                      display: 'flex',
                      gap: '18px',
                      alignItems: 'center',
                      padding: '20px',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-lg)',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'border-color 0.25s',
                    }}
                  >
                    <ProgressRing value={course.progress} size={64} stroke={5} color={course.accent} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: '600',
                        fontSize: '1.05rem',
                        marginBottom: '4px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {course.title}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                        {course.instructor} · {course.duration}
                      </div>
                      <div className="progress-bar">
                        <motion.div
                          className="progress-fill"
                          style={{ background: course.accent }}
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ duration: 1, delay: i * 0.08 + 0.2 }}
                        />
                      </div>
                    </div>
                    <Link
                      href={`/lesson/${course.id}/l1`}
                      className="btn btn-secondary"
                      style={{ flexShrink: 0, padding: '8px 16px', fontSize: '0.8rem' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Resume →
                    </Link>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Learning Goal */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                marginTop: '28px',
                padding: '24px',
                background: 'var(--bg-card)',
                border: '1px solid rgba(232, 197, 71, 0.2)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
              }}>
                <h4 style={{ fontFamily: 'var(--font-display)' }}>Weekly Goal</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: '600' }}>5h / 10h</span>
              </div>
              <div className="progress-bar" style={{ height: '8px', marginBottom: '12px' }}>
                <motion.div
                  className="progress-fill"
                  style={{ background: 'var(--gold)' }}
                  initial={{ width: 0 }}
                  animate={{ width: '50%' }}
                  transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                5 more hours this week to hit your goal. You're halfway there!
              </p>
            </motion.div>
          </div>

          {/* Right Column */}
          <div style={{ marginTop: '28px' }}>
            {/* Recent Activity */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
              marginBottom: '20px',
            }}>
              <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: '16px' }}>Recent Activity</h4>
              {userProfile.recentActivity.slice(0, 4).map((activity, i) => {
                const conf = activityTypeConfig[activity.type] ?? activityTypeConfig.lesson;
                return (
                  <motion.div
                    key={i}
                    className="activity-item"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.06 + 0.2 }}
                  >
                    <div
                      className="activity-dot"
                      style={{ background: conf.color, marginTop: '7px' }}
                    />
                    <div>
                      <div style={{ fontSize: '0.82rem', lineHeight: '1.4', marginBottom: '2px' }}>
                        {activity.text}
                      </div>
                      {activity.course && (
                        <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)' }}>
                          {activity.course}
                        </div>
                      )}
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                        {activity.time}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Certificates */}
            <div style={{
              background: 'linear-gradient(135deg, var(--bg-card), rgba(232,197,71,0.04))',
              border: '1px solid rgba(232,197,71,0.2)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🏅</div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.8rem',
                fontWeight: '700',
                color: 'var(--gold)',
                marginBottom: '4px',
              }}>
                {userProfile.certificates}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Certificates Earned</div>
              <Link
                href="/profile"
                style={{
                  display: 'inline-block',
                  marginTop: '14px',
                  fontSize: '0.8rem',
                  color: 'var(--gold)',
                  textDecoration: 'none',
                }}
              >
                View all →
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ paddingTop: '28px' }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
          }}>
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -3 }}
              >
                <Link
                  href={`/courses/${course.id}`}
                  style={{
                    display: 'block',
                    padding: '20px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: '10px',
                      background: `${course.accent}18`,
                      border: `1px solid ${course.accent}25`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                      color: course.accent,
                      flexShrink: 0,
                    }}>
                      ◎
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '0.9rem', lineHeight: '1.3', marginBottom: '4px' }}>
                        {course.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {course.instructor}
                      </div>
                    </div>
                  </div>

                  {course.progress > 0 ? (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.75rem' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Progress</span>
                        <span style={{ color: course.accent, fontWeight: '600' }}>{course.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <motion.div
                          className="progress-fill"
                          style={{ background: course.accent }}
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ duration: 0.8, delay: i * 0.06 + 0.2 }}
                        />
                      </div>
                    </>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Not started</span>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Activity Tab */}
      {activeTab === 'activity' && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ paddingTop: '28px', maxWidth: '600px' }}
        >
          {userProfile.recentActivity.map((activity, i) => {
            const conf = activityTypeConfig[activity.type] ?? activityTypeConfig.lesson;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '18px 0',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: conf.color + '18',
                  border: `1px solid ${conf.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                  color: conf.color,
                  flexShrink: 0,
                }}>
                  {conf.icon}
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', marginBottom: '4px' }}>{activity.text}</div>
                  {activity.course && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--gold)', marginBottom: '2px' }}>
                      {activity.course}
                    </div>
                  )}
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{activity.time}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
