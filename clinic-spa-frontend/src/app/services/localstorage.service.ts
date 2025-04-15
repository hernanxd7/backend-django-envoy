import { Inject, Injectable, InjectionToken } from '@angular/core';

// Define an injection token for localStorage
export const LOCAL_STORAGE = new InjectionToken<Storage>('Local Storage', {
  providedIn: 'root',
  factory: () => localStorage,
});

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor(@Inject(LOCAL_STORAGE) private storage: Storage) {}

  // Save data to localStorage
  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  // Retrieve data from localStorage
  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  // Remove data from localStorage
  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  // Clear all data from localStorage
  clear(): void {
    this.storage.clear();
  }}
