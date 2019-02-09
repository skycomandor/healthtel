import { Injectable } from '@angular/core';
import { Observable , Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private result = {
    item: '',
    id: ''
  };

  private _modalSequence$$: Subject<any> = new Subject();
  private deleteModalResult$$: BehaviorSubject<{item: string, id: any}> = new BehaviorSubject(this.result);

    public open(componentObj: { component: any, context?: any }): void {
        this._modalSequence$$.next(componentObj);
    }

    public close(): void {
        this._modalSequence$$.next(null);
    }

    public get modalSequence$(): Observable<any> {
        return this._modalSequence$$.asObservable();
    }

    public get deleteModalResult$(): Observable<any> {
        return this.deleteModalResult$$.asObservable();
    }

    public setDeleteModalResult(result: {item: string, id: any}) {
      this.deleteModalResult$$.next(result);
    }
}
