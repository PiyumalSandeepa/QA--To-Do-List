import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  const handleGetStarted = () => {
    // This would typically navigate to the task add page
    alert('Redirecting to task creation page...');
    // In a real app: history.push('/add-task') or similar
  };

  return (
    <div className="landing-container">
      
      
      <main className="main-content">
        <div className="hero-section">
          <h2 className="hero-title">Organize Your Tasks Effortlessly</h2>
          <p className="hero-description">
            Focus on what matters most with our simple task management system. 
            No distractions, just productivity.
          </p>
          
          <div className="cta-container">
            <button className="cta-button" onClick={handleGetStarted}>
              Add Your First Task
            </button>
          </div>
        </div>
        
        <div className="features-section">
          <h3 className="features-title">Why Choose TaskFlow?</h3>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h4>Simple Interface</h4>
              <p>No unnecessary features, just what you need to manage tasks</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⏱</div>
              <h4>Time Saver</h4>
              <p>Quick task creation and organization</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h4>Focus Oriented</h4>
              <p>Minimal design helps you concentrate on your work</p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="footer">
        <p>© {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;