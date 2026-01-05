import { useEffect, useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import { Task } from '../types';
import { Plus, CheckCircle2, Circle } from 'lucide-react';

export const TasksPage = () => {
  const { tasks, isLoading, fetchTasks, updateTaskStatus, deleteTask } = useTaskStore();
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleToggleStatus = async (task: Task) => {
    const newStatus = task.status === 'completed' ? 'todo' : 'completed';
    await updateTaskStatus(task.id, newStatus);
  };

  const priorityColors = {
    low: 'text-gray-500',
    medium: 'text-blue-500',
    high: 'text-orange-500',
    urgent: 'text-red-500',
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Caricamento...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">I Miei Task</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
        >
          <Plus className="w-5 h-5" />
          Nuovo Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nessun task trovato</p>
          <p className="text-gray-400 text-sm mt-2">Crea il tuo primo task per iniziare!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <button
                onClick={() => handleToggleStatus(task)}
                className="flex-shrink-0"
              >
                {task.status === 'completed' ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <h3
                  className={`font-medium ${
                    task.status === 'completed'
                      ? 'line-through text-gray-400'
                      : 'text-gray-900'
                  }`}
                >
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                )}
                <div className="flex gap-3 mt-2">
                  <span className={`text-xs font-medium ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                  {task.project && (
                    <span className="text-xs text-gray-500">
                      📁 {task.project.name}
                    </span>
                  )}
                  {task.dueDate && (
                    <span className="text-xs text-gray-500">
                      📅 {new Date(task.dueDate).toLocaleDateString('it-IT')}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="flex-shrink-0 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition"
              >
                Elimina
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TODO: Create Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Crea Nuovo Task</h2>
            <p className="text-gray-600">Modal da implementare...</p>
            <button
              onClick={() => setShowCreateModal(false)}
              className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Chiudi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
