import React from 'react';
import './index.less';

export const CodeLoading: React.FC = () => (
  <div>
    <div className="code-loading">
      <div>
        <div className="loader">
          <svg viewBox="0 0 80 80">
            <defs>
              <linearGradient
                id="gradient"
                x1=".004%"
                x2="100.131%"
                y1="49.993%"
                y2="49.993%"
              >
                <stop offset="0%" stopColor="#6500FF" />
                <stop offset="16%" stopColor="#6A09FF" />
                <stop offset="43%" stopColor="#7623FF" />
                <stop offset="77%" stopColor="#8A4CFF" />
                <stop offset="99%" stopColor="#996BFF" />
              </linearGradient>
            </defs>
            <circle id="test" cx="40" cy="40" r="32" stroke="url(#gradient)" />
          </svg>
        </div>
        <div className="loader triangle">
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72" stroke="url(#gradient)" />
          </svg>
        </div>
        <div className="loader">
          <svg viewBox="0 0 80 80">
            <rect x="8" y="8" width="64" height="64" stroke="url(#gradient)" />
          </svg>
        </div>
        <div className="loading-text">
          <p>Loading...</p>
        </div>
      </div>
    </div>
  </div>
);
