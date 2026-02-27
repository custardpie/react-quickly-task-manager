http://github.com/rq2e/rq2e/tree/main/ch13/rq13-list

The goal for this step is to complete the following:

Add an ordered list of “completable” steps inside each task.

At the bottom of the list, always include an input field to allow the user to add a new item to the end of the list.

For each step in the list, add a checkbox to mark the step as completed or not, as well as a button to delete the step.

Allow the user to hide and show the steps of a task (hidden by default).

Summarize the completion of the task with a progress bar that shows the ratio of the steps in the task that have been completed. This progress bar should be visible even if the list of steps is hidden.

Here are a few hints to help you complete this objective:

While we could get away with keeping the state as a simple array maintained by a useState hook, we need more fine-grained control of the state now, so convert the state to a reducer, and add actions for the different updates necessary, for example: addTask, editTask, deleteTask, addStep, editStep, and deleteStep.

You might also want to wrap the task list in a context provider to make access to the preceding actions easier inside nested components.

To add a progress bar, use the <progress /> HTML element. It’s simple to use and already styled in the existing CSS file in the scaffold.

To display a list of steps with a checkbox, use the proper semantic HTML elements for all of those things (<ol />, <li />, <label />, and <input type="checkbox" /> would be a good start).

Adding a new step requires a form with an input and a button. That should be pretty straightforward at this point.
https://github.com/rq2e/rq2e/tree/main/ch13/rq13-steps