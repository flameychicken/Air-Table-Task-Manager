import React from 'react';

function TaskControls({ sortCriteria, setSortCriteria, filterText, setFilterText }) {
  return (
    <div className="task-controls">
      <div>
        <label>
          Sort By:{" "}
          <select
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="duedate-asc">Due Date (Earliest)</option>
            <option value="duedate-desc">Due Date (Latest)</option>
            <option value="priority-asc">Priority (High to Low)</option>
            <option value="priority-desc">Priority (Low to High)</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Search:{" "}
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Search by Task Name..."
          />
        </label>
      </div>
    </div>
  );
}

export default TaskControls;
