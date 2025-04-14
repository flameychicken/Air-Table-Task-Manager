// src/components/PriorityBoard.js
import React from 'react';
import PriorityColumn from './PriorityColumn';

function PriorityBoard({ tasks, onRemove }) {
  // Group tasks by Priority
  const priorityMap = {
    High: [],
    Medium: [],
    Low: []
  };

  tasks.forEach(task => {
    const priority = task.fields["Priority"] || "Low";
    if (priorityMap[priority]) {
      priorityMap[priority].push(task);
    } else {
      priorityMap["Low"].push(task);
    }
  });

  return (
    <div className="priority-board">
      <PriorityColumn
        priority="High"
        tasks={priorityMap.High}
        onRemove={onRemove}
        bgColor="#ffd7d5"
        borderColor="#ff6b6b"
      />
      <PriorityColumn
        priority="Medium"
        tasks={priorityMap.Medium}
        onRemove={onRemove}
        bgColor="#ffeecb"
        borderColor="#ffa94d"
      />
      <PriorityColumn
        priority="Low"
        tasks={priorityMap.Low}
        onRemove={onRemove}
        bgColor="#ddffca"
        borderColor="#51cf66"
      />
    </div>
  );
}

export default PriorityBoard;
