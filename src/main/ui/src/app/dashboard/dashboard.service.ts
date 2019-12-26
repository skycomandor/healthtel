import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable()
export class DashboardService {
  private mode: {type: string, userID?: string, item: string} = {
    type: '',
    userID: '',
    item: ''
  };

  deletedItem$ = new ReplaySubject<{name: string, item: any}>(1);
  reloadEvent$ = new ReplaySubject<string>(1);
  private confirmMsg$$ = new ReplaySubject<{text: string, color: 'red' | 'green'}>(1);
  private mode$$: BehaviorSubject<any> = new BehaviorSubject<any>(this.mode);

  setDeletedItem(data: {name: string, item: any}) {
    this.deletedItem$.next(data);
  }

  setReloadEvent(item: string) {
    return this.reloadEvent$.next(item)
  }

  get confirmMsg$() {
    return this.confirmMsg$$.asObservable();
  }

  setConfirmMsg(msg: {text: string, color: 'red' | 'green'}) {
    this.confirmMsg$$.next(msg);
  }

  get mode$() {
    return this.mode$$.asObservable();
  }

  setMode(mode: {type: string, userId?: string, item: string}) {
    this.mode = mode;
    this.mode$$.next(this.mode);
  }
}
