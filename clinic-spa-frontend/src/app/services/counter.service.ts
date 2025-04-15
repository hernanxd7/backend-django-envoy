import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private count = new BehaviorSubject<number>(0);
  count$ = this.count.asObservable();

  increment(): void {
    this.count.next(this.count.value + 1);
  }

  decrement(): void {
    this.count.next(this.count.value - 1);
  }

  reset(): void {
    this.count.next(0);
  }
}
