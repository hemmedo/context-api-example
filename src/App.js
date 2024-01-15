import './App.css';
import TaskCreate from './components/TaskCreate';
import TaskList from './components/TaskList';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <TaskProvider>
      <div className="App">
        <TaskCreate />
        <h1>Görevler</h1>
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;
