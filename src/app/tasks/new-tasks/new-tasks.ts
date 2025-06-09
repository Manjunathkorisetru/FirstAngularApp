import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskData } from '../task/task.model';

@Component({
  selector: 'app-new-tasks',
  imports: [FormsModule],
  templateUrl: './new-tasks.html',
  styleUrl: './new-tasks.css',
})
export class NewTasks {
  @Input({ required: true }) userId!: string;
  @Output() add = new EventEmitter<TaskData>();
  @Output() cancel = new EventEmitter<void>();
  enteredTitle = '';
  enteredSummary = '';
  enteredDueDate = '';

  handleCancelNewTask() {
    this.cancel.emit();
  }

  resetForm() {
    this.enteredTitle = '';
    this.enteredSummary = '';
    this.enteredDueDate = '';
  }

  onSubmit() {
    const newTask = {
      userId: this.userId,
      id: Math.random().toString(36).substring(2, 15), // Simple ID generation
      title: this.enteredTitle,
      summary: this.enteredSummary,
      dueDate: this.enteredDueDate,
    };
    this.add.emit(newTask);
    this.resetForm();
  }
}
