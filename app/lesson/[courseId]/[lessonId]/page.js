'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { getCourseById } from '@/lib/mockData';
import { useToast } from '@/components/Toast';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const toast = useToast();
  const course = getCourseById(params.courseId);
  const [playing, setPlaying] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completedSet, setCompletedSet] = useState(
    new Set(
      course?.curriculum.flatMap((s) =>
        s.lessons.filter((l) => l.completed).map((l) => l.id)
      ) ?? []
    )
  );

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

  // Find current lesson
  const allLessons = course.curriculum.flatMap((s) =>
    s.lessons.map((l) => ({ ...l, sectionTitle: s.title }))
  );
  const currentIndex = allLessons.findIndex((l) => l.id === params.lessonId);
  const currentLesson = allLessons[currentIndex] ?? allLessons[0];
  const prevLesson = allLessons[currentIndex - 1];
  const nextLesson = allLessons[currentIndex + 1];

  const markComplete = () => {
    const alreadyDone = completedSet.has(currentLesson.id);
    setCompletedSet((prev) => new Set([...prev, currentLesson.id]));
    if (!alreadyDone) {
      toast({ message: `"${currentLesson.title}" marked complete! +50 XP`, type: 'xp' });
    }
    if (nextLesson) router.push(`/lesson/${course.id}/${nextLesson.id}`);
    else toast({ message: '🎉 Course complete! Certificate unlocked.', type: 'success' });
  };

  const typeIcon = { video: '▶', quiz: '◈', project: '◎' };
  const typeLabel = { video: 'Video Lesson', quiz: 'Quiz', project: 'Project' };
  const progressPercent = Math.round((completedSet.size / allLessons.length) * 100);

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 68px)' }}>
      {/* Main Content */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '28px 32px',
        borderRight: sidebarOpen ? '1px solid var(--border)' : 'none',
      }}>
        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
            flexWrap: 'wrap',
          }}
        >
          <Link
            href={`/courses/${course.id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              padding: '5px 12px',
              borderRadius: '6px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}
          >
            ← {course.title}
          </Link>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {currentIndex + 1} / {allLessons.length}
          </span>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              padding: '6px 12px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-body)',
            }}
          >
            {sidebarOpen ? '☰ Hide' : '☰ Show'} Lessons
          </button>
        </motion.div>

        {/* Video Player */}
        <motion.div
          key={currentLesson.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="lesson-video-placeholder">
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(135deg, ${course.accent}08 0%, transparent 60%)`,
            }} />

            {/* Geometric decoration */}
            <div style={{
              position: 'absolute',
              top: 20,
              right: 20,
              width: 120,
              height: 120,
              borderRadius: '50%',
              border: `1px solid ${course.accent}20`,
            }} />
            <div style={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              width: 80,
              height: 80,
              borderRadius: '12px',
              border: `1px solid ${course.accent}15`,
              transform: 'rotate(45deg)',
            }} />

            <AnimatePresence mode="wait">
              {!playing ? (
                <motion.div
                  key="play"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.2, opacity: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', zIndex: 1 }}
                >
                  <motion.button
                    className="play-btn"
                    style={{ background: course.accent }}
                    onClick={() => setPlaying(true)}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span style={{ fontSize: '1.4rem', color: '#0C0C0F', marginLeft: '4px' }}>▶</span>
                  </motion.button>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {typeLabel[currentLesson.type]} · {currentLesson.duration}
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="playing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    zIndex: 1,
                  }}
                >
                  {/* Animated bars to simulate audio */}
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '40px' }}>
                    {[0.4, 0.8, 0.5, 1, 0.6, 0.9, 0.4, 0.7, 0.5, 0.8].map((h, i) => (
                      <motion.div
                        key={i}
                        style={{
                          width: 5,
                          borderRadius: 4,
                          background: course.accent,
                        }}
                        animate={{ height: [h * 40, h * 20, h * 40] }}
                        transition={{ duration: 0.8 + i * 0.1, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Playing... {currentLesson.duration}
                  </span>
                  <button
                    onClick={() => setPlaying(false)}
                    style={{
                      padding: '5px 14px',
                      background: 'rgba(0,0,0,0.4)',
                      border: '1px solid var(--border)',
                      borderRadius: '20px',
                      color: 'var(--text-secondary)',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    ❙❙ Pause
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Lesson info */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 12px',
                background: `${course.accent}18`,
                border: `1px solid ${course.accent}25`,
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '600',
                color: course.accent,
              }}>
                {typeIcon[currentLesson.type]} {typeLabel[currentLesson.type]}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Section: {currentLesson.sectionTitle}
              </span>
              {completedSet.has(currentLesson.id) && (
                <span style={{
                  padding: '4px 10px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: '20px',
                  fontSize: '0.72rem',
                  color: '#10B981',
                  fontWeight: '600',
                }}>
                  ✓ Completed
                </span>
              )}
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '12px' }}>
              {currentLesson.title}
            </h2>

            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.95rem', maxWidth: '640px' }}>
              In this lesson, you'll explore the core concepts behind {currentLesson.title.toLowerCase()}.
              We cover practical examples, common pitfalls, and best practices used in production codebases.
              Follow along with the exercises and check your understanding with the embedded quizzes.
            </p>
          </div>

          {/* Key concepts */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            marginBottom: '28px',
          }}>
            <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: '16px', fontSize: '1.1rem' }}>
              Key Concepts
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'Core principles and mental models',
                'Practical implementation strategies',
                'Performance considerations',
                'Common patterns and anti-patterns',
              ].map((concept, i) => (
                <motion.div
                  key={concept}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.3 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <span style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: course.accent,
                    flexShrink: 0,
                  }} />
                  {concept}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              {prevLesson && (
                <Link
                  href={`/lesson/${course.id}/${prevLesson.id}`}
                  className="btn btn-secondary"
                >
                  ← Previous
                </Link>
              )}
            </div>
            <motion.button
              onClick={markComplete}
              className="btn btn-primary"
              style={{ backgroundColor: course.accent }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {completedSet.has(currentLesson.id) ? (
                nextLesson ? 'Next Lesson →' : 'Course Complete ✓'
              ) : (
                nextLesson ? 'Mark Complete & Continue →' : 'Complete Course ✓'
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{
              background: 'var(--bg-secondary)',
              borderLeft: '1px solid var(--border)',
              overflow: 'auto',
              height: 'calc(100vh - 68px)',
              position: 'sticky',
              top: '68px',
              flexShrink: 0,
            }}
          >
            {/* Sidebar header */}
            <div style={{
              padding: '20px 20px 14px',
              borderBottom: '1px solid var(--border)',
              position: 'sticky',
              top: 0,
              background: 'var(--bg-secondary)',
              zIndex: 1,
            }}>
              <div style={{ fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Course Progress
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{progressPercent}% complete</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  {completedSet.size}/{allLessons.length}
                </span>
              </div>
              <div className="progress-bar" style={{ height: '5px' }}>
                <motion.div
                  className="progress-fill"
                  style={{ background: course.accent }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>

            {/* Lessons list */}
            {course.curriculum.map((section) => (
              <div key={section.id}>
                <div style={{
                  padding: '12px 20px 8px',
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  background: 'var(--bg-secondary)',
                }}>
                  {section.title}
                </div>
                {section.lessons.map((lesson) => {
                  const isCurrent = lesson.id === (params.lessonId ?? allLessons[0].id);
                  const isCompleted = completedSet.has(lesson.id);
                  return (
                    <Link
                      key={lesson.id}
                      href={`/lesson/${course.id}/${lesson.id}`}
                      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                    >
                      <motion.div
                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '11px 20px',
                          borderLeft: `3px solid ${isCurrent ? course.accent : 'transparent'}`,
                          background: isCurrent ? `${course.accent}0A` : 'transparent',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{
                          width: 26,
                          height: 26,
                          borderRadius: '50%',
                          background: isCompleted
                            ? 'rgba(16, 185, 129, 0.15)'
                            : isCurrent
                            ? `${course.accent}18`
                            : 'var(--bg-card)',
                          border: `1px solid ${isCompleted ? '#10B981' : isCurrent ? course.accent : 'var(--border)'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.6rem',
                          color: isCompleted ? '#10B981' : isCurrent ? course.accent : 'var(--text-muted)',
                          flexShrink: 0,
                        }}>
                          {isCompleted ? '✓' : { video: '▶', quiz: '◈', project: '◎' }[lesson.type]}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            fontSize: '0.82rem',
                            fontWeight: isCurrent ? '600' : '400',
                            color: isCurrent ? 'var(--text-primary)' : 'var(--text-secondary)',
                            lineHeight: '1.3',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}>
                            {lesson.title}
                          </div>
                          <div style={{ fontSize: '0.71rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                            {lesson.duration}
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
