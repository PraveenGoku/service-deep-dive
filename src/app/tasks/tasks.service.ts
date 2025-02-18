import { inject, Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";
import { LoggingService } from "../logging.service";

//No @Service
@Injectable({
    providedIn:'root'
})
export class TasksService {
    private tasks: Task[] = [];
    private loggingService = inject(LoggingService);

    get allTasks(){
        //using getter which to return a copy
        return [...this.tasks];
    }


    addTask(taskData:{ title: string; description: string}){
        const newTask: Task = {
            ...taskData,
            id: Math.random().toString(),
            status: 'OPEN'
        } 
        this.tasks = [...this.tasks,newTask];
        this.loggingService.log('ADDED TASK WITH TITLE '+ taskData.title);
    }

    updateTaskStatus(taskId: string, newStatus: TaskStatus){
        this.tasks= this.tasks.map((task)=> 
                task.id === taskId ? {...task, status : newStatus}: task
            );
        this.loggingService.log('CHANGE TASK STATUS TO '+ newStatus);

    }
}