// src/components/HeaderBar.js
import React from 'react';

function HeaderBar({ onOpenModal }) {
  return (
    <header className="header-bar">
      <div className="header-bar-left">
        <h1 className="app-title">Airtable Task Manager</h1>
      </div>
      <div className="header-bar-right">
        <button className="create-task-btn" onClick={onOpenModal}>
          + Create New Task
        </button>
      </div>
    </header>
  );
}

export default HeaderBar;
