
type TaskHeaderProps = {
  name : string
}

function TaskHeader({name} : Readonly<TaskHeaderProps>) {
  return (
    <header className="card-header">
      <p className="card-title">{name}</p>
    </header>
  )
}

export default TaskHeader;