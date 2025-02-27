import { Component } from '@angular/core';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
// import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl:'./tasks.component.css',
  imports: [NewTaskComponent, TasksListComponent],
  // providers:[TasksService] - Element Injector
})
export class TasksComponent {}
