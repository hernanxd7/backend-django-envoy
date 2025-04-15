import { Component, OnInit } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { DataService, User } from '../../services/data.service';
import {AsyncPipe, NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [NgFor, NgIf, AsyncPipe],
  template:`
    <div>
      <h2>Users</h2>
      <div *ngIf="dataService.loading$ | async">Loading...</div>
      <div *ngIf="dataService.error$ | async as error" class="error">{{ error }}</div>
      <ul *ngIf="users$ | async as users">
        <li *ngFor="let user of users">
          {{ user.name }} ({{ user.email }})
          <button (click)="deleteUser(user.id)">Delete</button>
        </li>
      </ul>
      <button (click)="loadUsers()">Refresh Users</button>
    </div>
  `,
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]> = EMPTY;

  constructor(public dataService: DataService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users$ = this.dataService.getUsers().pipe(
      catchError(() => of([]))
    );
  }

  deleteUser(id: number): void {
    this.dataService.deleteUser(id).pipe(
      finalize(() => this.loadUsers())
    ).subscribe();
  }
}
