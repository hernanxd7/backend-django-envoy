import { Component, OnInit, OnDestroy } from '@angular/core';
import { CounterService } from '../../services/counter.service';
import { Subscription } from 'rxjs';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-counter',
  imports: [
    RouterLink,
    MatIcon
  ],
  template: `
    <div>

      <h2>Current Count: {{ currentCount }}</h2>
      <button (click)="increment()">Increment</button>
      <button (click)="decrement()">Decrement</button>
      <button (click)="reset()">Reset</button>
    </div>

    <div>
      <button mat-raised-button color="primary" [routerLink]="['/home']">
        <mat-icon>go to counter</mat-icon>
        Go to Home
      </button>
    </div>
  `,
  styleUrl: './counter.component.scss'
})
export class CounterComponent implements OnInit, OnDestroy {
  currentCount = 0;
  private subscription: Subscription = new Subscription();

  constructor(private counterService: CounterService) {}

  ngOnInit(): void {
    this.subscription = this.counterService.count$.subscribe(
      count => this.currentCount = count
    );
  }

  increment(): void {
    this.counterService.increment();
  }

  decrement(): void {
    this.counterService.decrement();
  }

  reset(): void {
    this.counterService.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
