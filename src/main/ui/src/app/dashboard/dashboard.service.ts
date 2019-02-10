import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DashboardService {
  private deletedItem = {};
  private crudEvent = {};
  private confirmMsg: string = '';
  private mode: {type: string, userID?: string, item: string} = {
    type: '',
    userID: '',
    item: ''
  };

  private deletedItem$$: BehaviorSubject<any> = new BehaviorSubject<any>(this.deletedItem);
  private confirmMsg$$: BehaviorSubject<string> = new BehaviorSubject<string>(this.confirmMsg);
  private crudEvent$$: BehaviorSubject<any> = new BehaviorSubject<any>(this.crudEvent);
  private mode$$: BehaviorSubject<any> = new BehaviorSubject<any>(this.mode);

  constructor() { }

  get deletedItem$() {
    return this.deletedItem$$.asObservable();
  }

  public setDeletedItem(item) {
    this.deletedItem = item;
    this.deletedItem$$.next(this.deletedItem);
  }

  get confirmMsg$() {
    return this.confirmMsg$$.asObservable();
  }

  public setConfirmMsg(msg: string) {
    this.confirmMsg = msg;
    this.confirmMsg$$.next(this.confirmMsg);
  }

  get crudEvent$() {
    return this.crudEvent$$.asObservable();
  }

  public setCrudEvent(event: any) {
    this.crudEvent = event;
    this.crudEvent$$.next(this.crudEvent);
  }

  get mode$() {
    return this.mode$$.asObservable();
  }

  public setMode(mode: {type: string, userId?: string, item: string}) {
    this.mode = mode;
    this.mode$$.next(this.mode);
  }
}
