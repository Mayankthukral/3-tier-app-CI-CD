// import './setupProxy';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

function MyApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    // Fetch tasks from the backend when the component mounts
    axios.get('/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddTask = () => {
    // Check if both title and description are empty
    if (!newTask.title.trim() && !newTask.description.trim()) {
      alert('Add both Task title and Task description.');
      return;
    }
  
    // Check if title is empty
    if (!newTask.title.trim()) {
      alert('Task Title is empty. Please add a title of task.');
      return;
    }
  
    // Check if description is empty
    if (!newTask.description.trim()) {
      alert('Task Description is empty. Please add a description of task.');
      return;
    }
  
    axios.post('/api/tasks', newTask)
      .then(response => {
        setTasks(prevTasks => [...prevTasks, response.data]);
        setNewTask({ title: '', description: '' });
      })
      .catch(error => console.error('Error adding task:', error));
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  };

  const handleSaveEdit = (task) => {
    axios.put(`/api/tasks/${task._id}`, {
      title: editedTitle,
      description: editedDescription,
    })
      .then(response => {
        setTasks(prevTasks =>
          prevTasks.map(t => (t._id === task._id ? response.data : t))
        );
        setEditingTask(null);
        setEditedTitle('');
        setEditedDescription('');
      })
      .catch(error => console.error('Error saving edited task:', error));
  };

  const handleDeleteTask = (taskId) => {
    axios.delete(`/api/tasks/${taskId}`)
      .then(response => {
        setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  console.log('Hello from frontend!');

  return (
    <div className="container">
      <div className="app-container">
        <h1>Task Manager</h1>
        <div className="add-task-container">
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            placeholder="Task title"
            className="input-field"
          />
          <input
            type="text"
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            placeholder="Task description"
            className="input-field"
          />
          <button onClick={handleAddTask} className="add-button">
            Add Task
          </button>
        </div>
      </div>
      <div className="task-container">
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task._id} className="task-item">
              <div>
                {editingTask && editingTask._id === task._id ? (
                  <>
                    <input
                      type="text"
                      name="editedTitle"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      placeholder="Edited Task title"
                      className="input-field"
                    />
                    <input
                      type="text"
                      name="editedDescription"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      placeholder="Edited Task description"
                      className="input-field"
                    />
                  </>
                ) : (
                  <>
                    <strong>{task.title}</strong>
                    <p>{task.description}</p>
                  </>
                )}
              </div>
              <div className="task-buttons">
                {editingTask && editingTask._id === task._id ? (
                  <button className="save-button" onClick={() => handleSaveEdit(task)}>
                    Save
                  </button>
                ) : (
                  <button className="edit-button" onClick={() => handleEditClick(task)}>
                    Edit
                  </button>
                )}
                <button className="delete-button" onClick={() => handleDeleteTask(task._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MyApp;
