'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ProgressRing from '@/components/ProgressRing';
import { userProfile, courses } from '@/lib/mockData';

const completedCourses = courses.filter((c) => c.progress === 90);

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [editing, setEditing] = useState(false);

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="profile-header"
      >
        <motion.div
          className="profile-avatar-large"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {userProfile.avatar}
        </motion.div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
            }}>
              {userProfile.name}
            </h1>
            <span style={{
              padding: '4px 14px',
              background: 'rgba(232, 197, 71, 0.1)',
              border: '1px solid rgba(232, 197, 71, 0.25)',
              borderRadius: '20px',
              fontSize: '0.78rem',
              fontWeight: '700',
              color: 'var(--gold)',
              letterSpacing: '0.06em',
            }}>
              {userProfile.level}
            </span>
          </div>

          <div style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.9rem' }}>
            {userProfile.title} · Joined {userProfile.joinDate}
          </div>

          <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
            {[
              { value: userProfile.completedCourses, label: 'Courses' },
              { value: userProfile.certificates, label: 'Certificates' },
              { value: userProfile.totalHours + 'h', label: 'Learning' },
              { value: userProfile.xp.toLocaleString(), label: 'XP' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: '700',
                  fontSize: '1.5rem',
                  lineHeight: 1,
                  marginBottom: '2px',
                }}>
                  {value}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
          <motion.button
            onClick={() => setEditing(!editing)}
            className="btn btn-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {editing ? 'Save Profile' : '✎ Edit Profile'}
          </motion.button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="tabs">
        {['overview', 'achievements', 'certificates'].map((tab) => (
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
            gridTemplateColumns: '1fr 320px',
            gap: '28px',
            paddingTop: '28px',
            alignItems: 'start',
          }}
        >
          {/* Left */}
          <div>
            {/* Learning path */}
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '20px' }}>Learning Journey</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px' }}>
              {courses.filter((c) => c.progress > 0).map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px 20px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                  }}
                >
                  <ProgressRing value={course.progress} size={52} stroke={4} color={course.accent} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontWeight: '600',
                      fontSize: '0.88rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      marginBottom: '4px',
                    }}>
                      {course.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {course.instructor} · {course.category}
                    </div>
                  </div>
                  <span className={`level-badge level-${course.level}`}>{course.level}</span>
                </motion.div>
              ))}
            </div>

            {/* Skills */}
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '20px' }}>Skills Progress</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { skill: 'React & Frontend', level: 78, color: 'var(--gold)' },
                { skill: 'Node.js & Backend', level: 45, color: 'var(--teal)' },
                { skill: 'UI/UX Design', level: 82, color: 'var(--terracotta)' },
                { skill: 'Data Science', level: 20, color: '#A855F7' },
                { skill: 'Mobile Development', level: 33, color: 'var(--amber)' },
              ].map(({ skill, level, color }, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.3 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>{skill}</span>
                    <span style={{ fontSize: '0.8rem', color, fontWeight: '600' }}>{level}%</span>
                  </div>
                  <div className="progress-bar" style={{ height: '6px' }}>
                    <motion.div
                      className="progress-fill"
                      style={{ background: color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${level}%` }}
                      transition={{ duration: 1, delay: i * 0.06 + 0.4, ease: [0.4, 0, 0.2, 1] }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* XP card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                background: 'linear-gradient(135deg, var(--bg-card), rgba(232,197,71,0.06))',
                border: '1px solid rgba(232,197,71,0.2)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>
                Level Progress
              </div>
              <ProgressRing value={72} size={100} stroke={7} color="var(--gold)" />
              <div style={{ marginTop: '16px' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  fontWeight: '700',
                  marginBottom: '4px',
                }}>
                  {userProfile.xp.toLocaleString()} XP
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  1,550 XP to next level
                </div>
              </div>
            </motion.div>

            {/* Streak calendar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
              }}
            >
              <div style={{ fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '14px' }}>
                This Month
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '4px',
              }}>
                {Array.from({ length: 31 }, (_, i) => {
                  const active = Math.random() > 0.35;
                  const today = i === 12;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.01 + 0.2 }}
                      style={{
                        aspectRatio: '1',
                        borderRadius: '4px',
                        background: today
                          ? 'var(--gold)'
                          : active
                          ? 'rgba(232, 197, 71, 0.25)'
                          : 'var(--bg-primary)',
                        border: today ? 'none' : '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.55rem',
                        color: today ? '#0C0C0F' : active ? 'var(--gold)' : 'var(--text-muted)',
                        fontWeight: today ? '700' : '400',
                      }}
                    >
                      {i + 1}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ paddingTop: '28px' }}
        >
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            {userProfile.achievements.filter((a) => a.earned).length} of {userProfile.achievements.length} achievements unlocked
          </p>
          <div className="achievements-grid">
            {userProfile.achievements.map((achievement, i) => (
              <motion.div
                key={achievement.id}
                className={`achievement-card ${achievement.earned ? 'earned' : ''}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: achievement.earned ? 1 : 0.5, scale: 1 }}
                transition={{ delay: i * 0.07 }}
                whileHover={achievement.earned ? { y: -3 } : {}}
              >
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-title">{achievement.title}</div>
                <div className="achievement-desc">{achievement.description}</div>
                {achievement.earned && (
                  <div style={{
                    marginTop: '10px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.68rem',
                    fontWeight: '700',
                    color: 'var(--gold)',
                  }}>
                    ✓ Earned
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Certificates Tab */}
      {activeTab === 'certificates' && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ paddingTop: '28px' }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
          }}>
            {courses.filter((c) => c.progress >= 90).map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: `linear-gradient(135deg, var(--bg-card), ${course.accent}08)`,
                  border: `1px solid ${course.accent}30`,
                  borderRadius: 'var(--radius-xl)',
                  padding: '28px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Decorative corner */}
                <div style={{
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  border: `2px solid ${course.accent}20`,
                }} />

                <div style={{
                  fontSize: '2.4rem',
                  marginBottom: '14px',
                }}>
                  🏆
                </div>

                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.15rem',
                  fontWeight: '700',
                  marginBottom: '6px',
                }}>
                  Certificate of Completion
                </div>

                <div style={{
                  fontSize: '0.85rem',
                  color: course.accent,
                  fontWeight: '600',
                  marginBottom: '4px',
                }}>
                  {course.title}
                </div>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                  Completed · Issued to {userProfile.name}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '8px 18px',
                    background: `${course.accent}18`,
                    border: `1px solid ${course.accent}30`,
                    borderRadius: '8px',
                    color: course.accent,
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Download PDF →
                </motion.button>
              </motion.div>
            ))}
            {/* Placeholder for locked certificates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                background: 'var(--bg-card)',
                border: '1px dashed var(--border)',
                borderRadius: 'var(--radius-xl)',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                textAlign: 'center',
                minHeight: '200px',
              }}
            >
              <div style={{ fontSize: '2rem', opacity: 0.4 }}>🔒</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Complete more courses to earn certificates
              </div>
              <Link href="/explore" className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>
                Browse Courses
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
