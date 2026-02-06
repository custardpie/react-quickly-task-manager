
import './style.css'
import { TaskList, TasksProvider }  from './task'

function App() {

  return (
    <main>
      <h1>Task Manager</h1>
      <TasksProvider>
        <TaskList />
      </TasksProvider>
    </main>
  )
}

export default App
