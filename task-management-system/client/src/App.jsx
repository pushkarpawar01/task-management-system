import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from './context/AuthContext';
import { Plus, Trash2, CheckCircle, Circle, Clock, LogOut, Edit2, Check, X } from 'lucide-react';
import './App.css';

function App() {
  const { user, token, loading: authLoading, login, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasksLoading, setTasksLoading] = useState(false);
  
  // Auth state
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const fetchTasks = async () => {
    setTasksLoading(true);
    try {
      const response = await axios.get('/api/tasks');
      setTasks(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      if (err.response?.status === 401) logout();
    } finally {
      setTasksLoading(false);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    const endpoint = isLogin ? 'login' : 'register';
    try {
      const response = await axios.post(`/api/auth/${endpoint}`, { email, password });
      const { token, user } = response.data;
      login(token, user);
    } catch (err) {
      setAuthError(err.response?.data?.message || 'Authentication failed');
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const response = await axios.post('/api/tasks', { title, description });
      setTasks([response.data, ...tasks]);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const response = await axios.put(`/api/tasks/${id}`, { completed: !completed });
      setTasks(tasks.map(t => t._id === id ? response.data : t));
    } catch (err) {
      console.error('Error toggling task:', err);
    }
  };

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async (id) => {
    try {
      const response = await axios.put(`/api/tasks/${id}`, { title: editTitle, description: editDescription });
      setTasks(tasks.map(t => t._id === id ? response.data : t));
      setEditingId(null);
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  if (authLoading) {
    return (
      <div className="container auth-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="container auth-container">
        <div className="glass auth-card">
          <h1>{isLogin ? 'Login' : 'Register'}</h1>
          <form onSubmit={handleAuth}>
            <div className="input-group">
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {authError && <p className="error-msg">{authError}</p>}
            <button type="submit" className="add-btn">
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>
          <p className="toggle-auth">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <header>
        <h1>Task Manager</h1>
        <div className="user-info">
          <span>{user?.email}</span>
          <button onClick={logout} className="logout-btn">
            <LogOut size={18} />
          </button>
        </div>
      </header>
      
      <form onSubmit={addTask} className="glass add-form">
        <div className="input-group">
          <input 
            type="text" 
            placeholder="What needs to be done?" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <textarea 
            placeholder="Add a description (optional)" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="add-btn">
          <Plus size={20} />
          <span>Add Task</span>
        </button>
      </form>

      <div className="task-list">
        {tasksLoading ? (
          <div className="loading">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="empty-state glass">
            <Clock size={48} />
            <p>No tasks yet. Start by adding one!</p>
          </div>
        ) : (
          tasks.map(task => (
            <div key={task._id} className={`task-item glass ${task.completed ? 'completed' : ''} ${editingId === task._id ? 'editing' : ''}`}>
              {editingId === task._id ? (
                <div className="edit-mode">
                  <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                  <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                  <div className="edit-actions">
                    <button onClick={() => saveEdit(task._id)} className="save-btn"><Check size={18}/></button>
                    <button onClick={cancelEdit} className="cancel-btn"><X size={18}/></button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="task-content">
                    <button 
                      className="check-btn" 
                      onClick={() => toggleComplete(task._id, task.completed)}
                    >
                      {task.completed ? <CheckCircle className="checked" /> : <Circle />}
                    </button>
                    <div className="task-info">
                      <h3>{task.title}</h3>
                      {task.description && <p>{task.description}</p>}
                    </div>
                  </div>
                  <div className="task-actions">
                    <button className="edit-btn" onClick={() => startEdit(task)}>
                      <Edit2 size={18} />
                    </button>
                    <button className="delete-btn" onClick={() => deleteTask(task._id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
