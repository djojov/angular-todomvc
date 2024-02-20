import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';

@Component({
  standalone: true,
  selector: 'app-todos-footer',
  template: `
    <footer class="footer" [ngClass]="{ hidden: noTodosClass() }">
      <span class="todo-count">
        <strong>{{ activeCount() }}</strong> {{ itemsLeftText() }}
      </span>
      <ul class="filters">
        <li>
          <a
            href="/"
            [ngClass]="{ selected: filterSignal() === filterEnum.all }"
            (click)="changeFilter($event, filterEnum.all)"
            >All</a
          >
        </li>
        <li>
          <a
            href="/"
            [ngClass]="{ selected: filterSignal() === filterEnum.active }"
            (click)="changeFilter($event, filterEnum.active)"
            >Active</a
          >
        </li>
        <li>
          <a
            href="/"
            [ngClass]="{ selected: filterSignal() === filterEnum.completed }"
            (click)="changeFilter($event, filterEnum.completed)"
            >Completed</a
          >
        </li>
      </ul>
    </footer>
  `,
  styleUrl: './footer.component.css',
  imports: [CommonModule],
})
export class FooterComponent {
  todosSerice = inject(TodosService);
  filterSignal = this.todosSerice.filterSignal;
  filterEnum = FilterEnum;

  activeCount = computed(() => {
    return this.todosSerice.todosSignal().filter((todo) => !todo.isCompleted)
      .length;
  });

  noTodosClass = computed(() => this.todosSerice.todosSignal().length === 0);
  itemsLeftText = computed(
    () => `item${this.activeCount() === 1 ? '' : 's'} left`
  );

  changeFilter(event: Event, filter: FilterEnum) {
    event.preventDefault();
    this.todosSerice.changeFilter(filter);
  }
}
