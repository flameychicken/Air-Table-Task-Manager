const API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
const TABLE_NAME = process.env.REACT_APP_AIRTABLE_TABLE_NAME;
const baseURL = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`;

const headers = {
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json'
};

/**
 * Fetches all task records from Airtable.
 * @returns {Promise<Array>} An array of task records.
 */
export async function fetchTasks() {
  try {
    const response = await fetch(baseURL, { headers });
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Fetch tasks error:", response.status, errorText);
      throw new Error(`Error fetching tasks: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Fetched tasks:", data.records);
    return data.records || [];
  } catch (error) {
    console.error("Error in fetchTasks:", error);
    return [];
  }
}

/**
 * Creates a new task record in Airtable.
 * @param {Object} taskData - Contains:
 *   - taskName: string
 *   - description: string
 *   - dueDate: string (ISO date)
 *   - priority: string ("Low", "Medium", "High")
 *   - status: string ("Not Started", "In Progress", "Completed")
 * @returns {Promise<Object|null>} The created task record.
 */
export async function createTask(taskData) {
  const data = {
    records: [
      {
        fields: {
          "Task Name": taskData.taskName,
          "Description": taskData.description,
          "Due Date": taskData.dueDate,
          "Priority": taskData.priority,
          "Status": taskData.status
        }
      }
    ]
  };

  try {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const errData = await response.json();
      console.error("Create task error response:", errData);
      throw new Error(`Error creating task: ${errData.error.message}`);
    }
    const result = await response.json();
    console.log("Created task:", result.records[0]);
    return result.records[0];
  } catch (error) {
    console.error("Error in createTask:", error);
    return null;
  }
}

/**
 * Removes (deletes) a task record from Airtable.
 * @param {string} taskId - The record ID of the task to delete.
 * @returns {Promise<string|null>} Returns the deleted task ID if successful.
 */
export async function removeTask(taskId) {
  try {
    const response = await fetch(`${baseURL}/${taskId}`, {
      method: 'DELETE',
      headers
    });
    if (!response.ok) {
      const errText = await response.text();
      console.error("Delete task error:", response.status, errText);
      throw new Error(`Error deleting task: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Deleted task:", data);
    return data.deleted ? taskId : null;
  } catch (error) {
    console.error("Error in removeTask:", error);
    return null;
  }
}
