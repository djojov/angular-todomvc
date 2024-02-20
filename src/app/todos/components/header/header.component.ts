import { Component, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';

@Component({
  standalone: true,
  selector: 'app-todos-header',
  template: `
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        autofocus
        [value]="text"
        (keyup)="changeText($event)"
        (keyup.enter)="addTodo()"
      />
    </header>
  `,
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  todoService = inject(TodosService);
  text: string = '';

  changeText(event: Event) {
    const target = event.target as HTMLInputElement;

    this.text = target.value;
  }

  addTodo() {
    this.todoService.addTodo(this.text);
    this.text = '';
  }
}
