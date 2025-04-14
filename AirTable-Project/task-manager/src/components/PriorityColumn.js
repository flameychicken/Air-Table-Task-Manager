// src/components/PriorityColumn.js
import React from 'react';

function PriorityColumn({ priority, tasks, onRemove, bgColor, borderColor }) {
  // Sort tasks by due date (tasks without a due date will get a far-future date)
  const sortedTasks = tasks.sort((a, b) => {
    const dateA = a.fields["Due Date"]
      ? new Date(a.fields["Due Date"])
      : new Date(8640000000000000); // max date
    const dateB = b.fields["Due Date"]
      ? new Date(b.fields["Due Date"])
      : new Date(8640000000000000);
    return dateA - dateB;
  });

  return (
    <div className="priority-column" style={{ backgroundColor: bgColor, borderColor }}>
      <h2 className="priority-column-header" style={{ borderColor }}>
        {priority} Priority
      </h2>
      {sortedTasks.length === 0 ? (
        <p className="no-tasks-label">No tasks here.</p>
      ) : (
        sortedTasks.map((task, index) => {
          const fields = task.fields;
          const isNew = index === sortedTasks.length - 1;
          return (
            <div key={task.id} className={`task-card ${isNew ? 'new-task' : ''}`}>
              <div className="task-card-header">
                <h3>{fields["Task Name"] || 'Untitled Task'}</h3>
              </div>
              <p className="task-description">{fields["Description"] || 'No description'}</p>
              {fields["Due Date"] && (
                <p className="task-meta">
                  <strong>Due:</strong> {fields["Due Date"]}
                </p>
              )}
              {fields["Status"] && (
                <p className="task-meta">
                  <strong>Status:</strong> {fields["Status"]}
                </p>
              )}
              <button className="delete-button" onClick={() => onRemove(task.id)}>
                Delete
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default PriorityColumn;
