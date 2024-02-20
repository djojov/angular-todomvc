import { Component, input } from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';

@Component({
  standalone: true,
  selector: 'app-todos-todo',
  template: `
    <li>
      <div class="view">
        <label>{{ todo().text }}</label>
      </div>
    </li>
  `,
})
export class TodoComponent {
  todo = input.required<TodoInterface>();
}
