import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar({ url, setUrl, onRunAudit, issues, issueCounts, selectedIssue, onSelectIssue, activeTab, onTabChange }) {

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical':
        return '#FF4444';
      case 'High':
        return '#FF8844';
      case 'Medium':
        return '#FFBB44';
      case 'Low':
        return '#44CC44';
      default:
        return '#666';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'Critical':
        return '●';
      case 'High':
        return '●';
      case 'Medium':
        return '●';
      case 'Low':
        return '●';
      default:
        return '●';
    }
  };

  const tabs = ['Audit', 'Visual diff', 'Compare', 'Personas', 'AI Chat', 'History'];
  const totalIssues = issues.length;

  return (
    <div className="sidebar">
      {/* Header with Logo */}
      <div className="sidebar-header">
        <div className="logo">🔍</div>
        <h1 className="app-title">UX Auditor</h1>
      </div>

      {/* URL Input */}
      <div className="url-input-section">
        <div className="url-input-container">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="url-input"
            placeholder="Enter URL..."
          />
          <button className="run-audit-btn" onClick={onRunAudit}>
            Run audit
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Issues Summary */}
      <div className="issues-summary">
        <div className="summary-header">
          <div className="issue-count">
            <span className="count-number">{totalIssues}</span>
            <span className="count-text">Needs work</span>
            <span className="count-subtitle">{totalIssues} issues found</span>
          </div>
        </div>

        <div className="severity-badges">
          {issueCounts.Critical > 0 && (
            <span className="badge critical">
              <span className="badge-icon">●</span>
              {issueCounts.Critical} Critical
            </span>
          )}
          {issueCounts.High > 0 && (
            <span className="badge high">
              <span className="badge-icon">●</span>
              {issueCounts.High} High
            </span>
          )}
          {issueCounts.Medium > 0 && (
            <span className="badge medium">
              <span className="badge-icon">●</span>
              {issueCounts.Medium} Medium
            </span>
          )}
          {issueCounts.Low > 0 && (
            <span className="badge low">
              <span className="badge-icon">●</span>
              {issueCounts.Low} Low
            </span>
          )}
        </div>
      </div>

      {/* Issues List */}
      <div className="issues-list">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className={`issue-item ${selectedIssue?.id === issue.id ? 'active' : ''}`}
            onClick={() => onSelectIssue(issue)}
            style={{
              borderLeftColor: getSeverityColor(issue.severity),
            }}
          >
            <div className="issue-severity-icon">
              <span
                className="severity-dot"
                style={{ color: getSeverityColor(issue.severity) }}
              >
                ●
              </span>
            </div>
            <div className="issue-content">
              <h3 className="issue-title">{issue.title}</h3>
              <p className="issue-meta">
                {issue.wcag} · {issue.heuristic}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
