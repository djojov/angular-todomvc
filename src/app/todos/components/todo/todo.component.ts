import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
  input,
} from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { TodoInterface } from '../../types/todo.interface';

@Component({
  standalone: true,
  selector: 'app-todos-todo',
  template: `
    <li [ngClass]="{ editing: isEditing(), completed: todo().isCompleted }">
      <div class="view">
        <input
          class="toggle"
          type="checkbox"
          [checked]="todo().isCompleted"
          (change)="toggleTodo()"
        />
        <label (dblclick)="setTooInEditMode()">{{ todo().text }}</label>
        <button class="destroy" (click)="removeTodo()"></button>
      </div>
      @if (isEditing()) {
      <input
        class="edit"
        #textInput
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

  @ViewChild('textInput') textInput?: ElementRef;

  editingText = '';

  ngOnInit() {
    this.editingText = this.todo().text;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isEditing'].currentValue) {
      setTimeout(() => {
        this.textInput?.nativeElement.focus();
      }, 0);
    }
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

  removeTodo() {
    this.todoService.removeTodo(this.todo().id);
  }

  toggleTodo() {
    this.todoService.toggleTodo(this.todo().id);
  }
}
