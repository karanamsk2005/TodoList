import { useState } from 'react';

// Custom Icon Components
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
);

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Design a website', completed: false },
    { id: 2, text: 'Develop the website', completed: false },
    { id: 3, text: 'Publish the website', completed: false }
  ]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      setTasks(tasks.map(task => 
        task.id === editingId ? { ...task, text: editText } : task
      ));
      setEditingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-green-900 rounded-xl p-6 shadow-xl">
        <h1 className="text-3xl font-semibold text-amber-100 mb-6">Create your Todo-List</h1>
        
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="What are your tasks for today?"
            className="flex-1 bg-transparent border border-green-700 rounded-lg px-4 py-2 text-amber-100 placeholder-green-500 focus:outline-none focus:border-amber-400"
          />
          <button
            onClick={addTask}
            className="bg-green-800 text-amber-100 px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Add
          </button>
        </div>

        <div className="space-y-3">
          {tasks.map(task => (
            <div
              key={task.id}
              className="flex items-center justify-between bg-green-800 bg-opacity-50 rounded-lg p-4 border border-amber-900"
            >
              {editingId === task.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                  onBlur={saveEdit}
                  className="flex-1 bg-transparent border-none text-amber-100 focus:outline-none"
                  autoFocus
                />
              ) : (
                <span className={`flex-1 text-amber-100 ${task.completed ? 'line-through opacity-50' : ''}`}>
                  {task.text}
                </span>
              )}
              
              <div className="flex gap-3">
                <button
                  onClick={() => editingId === task.id ? saveEdit() : startEdit(task)}
                  className="text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => toggleComplete(task.id)}
                  className="text-orange-400 hover:text-orange-300 transition-colors"
                >
                  <CheckIcon />
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;