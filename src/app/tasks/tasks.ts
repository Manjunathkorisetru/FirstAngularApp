import {
  Component,
  Input,
  EventEmitter,
  Output,
} from "@angular/core";
import { Task } from "./task/task";
import { NewTasks } from "./new-tasks/new-tasks";
import { TaskData } from "./task/task.model";

@Component({
  selector: "app-tasks",
  imports: [Task, NewTasks],
  templateUrl: "./tasks.html",
  styleUrl: "./tasks.css",
})
export class Tasks {
  @Input({ required: true }) name?: string;
  @Input({ required: true }) userId!: string;

  isAddingTask = false;

  tasks = [
    {
      id: "t1",
      userId: "u1",
      title: "Master Angular",
      summary:
        "Learn all the basic and advanced features of Angular & how to apply them.",
      dueDate: "2025-12-31",
    },
    {
      id: "t2",
      userId: "u3",
      title: "Build first prototype",
      summary:
        "Build a first prototype of the online shop website",
      dueDate: "2024-05-31",
    },
    {
      id: "t3",
      userId: "u3",
      title: "Prepare issue template",
      summary:
        "Prepare and describe an issue template which will help with project management",
      dueDate: "2024-06-15",
    },
  ];

  constructor() {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }

  get selectedUserTasks() {
    return this.tasks.filter(
      (task) => task.userId === this.userId
    );
  }

  onCompleteTask(taskId: string) {
    this.tasks = this.tasks.filter(
      (task) => task.id !== taskId
    );
    this.onSaveTasks();
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }
  onCancelAddTask() {
    this.isAddingTask = false;
  }

  onNewTask(newTask: TaskData) {
    this.tasks.push(newTask);
    this.onSaveTasks();
    this.isAddingTask = false;
  }

  onSaveTasks() {
    localStorage.setItem(
      "tasks",
      JSON.stringify(this.tasks)
    );
    console.log("Tasks saved to local storage.");
  }
}
