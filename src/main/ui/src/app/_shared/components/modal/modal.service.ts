import { Injectable } from '@angular/core';
import { Observable , Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private result = {
    item: '',
    id: '',
    navigate: false
  };

  private _modalSequence$$: Subject<any> = new Subject();

  open(componentObj: { component: any, context?: any }): void {
    this._modalSequence$$.next(componentObj);
  }

  close(): void {
    this._modalSequence$$.next(null);
  }

  get modalSequence$(): Observable<any> {
    return this._modalSequence$$.asObservable();
  }
}
