import { useState } from 'react';
import App from './App';
import ERD from './requra_erd';
import MobileLoFi from './mobile_lofi';

export default function Entry() {
  const [view, setView] = useState('menu'); // 'menu', 'lofi', 'erd', 'mobile_lofi'

  if (view === 'lofi') {
    return (
      <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
        <button
          onClick={() => setView('menu')}
          style={{
            position: 'absolute',
            top: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10000,
            padding: '6px 16px',
            background: '#1a1a1a',
            color: '#fff',
            border: 'none',
            borderRadius: 20,
            fontSize: 12,
            fontFamily: 'monospace',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          }}
        >
          ← Back to Main Menu
        </button>
        <App />
      </div>
    );
  }

  if (view === 'erd') {
    return (
      <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
        <button
          onClick={() => setView('menu')}
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 10000,
            padding: '10px 20px',
            background: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 'bold',
            fontFamily: "'JetBrains Mono', monospace",
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
          }}
        >
          ← Back to Main Menu
        </button>
        <ERD />
      </div>
    );
  }

  if (view === 'mobile_lofi') {
    return (
      <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
        <button
          onClick={() => setView('menu')}
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 10000,
            padding: '10px 20px',
            background: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 'bold',
            fontFamily: "'JetBrains Mono', monospace",
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
          }}
        >
          ← Back to Main Menu
        </button>
        <MobileLoFi />
      </div>
    );
  }

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'monospace',
      padding: 20,
      boxSizing: 'border-box'
    }}>
      <div style={{
        marginBottom: 40,
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: 32, margin: '0 0 10px 0', letterSpacing: '0.05em' }}>REQURA.AI</h1>
        <p style={{ color: '#aaa', margin: 0, fontSize: 14 }}>Project Views & Architecture</p>
      </div>

      <div style={{
        display: 'flex',
        gap: 24,
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: 800
      }}>
        <div
          onClick={() => setView('lofi')}
          style={{
            width: 320,
            padding: 32,
            background: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: 12,
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.borderColor = '#666';
            e.currentTarget.style.background = '#222';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = '#333';
            e.currentTarget.style.background = '#1a1a1a';
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>📱</div>
          <h2 style={{ fontSize: 20, margin: '0 0 8px 0' }}>Lo-Fi Wireframes</h2>
          <p style={{ fontSize: 13, color: '#888', margin: 0, lineHeight: 1.5 }}>
            Interactive low-fidelity wireframes exploring the user journey from landing page to results dashboard.
          </p>
        </div>

        <div
          onClick={() => setView('erd')}
          style={{
            width: 320,
            padding: 32,
            background: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: 12,
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.borderColor = '#3b82f6';
            e.currentTarget.style.background = '#161d2e';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = '#333';
            e.currentTarget.style.background = '#1a1a1a';
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>🗄️</div>
          <h2 style={{ fontSize: 20, margin: '0 0 8px 0' }}>Entity Relationship</h2>
          <p style={{ fontSize: 13, color: '#888', margin: 0, lineHeight: 1.5 }}>
            Interactive PostgreSQL database schema visualization with complete relationships and column definitions.
          </p>
        </div>
        <div
          onClick={() => setView('mobile_lofi')}
          style={{
            width: 320,
            padding: 32,
            background: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: 12,
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.borderColor = '#3b82f6';
            e.currentTarget.style.background = '#161d2e';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = '#333';
            e.currentTarget.style.background = '#1a1a1a';
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>🗄️</div>
          <h2 style={{ fontSize: 20, margin: '0 0 8px 0' }}>Mobile Lo-Fi Wireframes</h2>
          <p style={{ fontSize: 13, color: '#888', margin: 0, lineHeight: 1.5 }}>
            Interactive mobile lo-fi wireframes exploring the user journey from landing page to results dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
