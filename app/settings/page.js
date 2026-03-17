'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { useToast } from '@/components/Toast';

function Toggle({ value, onChange, accent = 'var(--gold)' }) {
  return (
    <motion.button
      onClick={() => onChange(!value)}
      style={{
        width: 44,
        height: 24,
        borderRadius: '12px',
        background: value ? accent : 'var(--border)',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background 0.25s ease',
        flexShrink: 0,
      }}
    >
      <motion.div
        animate={{ x: value ? 22 : 2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        style={{
          position: 'absolute',
          top: 2,
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
        }}
      />
    </motion.button>
  );
}

function SettingsRow({ label, description, children }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '20px',
      padding: '16px 0',
      borderBottom: '1px solid var(--border)',
    }}>
      <div>
        <div style={{ fontSize: '0.9rem', fontWeight: '500', marginBottom: description ? '3px' : 0 }}>
          {label}
        </div>
        {description && (
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
            {description}
          </div>
        )}
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}

function SectionCard({ title, icon, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        padding: '24px 28px',
        marginBottom: '20px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
        <span style={{ fontSize: '1.1rem' }}>{icon}</span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>{title}</h3>
      </div>
      <div style={{ marginTop: '8px' }}>{children}</div>
    </motion.div>
  );
}

const accentColors = [
  { label: 'Gold', value: '#E8C547' },
  { label: 'Teal', value: '#4ECDC4' },
  { label: 'Terracotta', value: '#C47A52' },
  { label: 'Purple', value: '#A855F7' },
  { label: 'Emerald', value: '#10B981' },
  { label: 'Amber', value: '#F59E0B' },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('account');

  // Account
  const [name, setName] = useState('Alex Morgan');
  const [email, setEmail] = useState('alex.morgan@email.com');
  const [title, setTitle] = useState('Full Stack Developer');
  const [saved, setSaved] = useState(false);

  // Notifications
  const [notifs, setNotifs] = useState({
    lessonReminders: true,
    weeklyDigest: true,
    newCourses: false,
    achievements: true,
    streakAlerts: true,
    marketing: false,
  });

  // Appearance
  const [selectedAccent, setSelectedAccent] = useState('#E8C547');
  const [compactMode, setCompactMode] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [fontSize, setFontSize] = useState('medium');

  // Privacy
  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showProgress: false,
    showCertificates: true,
    dataCollection: true,
  });

  // Goal
  const [weeklyGoal, setWeeklyGoal] = useState(10);
  const [reminderTime, setReminderTime] = useState('19:00');
  const toast = useToast();
  const [confirmAction, setConfirmAction] = useState(null);

  // Store original values for cancel
  const [origName] = useState('Alex Morgan');
  const [origEmail] = useState('alex.morgan@email.com');
  const [origTitle] = useState('Full Stack Developer');

  const handleSave = () => {
    setSaved(true);
    toast({ message: 'Settings saved successfully!', type: 'success' });
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCancel = () => {
    setName(origName);
    setEmail(origEmail);
    setTitle(origTitle);
    toast({ message: 'Changes discarded', type: 'info' });
  };

  const sections = [
    { id: 'account', label: 'Account', icon: '◎' },
    { id: 'notifications', label: 'Notifications', icon: '◉' },
    { id: 'appearance', label: 'Appearance', icon: '◈' },
    { id: 'learning', label: 'Learning', icon: '◷' },
    { id: 'privacy', label: 'Privacy', icon: '◌' },
    { id: 'danger', label: 'Danger Zone', icon: '⚠' },
  ];

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    background: 'var(--bg-primary)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <PageTransition>
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={{ marginBottom: '40px' }}
        >
          <span className="section-label">Preferences</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}>
            Settings
          </h1>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '32px', alignItems: 'start' }}>
          {/* Sidebar nav */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              padding: '8px',
              position: 'sticky',
              top: '84px',
            }}
          >
            {sections.map(({ id, label, icon }) => (
              <motion.button
                key={id}
                onClick={() => setActiveSection(id)}
                whileHover={{ x: 3 }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: activeSection === id ? 'var(--gold-dim)' : 'transparent',
                  border: 'none',
                  color: activeSection === id ? 'var(--gold)' : id === 'danger' ? '#F87171' : 'var(--text-secondary)',
                  fontSize: '0.875rem',
                  fontWeight: activeSection === id ? '600' : '400',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'var(--font-body)',
                  transition: 'all 0.2s',
                }}
              >
                <span>{icon}</span>
                {label}
              </motion.button>
            ))}
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {/* ── Account ── */}
              {activeSection === 'account' && (
                <SectionCard title="Account Information" icon="◎">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
                    {/* Avatar */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                      <div style={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--gold), var(--terracotta))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        fontWeight: '700',
                        color: '#0C0C0F',
                      }}>
                        AM
                      </div>
                      <div>
                        <button onClick={() => toast({ message: 'Photo upload coming soon!', type: 'info' })} style={{
                          padding: '7px 16px',
                          background: 'var(--bg-card-hover)',
                          border: '1px solid var(--border-light)',
                          borderRadius: '8px',
                          color: 'var(--text-primary)',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-body)',
                          marginBottom: '5px',
                          display: 'block',
                        }}>
                          Upload photo
                        </button>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>JPG or PNG, max 2 MB</div>
                      </div>
                    </div>

                    {[
                      { label: 'Full Name', value: name, setter: setName },
                      { label: 'Email Address', value: email, setter: setEmail },
                      { label: 'Professional Title', value: title, setter: setTitle },
                    ].map(({ label, value, setter }) => (
                      <div key={label}>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                          {label}
                        </label>
                        <input
                          value={value}
                          onChange={(e) => setter(e.target.value)}
                          style={inputStyle}
                          onFocus={(e) => { e.target.style.borderColor = 'rgba(232,197,71,0.4)'; }}
                          onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                        />
                      </div>
                    ))}

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                        Bio
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell other learners about yourself..."
                        style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.5' }}
                        onFocus={(e) => { e.target.style.borderColor = 'rgba(232,197,71,0.4)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
                      <motion.button
                        onClick={handleSave}
                        className="btn btn-primary"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {saved ? '✓ Saved!' : 'Save Changes'}
                      </motion.button>
                      <button className="btn btn-ghost" onClick={handleCancel}>Cancel</button>
                    </div>
                  </div>
                </SectionCard>
              )}

              {/* ── Notifications ── */}
              {activeSection === 'notifications' && (
                <SectionCard title="Notification Preferences" icon="◉">
                  {Object.entries({
                    lessonReminders: { label: 'Lesson reminders', desc: 'Get reminded to continue your courses' },
                    weeklyDigest: { label: 'Weekly learning digest', desc: 'A summary of your progress every Monday' },
                    newCourses: { label: 'New course alerts', desc: 'Be notified when new courses are added' },
                    achievements: { label: 'Achievement unlocks', desc: 'Celebrate when you earn a badge' },
                    streakAlerts: { label: 'Streak at risk', desc: 'Warned when your streak is about to break' },
                    marketing: { label: 'Promotions & offers', desc: 'Discounts and special offers from Lumina' },
                  }).map(([key, { label, desc }]) => (
                    <SettingsRow key={key} label={label} description={desc}>
                      <Toggle
                        value={notifs[key]}
                        onChange={(v) => setNotifs((p) => ({ ...p, [key]: v }))}
                      />
                    </SettingsRow>
                  ))}
                </SectionCard>
              )}

              {/* ── Appearance ── */}
              {activeSection === 'appearance' && (
                <SectionCard title="Appearance" icon="◈">
                  <SettingsRow label="Compact Mode" description="Reduce padding and spacing throughout the UI">
                    <Toggle value={compactMode} onChange={setCompactMode} />
                  </SettingsRow>
                  <SettingsRow label="Reduce Motion" description="Minimize animations for accessibility">
                    <Toggle value={reducedMotion} onChange={setReducedMotion} />
                  </SettingsRow>
                  <SettingsRow label="Font Size">
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {['small', 'medium', 'large'].map((s) => (
                        <button
                          key={s}
                          onClick={() => setFontSize(s)}
                          style={{
                            padding: '5px 12px',
                            borderRadius: '6px',
                            background: fontSize === s ? 'var(--gold-dim)' : 'var(--bg-primary)',
                            border: `1px solid ${fontSize === s ? 'rgba(232,197,71,0.3)' : 'var(--border)'}`,
                            color: fontSize === s ? 'var(--gold)' : 'var(--text-secondary)',
                            fontSize: '0.78rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            fontFamily: 'var(--font-body)',
                          }}
                        >
                          {s[0].toUpperCase() + s.slice(1)}
                        </button>
                      ))}
                    </div>
                  </SettingsRow>

                  {/* Accent color */}
                  <div style={{ paddingTop: '16px' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: '600', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                      Accent Color
                    </div>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {accentColors.map(({ label, value }) => (
                        <motion.button
                          key={value}
                          onClick={() => setSelectedAccent(value)}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          title={label}
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            background: value,
                            border: selectedAccent === value ? '3px solid white' : '3px solid transparent',
                            outline: selectedAccent === value ? `2px solid ${value}` : 'none',
                            cursor: 'pointer',
                            boxShadow: selectedAccent === value ? `0 0 10px ${value}60` : 'none',
                            transition: 'all 0.2s',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </SectionCard>
              )}

              {/* ── Learning ── */}
              {activeSection === 'learning' && (
                <SectionCard title="Learning Goals" icon="◷">
                  <div style={{ paddingTop: '8px' }}>
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                        Weekly Learning Goal
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <input
                          type="range"
                          min={1}
                          max={40}
                          value={weeklyGoal}
                          onChange={(e) => setWeeklyGoal(Number(e.target.value))}
                          style={{ flex: 1, accentColor: 'var(--gold)' }}
                        />
                        <span style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: '700',
                          fontSize: '1.4rem',
                          color: 'var(--gold)',
                          minWidth: '60px',
                          textAlign: 'right',
                        }}>
                          {weeklyGoal}h
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                        {weeklyGoal <= 5 ? 'Casual pace — great for beginners' :
                         weeklyGoal <= 15 ? 'Steady pace — building consistent habits' :
                         weeklyGoal <= 25 ? 'Intensive learning — making real progress' :
                         'Bootcamp mode — total immersion 🔥'}
                      </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                        Daily Reminder Time
                      </label>
                      <input
                        type="time"
                        value={reminderTime}
                        onChange={(e) => setReminderTime(e.target.value)}
                        style={{ ...inputStyle, width: 'auto' }}
                      />
                    </div>

                    <SettingsRow label="Autoplay next lesson" description="Automatically begin the next lesson after completing one">
                      <Toggle value={true} onChange={() => {}} />
                    </SettingsRow>
                    <SettingsRow label="Show subtitles by default" description="Display captions on all video lessons">
                      <Toggle value={false} onChange={() => {}} />
                    </SettingsRow>
                    <SettingsRow label="Playback speed memory" description="Remember your preferred playback speed per course">
                      <Toggle value={true} onChange={() => {}} />
                    </SettingsRow>
                  </div>
                </SectionCard>
              )}

              {/* ── Privacy ── */}
              {activeSection === 'privacy' && (
                <SectionCard title="Privacy & Data" icon="◌">
                  {Object.entries({
                    publicProfile: { label: 'Public profile', desc: 'Other learners can see your profile page' },
                    showProgress: { label: 'Show course progress', desc: 'Display your course progress publicly' },
                    showCertificates: { label: 'Show certificates', desc: 'Display earned certificates on your profile' },
                    dataCollection: { label: 'Analytics & improvement', desc: 'Help improve Lumina with anonymized usage data' },
                  }).map(([key, { label, desc }]) => (
                    <SettingsRow key={key} label={label} description={desc}>
                      <Toggle
                        value={privacy[key]}
                        onChange={(v) => setPrivacy((p) => ({ ...p, [key]: v }))}
                        accent="var(--teal)"
                      />
                    </SettingsRow>
                  ))}

                  <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                    <button
                      onClick={() => toast({ message: 'Preparing your data export...', type: 'info' })}
                      style={{
                        padding: '9px 20px',
                        background: 'transparent',
                        border: '1px solid var(--border-light)',
                        borderRadius: '8px',
                        color: 'var(--text-secondary)',
                        fontSize: '0.84rem',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-body)',
                        marginRight: '10px',
                      }}
                    >
                      Download my data
                    </button>
                  </div>
                </SectionCard>
              )}

              {/* ── Danger Zone ── */}
              {activeSection === 'danger' && (
                <SectionCard title="Danger Zone" icon="⚠">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '8px' }}>
                    {[
                      { label: 'Reset learning progress', desc: 'Clear all course progress. This cannot be undone.', btnLabel: 'Reset Progress', color: '#F59E0B' },
                      { label: 'Delete account', desc: 'Permanently delete your account and all associated data.', btnLabel: 'Delete Account', color: '#F87171' },
                    ].map(({ label, desc, btnLabel, color }) => (
                      <div
                        key={label}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '16px',
                          background: `${color}08`,
                          border: `1px solid ${color}25`,
                          borderRadius: 'var(--radius)',
                          gap: '20px',
                          flexWrap: 'wrap',
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '4px', color }}>{label}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{desc}</div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            if (confirmAction === btnLabel) {
                              toast({ message: label === 'Reset learning progress' ? 'Progress has been reset' : 'Account deletion requested', type: label === 'Reset learning progress' ? 'warning' : 'error' });
                              setConfirmAction(null);
                            } else {
                              setConfirmAction(btnLabel);
                              toast({ message: `Click "${btnLabel}" again to confirm`, type: 'warning' });
                            }
                          }}
                          style={{
                            padding: '8px 18px',
                            background: 'transparent',
                            border: `1px solid ${color}50`,
                            borderRadius: '8px',
                            color,
                            fontSize: '0.82rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            fontFamily: 'var(--font-body)',
                            flexShrink: 0,
                          }}
                        >
                          {confirmAction === btnLabel ? `Confirm ${btnLabel}` : btnLabel}
                        </motion.button>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
