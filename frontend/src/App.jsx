import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

function App() {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [activeView, setActiveView] = useState('Audit');
  const [url, setUrl] = useState('stripe.com/pricing');
  const [issues] = useState([
    {
      id: 1,
      title: 'Checkout button hidden by low contrast',
      severity: 'Critical',
      wcag: 'WCAG 1.4.3',
      heuristic: 'button.cta-primary',
      page: 'Checkout',
      fixSummary: 'Increase contrast and visibility',
      description: 'The primary checkout button uses a light green text on a blue background, making it nearly invisible in the current design.',
      why: 'This blocks users from completing purchases and creates a major friction point in the checkout flow.',
      wcagRule: 'WCAG 1.4.3 Contrast (Minimum)',
      aiExplanation: 'The button lacks enough contrast and visual prominence, so users with low vision may miss it entirely.',
      fixCode: `.checkout-btn {
  background: #636CF1;
  color: #FFFFFF;
  padding: 14px 24px;
  border-radius: 8px;
}`,
    },
    {
      id: 2,
      title: 'Form validation feedback is unclear',
      severity: 'High',
      wcag: 'WCAG 3.3.1',
      heuristic: 'form#signup',
      page: 'Sign up',
      fixSummary: 'Add visible error states',
      description: 'Error messages appear without a strong visual cue, making it hard to understand what needs correction.',
      why: 'Users may resubmit a form repeatedly without knowing what is wrong.',
      wcagRule: 'WCAG 3.3.1 Error Identification',
      aiExplanation: 'The form should highlight invalid fields and provide clear, user-friendly guidance.',
      fixCode: `.error-message {
  color: #D64545;
  font-weight: 600;
  margin-top: 6px;
}`,
    },
    {
      id: 3,
      title: 'Hero image lacks alt text',
      severity: 'High',
      wcag: 'WCAG 1.1.1',
      heuristic: 'img.hero-graphic',
      page: 'Home',
      fixSummary: 'Add meaningful image descriptions',
      description: 'The main hero image does not include descriptive alternative text for assistive technologies.',
      why: 'Screen reader users miss the information conveyed visually by the image.',
      wcagRule: 'WCAG 1.1.1 Non-text Content',
      aiExplanation: 'A concise alt text should describe the purpose of the hero image rather than repeating the surrounding copy.',
      fixCode: `<img src="hero.png" alt="Product team reviewing analytics dashboard" />`,
    },
    {
      id: 4,
      title: 'Navigation is not keyboard friendly',
      severity: 'Critical',
      wcag: 'Heuristic #3',
      heuristic: 'nav.main-nav',
      page: 'Navigation',
      fixSummary: 'Support logical keyboard navigation',
      description: 'Keyboard focus is difficult to track and the menu items do not behave consistently when tabbed through.',
      why: 'Users who rely on keyboards cannot navigate efficiently or confidently.',
      wcagRule: 'WCAG 2.1.1 Keyboard',
      aiExplanation: 'The nav should expose clear focus indicators and support standard Tab and Enter interactions.',
      fixCode: `.nav-link:focus {
  outline: 3px solid #636CF1;
  outline-offset: 2px;
}`,
    },
    {
      id: 5,
      title: 'No loading feedback after submit',
      severity: 'Medium',
      wcag: 'Heuristic #1',
      heuristic: 'form#contact',
      page: 'Contact',
      fixSummary: 'Show loading and success states',
      description: 'Submitting the contact form does not provide any visible feedback while the request is in progress.',
      why: 'Users may think the action failed or that the form is broken.',
      wcagRule: 'WCAG 3.2.2 On Input',
      aiExplanation: 'A loading spinner and success message will make the interaction feel reliable and responsive.',
      fixCode: `.submit-btn.loading {
  opacity: 0.7;
  cursor: wait;
}`,
    },
    {
      id: 6,
      title: 'CTA label is too vague',
      severity: 'Medium',
      wcag: 'Heuristic #6',
      heuristic: 'button#hero-cta',
      page: 'Landing',
      fixSummary: 'Use clearer action text',
      description: 'The hero CTA reads “Click here”, which does not explain the action or expected outcome.',
      why: 'Vague labels increase ambiguity and make the page less scannable.',
      wcagRule: 'WCAG 2.4.6 Headings and Labels',
      aiExplanation: 'A more specific label such as “Start free trial” gives users immediate context.',
      fixCode: `button.textContent = 'Start free trial';`,
    },
    {
      id: 7,
      title: 'Tap targets are too small',
      severity: 'Medium',
      wcag: 'WCAG 2.5.5',
      heuristic: 'nav-link',
      page: 'Mobile',
      fixSummary: 'Increase touch target size',
      description: 'Several navigation links are only about 28px tall, which is below the recommended mobile tap target size.',
      why: 'Smaller targets are harder to use on touch devices and increase accidental taps.',
      wcagRule: 'WCAG 2.5.5 Target Size',
      aiExplanation: 'Making the targets at least 44x44 px allows thumbs and assistive inputs to interact more comfortably.',
      fixCode: `.nav-link {
  min-height: 44px;
  min-width: 44px;
}`,
    },
    {
      id: 8,
      title: 'Buttons use inconsistent styles',
      severity: 'Low',
      wcag: 'Heuristic #4',
      heuristic: '.btn-secondary',
      page: 'Pricing',
      fixSummary: 'Create a consistent action pattern',
      description: 'Secondary actions use different styling than the primary action, which makes hierarchy harder to understand.',
      why: 'Users may not know which action is primary or most important.',
      wcagRule: 'Heuristic #4 Consistency and Standards',
      aiExplanation: 'A consistent button system will improve clarity and reduce user confusion.',
      fixCode: `.btn-secondary {
  border-radius: 8px;
  font-weight: 600;
}`,
    },
    {
      id: 9,
      title: 'Paragraph spacing is too dense',
      severity: 'Low',
      wcag: 'Heuristic #8',
      heuristic: 'p.feature-body',
      page: 'Pricing',
      fixSummary: 'Improve readability with spacing',
      description: 'Body copy is tightly packed, which makes longer content harder to read and scan.',
      why: 'Dense text reduces comprehension and increases drop-off in content-heavy sections.',
      wcagRule: 'Heuristic #8 Aesthetic and Minimalist Design',
      aiExplanation: 'Increasing line-height and section spacing will make the content feel calmer and easier to scan.',
      fixCode: `.feature-body {
  line-height: 1.7;
  margin-bottom: 16px;
}`,
    },
  ]);

  const issueCounts = {
    Critical: issues.filter((issue) => issue.severity === 'Critical').length,
    High: issues.filter((issue) => issue.severity === 'High').length,
    Medium: issues.filter((issue) => issue.severity === 'Medium').length,
    Low: issues.filter((issue) => issue.severity === 'Low').length,
  };

  const handleRunAudit = () => {
    console.log('Running audit for:', url);
  };

  return (
    <div className="app">
      <Sidebar
        url={url}
        setUrl={setUrl}
        onRunAudit={handleRunAudit}
        issues={issues}
        issueCounts={issueCounts}
        selectedIssue={selectedIssue}
        onSelectIssue={setSelectedIssue}
        activeTab={activeView}
        onTabChange={setActiveView}
      />
      <MainContent
        issues={issues}
        issue={selectedIssue || issues[0]}
        onSelectIssue={setSelectedIssue}
        activeView={activeView}
      />
    </div>
  );
}

export default App;
