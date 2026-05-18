import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LastActionService {
  private lastAddSubject = new BehaviorSubject<Date | null>(null);
  private lastRemoveSubject = new BehaviorSubject<Date | null>(null);

  get lastAdd$(): Observable<Date | null> {
    return this.lastAddSubject.asObservable();
  }

  get lastRemove$(): Observable<Date | null> {
    return this.lastRemoveSubject.asObservable();
  }

  updateLastAdd(date: Date = new Date()) {
    this.lastAddSubject.next(date);
  }

  updateLastRemove(date: Date = new Date()) {
    this.lastRemoveSubject.next(date);
  }
}