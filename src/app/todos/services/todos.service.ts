import { Injectable, signal } from '@angular/core';
import { TodoInterface } from '../types/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todosSignal = signal<TodoInterface[]>([]);

  addTodo(text: string) {
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: crypto.randomUUID(),
    };
    this.todosSignal.update((todos) => [...todos, newTodo]);
  }
}
