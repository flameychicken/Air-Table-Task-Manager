// src/components/TaskModal.js
import React from 'react';
import TaskForm from './TaskForm';

function TaskModal({ isOpen, onCloseModal, onAddTask }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onCloseModal}>
          ✕
        </button>
        <TaskForm onAdd={onAddTask} onAfterSubmit={onCloseModal} />
      </div>
    </div>
  );
}

export default TaskModal;
