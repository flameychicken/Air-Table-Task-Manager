import React from 'react';

function TaskList({ tasks, onRemove }) {
  if (tasks.length === 0) {
    return <p>No tasks available.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task, index) => {
        const fields = task.fields;
        const isNew = index === tasks.length - 1;
        return (
          <div key={task.id} className={`task-card ${isNew ? 'new-task' : ''}`}>
            <h3>{fields["Task Name"] || '-'}</h3>
            <p>{fields["Description"] || '-'}</p>
            <p><strong>Due:</strong> {fields["Due Date"] || '-'}</p>
            <p><strong>Priority:</strong> {fields["Priority"] || '-'}</p>
            <p><strong>Status:</strong> {fields["Status"] || '-'}</p>
            <button className="delete-button" onClick={() => onRemove(task.id)}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default TaskList;
