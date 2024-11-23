import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private wasValidatedSubject = new Subject<boolean>();
  wasValidated$ = this.wasValidatedSubject.asObservable();

  loginSuccess() {
    this.wasValidatedSubject.next(true);
  }
}