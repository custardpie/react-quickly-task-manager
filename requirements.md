http://github.com/rq2e/rq2e/tree/main/ch13/rq13-list

In this step of the project, we’ll add the actual functionality to the structure that was outlined in the scaffold. After completing this step, we want to have a simple task manager that can do the following:

Show a list of tasks

Allow the user to add a new task by writing the task title

Allow the user to delete a task

Allow the user to rename a task

We’ll do this in two steps:

Split the single big component into multiple smaller components that make sense in terms of component size, responsibility, and visual representation.

Make the application stateful, so it starts with a predefined list, and users can then append, delete, and update tasks as they see fit.