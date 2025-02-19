import { Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, Observable } from 'rxjs';

@Component({
	selector: 'app-new-task',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './new-task.component.html',
	styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  	private formEl = viewChild<ElementRef<HTMLFormElement>>('form');

	constructor(private tasksService: TasksService){}

	onAddTask(title: string, description: string) {
		this.tasksService.addTask({title,description});
		this.formEl()?.nativeElement.reset();
		// effect(() => {
    	//   console.log(`Clicked button ${this.clickCount()} times.`);
    	// });
	}

	clickCount = signal(0);
	clickCount$ = toObservable(this.clickCount);
	interval$ = interval(1000);
	intervalSignal = toSignal(this.interval$, { initialValue: 0 });
	// interval = signal(0);
	// doubleInterval = computed(() => this.interval() * 2);
	customInterval$ = new Observable((subscriber) => {
		let timesExecuted = 0;
		const interval = setInterval(() => {
		// subscriber.error();
		if (timesExecuted > 3) {
			clearInterval(interval);
			subscriber.complete();
			return;
		}
		console.log('Emitting new value...');
		subscriber.next({ message: 'New value' });
		timesExecuted++;
		}, 2000);
	});
	private destroyRef = inject(DestroyRef);

	ngOnInit(): void {
		// setInterval(() => {
		//   this.interval.update(prevIntervalNumber => prevIntervalNumber + 1);
		//   // update some signal
		// }, 1000);
		// const subscription = interval(1000).pipe(
		//   map((val) => val * 2)
		// ).subscribe({
		//   next: (val) => console.log(val)
		// });
		// this.destroyRef.onDestroy(() => {
		//   subscription.unsubscribe();
		// });
		this.customInterval$.subscribe({
		next: (val) => console.log(val),
		complete: () => console.log('COMPLETED!'),
		error: (err) => console.log(err)
		});
		const subscription = this.clickCount$.subscribe({
		next: (val) => console.log(`Clicked button ${this.clickCount()} times.`),
		});
		this.destroyRef.onDestroy(() => {
		subscription.unsubscribe();
		});
	}

	onClick() {
		this.clickCount.update((prevCount) => prevCount + 1);
	}

}
