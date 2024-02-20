import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  inject,
  input,
} from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { TodoInterface } from '../../types/todo.interface';

@Component({
  standalone: true,
  selector: 'app-todos-todo',
  template: `
    <li [ngClass]="{ editing: isEditing() }">
      <div class="view">
        <label (dblclick)="setTooInEditMode()">{{ todo().text }}</label>
      </div>
      @if (isEditing()) {
      <input
        class="edit"
        [value]="editingText"
        (keyup)="changeText($event)"
        (keyup.enter)="changeTodo()"
      />
      }
    </li>
  `,
  imports: [CommonModule],
})
export class TodoComponent implements OnInit {
  todo = input.required<TodoInterface>();
  isEditing = input.required<boolean>();
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();
  todoService = inject(TodosService);

  editingText = '';

  ngOnInit() {
    this.editingText = this.todo().text;
  }

  changeText(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.editingText = value;
  }

  changeTodo() {
    this.todoService.changeTodo(this.todo().id, this.editingText);
    this.setEditingId.emit(null);
  }

  setTooInEditMode() {
    this.setEditingId.emit(this.todo().id);
  }
}
