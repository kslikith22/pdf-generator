import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserCommunicationService {
  private userAddedSubject = new Subject<void>();

  userAdded = this.userAddedSubject.asObservable();

  notifyUserAdded() {
    this.userAddedSubject.next();
  }
}
