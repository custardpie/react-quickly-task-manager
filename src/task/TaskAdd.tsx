import Button from "./Button";

function TaskAdd() {
  return (
      <li className="card">
        <header className="card-header card-header-new">
          <form className="card-title-form">
            <input
              className="card-title card-title-input"
              placeholder="Add new task"
              name="title"
            />
            <Button action="Add task" icon="plus" />
          </form>
        </header>
      </li>
  )
}

export default TaskAdd;