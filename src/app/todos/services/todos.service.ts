import { Injectable, signal } from '@angular/core';
import { FilterEnum } from '../types/filter.enum';
import { TodoInterface } from '../types/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todosSignal = signal<TodoInterface[]>([]);
  filterSignal = signal<FilterEnum>(FilterEnum.all);

  changeFilter(filter: FilterEnum) {
    this.filterSignal.set(filter);
  }

  addTodo(text: string) {
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: crypto.randomUUID(),
    };
    this.todosSignal.update((todos) => [...todos, newTodo]);
  }
}
