'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import PageTransition from '@/components/PageTransition';

const paths = [
  {
    id: 'fullstack',
    title: 'Full-Stack Web Developer',
    subtitle: 'From zero to production-ready applications',
    icon: '⟨/⟩',
    accent: '#E8C547',
    duration: '6 months',
    courses: 8,
    level: 'Beginner → Advanced',
    enrolled: 12840,
    progress: 35,
    description:
      'Master modern web development from frontend to backend. Build real applications with React, Node.js, databases, and cloud deployment.',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'PostgreSQL', 'AWS'],
    milestones: [
      { title: 'Web Foundations', weeks: '1-4', done: true },
      { title: 'JavaScript Mastery', weeks: '5-8', done: true },
      { title: 'React & Frontend', weeks: '9-14', done: false },
      { title: 'Backend & APIs', weeks: '15-20', done: false },
      { title: 'Databases', weeks: '21-24', done: false },
      { title: 'Deployment & DevOps', weeks: '25-28', done: false },
    ],
    courseList: [
      { id: '1', title: 'Advanced React Patterns', progress: 65, accent: '#E8C547' },
      { id: '2', title: 'Node.js Microservices', progress: 30, accent: '#4ECDC4' },
    ],
  },
  {
    id: 'design-systems',
    title: 'Design Systems Engineer',
    subtitle: 'Bridge design and development at scale',
    icon: '◈',
    accent: '#C47A52',
    duration: '3 months',
    courses: 5,
    level: 'Intermediate',
    enrolled: 5240,
    progress: 70,
    description:
      'Learn to build, document, and maintain design systems that scale across large teams. Master Figma, design tokens, and component APIs.',
    skills: ['Figma', 'Design Tokens', 'Storybook', 'CSS-in-JS', 'Accessibility'],
    milestones: [
      { title: 'Design Fundamentals', weeks: '1-2', done: true },
      { title: 'Figma & Prototyping', weeks: '3-4', done: true },
      { title: 'Component Architecture', weeks: '5-7', done: true },
      { title: 'Design Tokens & Theming', weeks: '8-9', done: false },
      { title: 'Documentation & Storybook', weeks: '10-12', done: false },
    ],
    courseList: [
      { id: '3', title: 'Design Systems with Figma', progress: 90, accent: '#C47A52' },
    ],
  },
  {
    id: 'ml-engineer',
    title: 'Machine Learning Engineer',
    subtitle: 'Build intelligent systems from data to deployment',
    icon: '◎',
    accent: '#A855F7',
    duration: '8 months',
    courses: 10,
    level: 'Intermediate → Advanced',
    enrolled: 8120,
    progress: 0,
    description:
      'Go from Python basics to deploying production ML models. Cover statistics, classical ML, deep learning, and MLOps.',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'MLflow', 'Docker', 'AWS SageMaker'],
    milestones: [
      { title: 'Python & Math Foundations', weeks: '1-4', done: false },
      { title: 'Classical ML Algorithms', weeks: '5-10', done: false },
      { title: 'Deep Learning', weeks: '11-18', done: false },
      { title: 'NLP & Computer Vision', weeks: '19-24', done: false },
      { title: 'MLOps & Deployment', weeks: '25-32', done: false },
    ],
    courseList: [
      { id: '4', title: 'Machine Learning with Python', progress: 0, accent: '#A855F7' },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile App Developer',
    subtitle: 'Ship to iOS and Android with React Native',
    icon: '☐',
    accent: '#F59E0B',
    duration: '4 months',
    courses: 6,
    level: 'Beginner → Intermediate',
    enrolled: 6300,
    progress: 12,
    description:
      'Build beautiful, performant cross-platform mobile apps. From first screen to App Store submission.',
    skills: ['React Native', 'Expo', 'TypeScript', 'Redux', 'Firebase', 'App Store'],
    milestones: [
      { title: 'React Native Basics', weeks: '1-3', done: true },
      { title: 'Navigation & State', weeks: '4-6', done: false },
      { title: 'Native APIs & Device', weeks: '7-10', done: false },
      { title: 'Performance & Publishing', weeks: '11-16', done: false },
    ],
    courseList: [
      { id: '5', title: 'React Native: iOS & Android', progress: 15, accent: '#F59E0B' },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud Engineer',
    subtitle: 'Automate, scale, and ship with confidence',
    icon: '∞',
    accent: '#10B981',
    duration: '5 months',
    courses: 7,
    level: 'Intermediate → Advanced',
    enrolled: 4100,
    progress: 0,
    description:
      'Master the tools and culture of modern DevOps. Build CI/CD pipelines, manage infrastructure as code, and operate services at scale.',
    skills: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'AWS', 'Prometheus'],
    milestones: [
      { title: 'Linux & Networking', weeks: '1-3', done: false },
      { title: 'Docker & Containerization', weeks: '4-6', done: false },
      { title: 'Kubernetes Orchestration', weeks: '7-11', done: false },
      { title: 'CI/CD Pipelines', weeks: '12-14', done: false },
      { title: 'Cloud Infrastructure', weeks: '15-20', done: false },
    ],
    courseList: [
      { id: '6', title: 'DevOps & CI/CD', progress: 0, accent: '#10B981' },
    ],
  },
];

export default function PathsPage() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const filterOptions = [
    { id: 'all', label: 'All Paths' },
    { id: 'enrolled', label: 'Enrolled' },
    { id: 'beginner', label: 'Beginner-friendly' },
  ];

  const filtered = paths.filter((p) => {
    if (filter === 'enrolled') return p.progress > 0;
    if (filter === 'beginner') return p.level.startsWith('Beginner');
    return true;
  });

  const activePath = paths.find((p) => p.id === selected);

  return (
    <PageTransition>
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '40px' }}
        >
          <span className="section-label">Structured Learning</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginBottom: '12px' }}>
            Learning Paths
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '520px' }}>
            Follow a curated sequence of courses designed to take you from beginner to job-ready in a specific discipline.
          </p>
        </motion.div>

        {/* Filter */}
        <div className="filter-bar" style={{ marginBottom: '32px' }}>
          {filterOptions.map((opt) => (
            <motion.button
              key={opt.id}
              className={`filter-pill ${filter === opt.id ? 'active' : ''}`}
              onClick={() => setFilter(opt.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {opt.label}
            </motion.button>
          ))}
        </div>

        {/* Layout: grid + detail panel */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: selected ? '1fr 420px' : '1fr',
          gap: '24px',
          alignItems: 'start',
          transition: 'grid-template-columns 0.35s ease',
        }}>
          {/* Path Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <AnimatePresence>
              {filtered.map((path, i) => (
                <motion.div
                  key={path.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  onClick={() => setSelected(selected === path.id ? null : path.id)}
                  whileHover={{ x: 3 }}
                  style={{
                    background: selected === path.id
                      ? `linear-gradient(135deg, var(--bg-card), ${path.accent}08)`
                      : 'var(--bg-card)',
                    border: `1px solid ${selected === path.id ? path.accent + '40' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-xl)',
                    padding: '24px',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                    {/* Icon */}
                    <div style={{
                      width: 52,
                      height: 52,
                      borderRadius: '14px',
                      background: `${path.accent}18`,
                      border: `1px solid ${path.accent}28`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.3rem',
                      color: path.accent,
                      flexShrink: 0,
                    }}>
                      {path.icon}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                        marginBottom: '4px',
                        flexWrap: 'wrap',
                      }}>
                        <h3 style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.2rem',
                          fontWeight: '600',
                        }}>
                          {path.title}
                        </h3>
                        {path.progress > 0 && (
                          <span style={{
                            padding: '2px 10px',
                            background: `${path.accent}18`,
                            border: `1px solid ${path.accent}30`,
                            borderRadius: '20px',
                            fontSize: '0.7rem',
                            fontWeight: '700',
                            color: path.accent,
                          }}>
                            IN PROGRESS
                          </span>
                        )}
                      </div>

                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                        {path.subtitle}
                      </p>

                      {/* Meta */}
                      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: path.progress > 0 ? '14px' : '0' }}>
                        {[
                          { icon: '◷', text: path.duration },
                          { icon: '◈', text: `${path.courses} courses` },
                          { icon: '◉', text: path.level },
                          { icon: '♟', text: `${path.enrolled.toLocaleString()} enrolled` },
                        ].map(({ icon, text }) => (
                          <span key={text} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            fontSize: '0.78rem',
                            color: 'var(--text-secondary)',
                          }}>
                            <span style={{ color: path.accent }}>{icon}</span> {text}
                          </span>
                        ))}
                      </div>

                      {/* Progress */}
                      {path.progress > 0 && (
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.75rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Progress</span>
                            <span style={{ color: path.accent, fontWeight: '600' }}>{path.progress}%</span>
                          </div>
                          <div className="progress-bar">
                            <motion.div
                              className="progress-fill"
                              style={{ background: path.accent }}
                              initial={{ width: 0 }}
                              animate={{ width: `${path.progress}%` }}
                              transition={{ duration: 1, delay: i * 0.07 + 0.2 }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Chevron */}
                    <motion.div
                      animate={{ rotate: selected === path.id ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ color: 'var(--text-muted)', fontSize: '1rem', flexShrink: 0 }}
                    >
                      ›
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Detail Panel */}
          <AnimatePresence>
            {activePath && (
              <motion.div
                key={activePath.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.35 }}
                style={{
                  background: 'var(--bg-card)',
                  border: `1px solid ${activePath.accent}30`,
                  borderRadius: 'var(--radius-xl)',
                  padding: '28px',
                  position: 'sticky',
                  top: '84px',
                }}
              >
                {/* Header */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: '12px',
                    background: `${activePath.accent}18`,
                    border: `1px solid ${activePath.accent}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    color: activePath.accent,
                    marginBottom: '14px',
                  }}>
                    {activePath.icon}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '8px' }}>{activePath.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    {activePath.description}
                  </p>
                </div>

                {/* Skills */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>
                    Skills You'll Build
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {activePath.skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          padding: '4px 12px',
                          background: `${activePath.accent}12`,
                          border: `1px solid ${activePath.accent}25`,
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          color: activePath.accent,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Milestones */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    Milestones
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {activePath.milestones.map((m, i) => (
                      <motion.div
                        key={m.title}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        style={{
                          display: 'flex',
                          gap: '14px',
                          alignItems: 'flex-start',
                          padding: '10px 0',
                          borderBottom: i < activePath.milestones.length - 1
                            ? '1px solid var(--border)'
                            : 'none',
                        }}
                      >
                        {/* Node */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
                          <div style={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            background: m.done ? activePath.accent : 'var(--bg-primary)',
                            border: `2px solid ${m.done ? activePath.accent : 'var(--border)'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.6rem',
                            color: m.done ? '#0C0C0F' : 'var(--text-muted)',
                            flexShrink: 0,
                          }}>
                            {m.done ? '✓' : ''}
                          </div>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            color: m.done ? 'var(--text-primary)' : 'var(--text-secondary)',
                            marginBottom: '2px',
                          }}>
                            {m.title}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            Week {m.weeks}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Included Courses */}
                {activePath.courseList.length > 0 && (
                  <div style={{ marginBottom: '22px' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>
                      Your Courses in This Path
                    </div>
                    {activePath.courseList.map((c) => (
                      <Link
                        key={c.id}
                        href={`/courses/${c.id}`}
                        style={{
                          display: 'flex',
                          gap: '10px',
                          alignItems: 'center',
                          padding: '10px',
                          background: 'var(--bg-primary)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius)',
                          textDecoration: 'none',
                          color: 'inherit',
                          marginBottom: '8px',
                        }}
                      >
                        <div style={{
                          width: 28,
                          height: 28,
                          borderRadius: '8px',
                          background: `${c.accent}18`,
                          border: `1px solid ${c.accent}25`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.7rem',
                          color: c.accent,
                          flexShrink: 0,
                        }}>
                          ◎
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '0.8rem', fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {c.title}
                          </div>
                          {c.progress > 0 && (
                            <div style={{ marginTop: '4px' }}>
                              <div className="progress-bar" style={{ height: '3px' }}>
                                <div className="progress-fill" style={{ background: c.accent, width: `${c.progress}%` }} />
                              </div>
                            </div>
                          )}
                        </div>
                        <span style={{ fontSize: '0.72rem', color: c.accent, fontWeight: '600', flexShrink: 0 }}>
                          {c.progress > 0 ? `${c.progress}%` : 'Start'}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: '100%',
                    padding: '13px',
                    background: activePath.accent,
                    border: 'none',
                    borderRadius: 'var(--radius)',
                    color: '#0C0C0F',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {activePath.progress > 0 ? `Continue Path (${activePath.progress}%)` : 'Start This Path'}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
