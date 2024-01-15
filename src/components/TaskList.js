import TaskShow from './TaskShow';
import { useTaskContext } from '../context/TaskContext';

function TaskList() {
  const { tasks, deleteTaskById, editTaskById } = useTaskContext();

  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <TaskShow key={index} task={task} onDelete={deleteTaskById} onUpdate={editTaskById} />
      ))}
    </div>
  );
}

export default TaskList;