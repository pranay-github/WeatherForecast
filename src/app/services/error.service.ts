import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private subject: BehaviorSubject<string> = new BehaviorSubject(null);
  error: Observable<string> = this.subject.asObservable();

  /**
   * To show error
   * @param {string} message
   * @returns {void}
   */
  showError(message: string): void {
    this.subject.next(message);
  }
}
