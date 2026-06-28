import React, { useState } from 'react';
import './MainContent.css';

function MainContent({
  issues,
  issue,
  onSelectIssue,
  activeView,
  auditResult
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [changedComponents, setChangedComponents] = useState([
    { id: 'cta', label: 'CTA Button', type: 'Contrast', status: 'Improved' },
    { id: 'nav', label: 'Navigation Bar', type: 'Keyboard', status: 'Improved' },
    { id: 'font', label: 'Font Size', type: 'Typography', status: 'Improved' },
    { id: 'color', label: 'Color Contrast', type: 'Contrast', status: 'Improved' },
    { id: 'form', label: 'Form Labels', type: 'Labels', status: 'Improved' },
  ]);
  const [selectedChange, setSelectedChange] = useState(null);
  const selected =
  auditResult?.recommendations?.[0];

  const handleDownload = () => {
    const content = `<!DOCTYPE html>
<html>
  <head>
    <style>
      body { font-family: Inter, sans-serif; background: #f8fafc; color: #111827; padding: 24px; }
      .btn { background: #636CF1; color: white; padding: 12px 18px; border-radius: 8px; }
      .card { border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; }
    </style>
  </head>
  <body>
    <div class="card">
      <h2>AI Improved UX Preview</h2>
      <p>Accessibility improvements applied for contrast, readability, and focus states.</p>
      <button class="btn">Start free trial</button>
    </div>
  </body>
</html>`;

    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ai-improved-preview.html';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (activeView === 'Visual diff') {
    return (
      <div className="main-content">
        <div className="visual-diff-view">
          <div className="dashboard-header">
            <div>
              <p className="eyebrow">Visual diff</p>
              <h2>Original vs AI improved version</h2>
            </div>
            <button className="refresh-btn" onClick={handleDownload}>
              Download improved HTML/CSS
            </button>
          </div>

          <div className="comparison-toolbar">
            <span className="pill">Side-by-side comparison</span>
            <span className="pill">Before / After slider</span>
            <span className="pill">Highlighted improvements</span>
          </div>

          <div className="comparison-stage">
            <div className="comparison-panel original-panel">
              <div className="panel-label">Original website</div>
              <div className="mock-screen original-screen">
                <div className="mock-nav">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
                <div className="mock-hero">
                  <h3>Checkout faster</h3>
                  <p>Start your journey with a smooth experience.</p>
                  <button className="mock-btn original-btn">Click here</button>
                </div>
                <div className="mock-card weak-card">
                  <p>Small buttons and low contrast can hurt usability.</p>
                </div>
              </div>
            </div>

            <div className="comparison-panel improved-panel" style={{ width: `${sliderPosition}%` }}>
              <div className="panel-label">AI improved version</div>
              <div className="mock-screen improved-screen">
                <div className="mock-nav">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
                <div className="mock-hero">
                  <h3>Checkout faster</h3>
                  <p>Start your journey with a smooth experience.</p>
                  <button className="mock-btn improved-btn">Start free trial</button>
                </div>
                <div className="mock-card strong-card">
                  <p>High contrast, larger targets, and clear action labels.</p>
                </div>
                <div className="highlight-badge">Improved contrast</div>
                {selectedChange === 'cta' && (
                  <div className="highlight-overlay">CTA Button changed</div>
                )}
              </div>
            </div>

            <div className="slider-divider" style={{ left: `${sliderPosition}%` }} />
            <input
              type="range"
              min="10"
              max="90"
              value={sliderPosition}
              className="slider-control"
              onChange={(event) => setSliderPosition(Number(event.target.value))}
            />
          </div>

          <div className="changed-components">
            <div className="card-title-row">
              <h3>Changed components</h3>
              <span className="pill">{changedComponents.length}</span>
            </div>
            <div className="change-list">
              {changedComponents.map((c) => (
                <div
                  key={c.id}
                  className={`change-item ${selectedChange === c.id ? 'selected' : ''}`}
                  onClick={() => setSelectedChange(selectedChange === c.id ? null : c.id)}
                >
                  <div>
                    <strong>{c.label}</strong>
                    <div className="change-meta">{c.type} · {c.status}</div>
                  </div>
                  <div className="change-check">{selectedChange === c.id ? '✓' : '○'}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'Compare') {
    const comparisonRows = [
      { label: 'UX Score', before: '68', after: '91', change: '+23' },
      { label: 'Accessibility', before: '60', after: '96', change: '+36' },
      { label: 'Critical Issues', before: '12', after: '2', change: '-10' },
      { label: 'Performance', before: '74', after: '90', change: '+16' },
    ];

    const issueChanges = [
      { title: 'Low contrast checkout button', status: 'Fixed' },
      { title: 'Keyboard navigation gap', status: 'Fixed' },
      { title: 'Missing form feedback', status: 'New' },
      { title: 'Small tap targets', status: 'Remaining' },
    ];

    return (
      <div className="main-content">
        <div className="compare-view">
          <div className="dashboard-header">
            <div>
              <p className="eyebrow">Compare</p>
              <h2>Audit report comparison</h2>
            </div>
            <button className="refresh-btn">Export report</button>
          </div>

          <div className="compare-grid">
            <div className="compare-card">
              <div className="card-title-row">
                <h3>Audit from June 20</h3>
                <span className="pill">Before</span>
              </div>
              <div className="report-box">
                <h4>UX Score</h4>
                <p>68/100</p>
              </div>
              <div className="report-box">
                <h4>Accessibility</h4>
                <p>60/100</p>
              </div>
              <div className="report-box">
                <h4>Critical Issues</h4>
                <p>12</p>
              </div>
            </div>

            <div className="compare-card">
              <div className="card-title-row">
                <h3>Audit from June 27</h3>
                <span className="pill">After</span>
              </div>
              <div className="report-box">
                <h4>UX Score</h4>
                <p>91/100</p>
              </div>
              <div className="report-box">
                <h4>Accessibility</h4>
                <p>96/100</p>
              </div>
              <div className="report-box">
                <h4>Critical Issues</h4>
                <p>2</p>
              </div>
            </div>
          </div>

          <div className="metric-table-card">
            <div className="card-title-row">
              <h3>Metric changes</h3>
              <span className="pill">Before → After</span>
            </div>
            <table className="issue-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Before</th>
                  <th>After</th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td>{row.before}</td>
                    <td>{row.after}</td>
                    <td className="change-cell">{row.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="issue-change-card">
            <div className="card-title-row">
              <h3>Issue movement</h3>
              <span className="pill">Fixed / New / Remaining</span>
            </div>
            <div className="issue-change-list">
              {issueChanges.map((item) => (
                <div key={item.title} className="change-item">
                  <span>{item.title}</span>
                  <span className={`change-badge ${item.status.toLowerCase()}`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'Personas') {
    const personas = [
      {
        name: 'Student',
        description: 'Looks for course information quickly.',
        score: '84/100',
        painPoints: ['Dense content makes scanning slower.', 'Important actions are not prominent enough.'],
        suggestions: ['Add stronger hierarchy and short summaries.', 'Make call-to-action labels more specific.'],
      },
      {
        name: 'Senior Citizen',
        description: 'Needs larger fonts and simpler navigation.',
        score: '72/100',
        painPoints: ['Font sizing is too small on key sections.', 'Navigation requires too much interpretation.'],
        suggestions: ['Increase typography scale and spacing.', 'Simplify menus and reduce cognitive load.'],
      },
      {
        name: 'Color Blind User',
        description: 'Checks color contrast and visual cues.',
        score: '69/100',
        painPoints: ['Status cues rely heavily on color.', 'Low contrast affects visible feedback.'],
        suggestions: ['Use icons and labels alongside color.', 'Increase contrast for text and buttons.'],
      },
      {
        name: 'Keyboard-only User',
        description: 'Verifies keyboard navigation.',
        score: '61/100',
        painPoints: ['Focus order is inconsistent.', 'Some controls are hard to reach without a mouse.'],
        suggestions: ['Add visible focus states and tab order fixes.', 'Test every interaction with only the keyboard.'],
      },
      {
        name: 'Mobile User',
        description: 'Tests responsiveness and touch targets.',
        score: '78/100',
        painPoints: ['Tap targets are too small.', 'Some content feels cramped on smaller screens.'],
        suggestions: ['Increase minimum touch target size to 44px.', 'Improve stacked layouts on mobile.'],
      },
    ];

    return (
      <div className="main-content">
        <div className="personas-view">
          <div className="dashboard-header">
            <div>
              <p className="eyebrow">Personas</p>
              <h2>Persona-driven UX audits</h2>
            </div>
            <button className="refresh-btn">Run all personas</button>
          </div>

          <div className="persona-grid">
            {personas.map((persona) => (
              <div key={persona.name} className="persona-card">
                <div className="card-title-row">
                  <h3>{persona.name}</h3>
                  <span className="pill">{persona.score}</span>
                </div>
                <p className="persona-description">{persona.description}</p>
                <div className="persona-section">
                  <h4>Pain points</h4>
                  <ul>
                    {persona.painPoints.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div className="persona-section">
                  <h4>Suggestions</h4>
                  <ul>
                    {persona.suggestions.map((suggestion) => (
                      <li key={suggestion}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'AI Chat') {
    const starterQuestions = [
      'Why is this issue critical?',
      'How do I fix this?',
      'Generate React code.',
      'Which issue should I fix first?',
      'Explain WCAG 2.1 for this problem.',
    ];

    return (
      <div className="main-content">
        <div className="chat-view">
          <div className="dashboard-header">
            <div>
              <p className="eyebrow">AI Chat</p>
              <h2>Conversational assistant</h2>
            </div>
            <button className="refresh-btn">Use completed audit</button>
          </div>

          <div className="chat-panel">
            <div className="chat-bubble ai-bubble">
              <strong>AI Assistant</strong>
              <p>I can answer questions using the completed audit results instead of starting a new analysis.</p>
            </div>

            <div className="starter-questions">
              {starterQuestions.map((question) => (
                <button key={question} className="starter-chip">
                  {question}
                </button>
              ))}
            </div>

            <div className="chat-input-area">
              <input className="chat-input" placeholder="Ask about this audit..." />
              <button className="refresh-btn">Send</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'History') {
    const historyItems = [
      { website: 'amazon.com', date: 'Today', score: '91', label: 'Completed' },
      { website: 'myntra.com', date: 'Yesterday', score: '84', label: 'Completed' },
      { website: 'portfolio.com', date: '20 Jun', score: '72', label: 'Completed' },
    ];

    return (
      <div className="main-content">
        <div className="history-view">
          <div className="dashboard-header">
            <div>
              <p className="eyebrow">History</p>
              <h2>Previous audits</h2>
            </div>
            <button className="refresh-btn">Export all</button>
          </div>

          <div className="history-controls">
            <input className="history-search" placeholder="Search audits" />
            <select className="history-filter">
              <option>All dates</option>
              <option>Today</option>
              <option>Yesterday</option>
              <option>Last 7 days</option>
            </select>
          </div>

          <div className="history-list">
            {historyItems.map((item) => (
              <div key={item.website} className="history-card">
                <div>
                  <h3>{item.website}</h3>
                  <p>{item.date}</p>
                </div>
                <div className="history-score">{item.score}/100</div>
                <div className="history-actions">
                  <button className="refresh-btn">Re-run</button>
                  <button className="refresh-btn">Export PDF</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!issue) {
    return <div className="main-content empty-state">Select an issue to inspect it.</div>;
  }

  return (
    <div className="main-content">
      <div className="audit-dashboard">
        <div className="dashboard-header">
          <div>
            <p className="eyebrow">Audit</p>
            <h2>Conversational UX Audit</h2>
          </div>
          <button className="refresh-btn">Run again</button>
        </div>

       <>
  <div className="score-grid">

  <div className="score-card">
    <span className="score-label">Overall UX Score</span>
    <div className="score-value">
      {auditResult?.score?.overall_score ?? 0}
    </div>
    <p>Overall user experience score.</p>
  </div>

  <div className="score-card">
    <span className="score-label">Accessibility</span>
    <div className="score-value">
      {auditResult?.score?.accessibility ?? 76}/100
    </div>
    <p>Accessibility evaluation.</p>
  </div>

  <div className="score-card">
    <span className="score-label">Navigation</span>
    <div className="score-value">
      {auditResult?.score?.navigation ?? 88}/100
    </div>
    <p>Navigation quality.</p>
  </div>

  <div className="score-card">
    <span className="score-label">Recommendations</span>
    <div className="score-value">
      {auditResult?.recommendations?.length ?? 0}
    </div>
    <p>AI recommendations generated.</p>
  </div>

</div>

 
</>

        <div className="audit-grid">
          <div className="issue-table-card">
            <div className="card-title-row">
              <h3>Detected issues</h3>
              <span className="pill">{issues.length} items</span>
            </div>
            <table className="issue-table">
              <thead>
                <tr>
                  <th>Severity</th>
                  <th>Issue</th>
                  <th>Page</th>
                  <th>Fix</th>
                </tr>
              </thead>
             <tbody>
  {(auditResult?.recommendations || []).map((item, index) => (
    <tr key={index}>
      <td>
        <span className={`severity-pill ${item.severity.toLowerCase()}`}>
          {item.severity}
        </span>
      </td>

      <td>{typeof item.issue === "object" ? item.issue.description : item.issue}</td>

      <td>{item.category}</td>

      <td>{item.recommendation}</td>
    </tr>
  ))}
</tbody>
            </table>
          </div>

          <div className="detail-card">

  <div className="detail-header">
    <div>
      <p className="eyebrow">AI Recommendation</p>

      <h3>{selected ? (typeof selected.issue === "object" ? selected.issue.description : selected.issue) : issue.title}</h3>

    </div>

    <span
      className={`severity-pill ${(selected?.severity || issue.severity).toLowerCase()}`}
    >
      {selected?.severity || issue.severity}
    </span>
  </div>


  <div className="detail-section">
    <h4>Category</h4>

    <p>
      {selected?.category || "Accessibility"}
    </p>
  </div>


  <div className="detail-section">
    <h4>Issue Found</h4>

    <p>
      {selected ? (typeof selected.issue === "object" ? selected.issue.description : selected.issue) : issue.description}
    </p>
  </div>


  <div className="detail-section">
    <h4>AI Recommendation</h4>

    <p>
      {selected?.recommendation || issue.aiExplanation}
    </p>
  </div>

</div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
