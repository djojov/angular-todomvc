import { Component, computed, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';
import { TodoComponent } from '../todo/todo.component';

@Component({
  standalone: true,
  selector: 'app-todos-main',
  template: `
    <section class="main">
      <ul class="todo-list">
        @for (todo of visibleTodos(); track todo.id) {
        <app-todos-todo [todo]="todo" />
        }
      </ul>
    </section>
  `,
  styleUrl: './main.component.css',
  imports: [TodoComponent],
})
export class MainComponent {
  todoService = inject(TodosService);

  visibleTodos = computed(() => {
    const todos = this.todoService.todosSignal();
    const filter = this.todoService.filterSignal();

    if (filter === FilterEnum.active) {
      return todos.filter((todo) => !todo.isCompleted);
    }
    if (filter === FilterEnum.completed) {
      return todos.filter((todo) => todo.isCompleted);
    }

    return todos;
  });
}
