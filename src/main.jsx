import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

window.onerror = function(msg, url, line, col, err) {
  document.body.innerHTML += '<div style="background:red;color:white;padding:20px;position:fixed;top:0;left:0;z-index:99999;">JS CRASH: ' + msg + '<br/>' + (err?.stack || '') + '</div>';
};
window.onunhandledrejection = function(e) {
  document.body.innerHTML += '<div style="background:orange;color:black;padding:20px;position:fixed;top:0;left:0;z-index:99999;">PROMISE REJECTION: ' + (e.reason?.stack || e.reason || 'Unknown') + '</div>';
};

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', color: '#ff4444', fontFamily: 'monospace', background: '#111', minHeight: '100vh' }}>
          <h2>React Crash Data:</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error?.stack || this.state.error?.message || "Unknown error"}</pre>
        </div>
      );
    }
    return this.props.children; 
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
