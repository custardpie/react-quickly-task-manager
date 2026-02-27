import './style.css'
import { TaskList } from './task'
import TaskProvider from './task/TaskProvider'

function App() {
  return (
    <main>
      <h1>Task Manager</h1>
      <TaskProvider>
        <TaskList />
      </TaskProvider>
    </main>
  )
}

export default App
