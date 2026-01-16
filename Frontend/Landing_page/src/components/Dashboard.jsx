import { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard({ user, onLogout }) {
  useEffect(() => {
    // Enable body scrolling for dashboard
    document.body.classList.add('dashboard-active');
    return () => {
      document.body.classList.remove('dashboard-active');
    };
  }, []);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    petitions: 0,
    polls: 0,
    responses: 0,
    engagement: 0,
  });

  useEffect(() => {
    // Animate stats on mount
    const animateStats = () => {
      const targets = {
        petitions: 12,
        polls: 8,
        responses: 5,
        engagement: 87,
      };

      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setStats({
          petitions: Math.floor(targets.petitions * easeOut),
          polls: Math.floor(targets.polls * easeOut),
          responses: Math.floor(targets.responses * easeOut),
          engagement: Math.floor(targets.engagement * easeOut),
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setStats(targets);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    const timer = setTimeout(animateStats, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    // Clear user session (cookie will be cleared by backend on next request)
    // For now, just call onLogout to update UI state
    if (onLogout) onLogout();
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-content">
            <div className="header-left">
              <h1 className="dashboard-title">
                <span className="title-icon">🗳️</span>
                Dashboard
              </h1>
              <p className="dashboard-subtitle">
                Welcome back, <span className="user-name">{user?.name || 'User'}</span>
              </p>
            </div>
            <div className="header-right">
              <div className="user-badge">
                <div className="badge-icon">{user?.role === 'official' ? '👔' : '👤'}</div>
                <span className="badge-text">{user?.role || 'citizen'}</span>
              </div>
              <button className="logout-button" onClick={handleLogout}>
                <span>Logout</span>
                <span className="logout-icon">→</span>
              </button>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card stat-card-1">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <div className="stat-value">{stats.petitions}</div>
              <div className="stat-label">Active Petitions</div>
            </div>
            <div className="stat-trend">+12%</div>
          </div>

          <div className="stat-card stat-card-2">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-value">{stats.polls}</div>
              <div className="stat-label">Live Polls</div>
            </div>
            <div className="stat-trend">+8%</div>
          </div>

          <div className="stat-card stat-card-3">
            <div className="stat-icon">💬</div>
            <div className="stat-content">
              <div className="stat-value">{stats.responses}</div>
              <div className="stat-label">Official Responses</div>
            </div>
            <div className="stat-trend">+5%</div>
          </div>

          <div className="stat-card stat-card-4">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <div className="stat-value">{stats.engagement}%</div>
              <div className="stat-label">Engagement Rate</div>
            </div>
            <div className="stat-trend">+3%</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="dashboard-tabs">
          <button
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span>Overview</span>
          </button>
          <button
            className={`tab-button ${activeTab === 'petitions' ? 'active' : ''}`}
            onClick={() => setActiveTab('petitions')}
          >
            <span>Petitions</span>
          </button>
          <button
            className={`tab-button ${activeTab === 'polls' ? 'active' : ''}`}
            onClick={() => setActiveTab('polls')}
          >
            <span>Polls</span>
          </button>
          <button
            className={`tab-button ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            <span>Activity</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="content-panel animate-fade-in">
              <h2 className="panel-title">Recent Activity</h2>
              <div className="activity-list">
                {[
                  { icon: '📝', title: 'New Petition Created', time: '2 hours ago', color: 'green' },
                  { icon: '📊', title: 'Poll Results Updated', time: '5 hours ago', color: 'cyan' },
                  { icon: '💬', title: 'Official Response Received', time: '1 day ago', color: 'blue' },
                  { icon: '✅', title: 'Petition Approved', time: '2 days ago', color: 'green' },
                ].map((activity, idx) => (
                  <div key={idx} className="activity-item" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className={`activity-icon activity-${activity.color}`}>{activity.icon}</div>
                    <div className="activity-details">
                      <div className="activity-title">{activity.title}</div>
                      <div className="activity-time">{activity.time}</div>
                    </div>
                    <div className="activity-arrow">→</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'petitions' && (
            <div className="content-panel animate-fade-in">
              <h2 className="panel-title">Your Petitions</h2>
              <div className="petitions-grid">
                {[
                  { title: 'Improve Local Park Facilities', status: 'active', signatures: 234, goal: 500 },
                  { title: 'Traffic Safety Measures', status: 'review', signatures: 89, goal: 200 },
                  { title: 'Community Center Renovation', status: 'completed', signatures: 450, goal: 300 },
                ].map((petition, idx) => (
                  <div key={idx} className="petition-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className="petition-header">
                      <h3 className="petition-title">{petition.title}</h3>
                      <span className={`petition-status status-${petition.status}`}>
                        {petition.status}
                      </span>
                    </div>
                    <div className="petition-progress">
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${(petition.signatures / petition.goal) * 100}%` }}
                        ></div>
                      </div>
                      <div className="progress-text">
                        {petition.signatures} / {petition.goal} signatures
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'polls' && (
            <div className="content-panel animate-fade-in">
              <h2 className="panel-title">Active Polls</h2>
              <div className="polls-list">
                {[
                  { question: 'Should we implement bike lanes?', votes: 456, option: 'Yes' },
                  { question: 'Preferred community event time?', votes: 289, option: 'Evening' },
                  { question: 'Library extension hours?', votes: 123, option: 'Yes' },
                ].map((poll, idx) => (
                  <div key={idx} className="poll-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className="poll-question">{poll.question}</div>
                    <div className="poll-stats">
                      <div className="poll-votes">{poll.votes} votes</div>
                      <div className="poll-option">Your vote: {poll.option}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="content-panel animate-fade-in">
              <h2 className="panel-title">Your Activity Timeline</h2>
              <div className="timeline">
                {[
                  { date: 'Today', items: ['Signed 3 petitions', 'Voted on 2 polls'] },
                  { date: 'This Week', items: ['Created 1 petition', 'Received 2 responses'] },
                  { date: 'This Month', items: ['Total engagement: 45 actions'] },
                ].map((period, idx) => (
                  <div key={idx} className="timeline-period">
                    <div className="timeline-date">{period.date}</div>
                    <div className="timeline-items">
                      {period.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="timeline-item">{item}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

