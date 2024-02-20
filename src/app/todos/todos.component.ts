import { Component } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';

@Component({
  standalone: true,
  selector: 'app-todos',
  template: `
    <div class="todoapp">
      <app-todos-header /> <app-todos-main /> <app-todos-footer />
    </div>
  `,
  styleUrl: './todos.component.css',
  imports: [HeaderComponent, FooterComponent, MainComponent],
})
export class TodosComponent {}
