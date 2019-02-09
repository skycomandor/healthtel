import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {
  public options: {};

  constructor(private _http: HttpClient) {
    this.setToken();
  }

  public get(url: string) {
    return this._http
      .get(`${url}`, this.options)
      .map(res => this._handleSuccess(res))
      .catch(err => this._handleError(err, 'GET'));
  }

  public post(url: string, data?: any) {
    return this._http
      .post(url, data || {}, this.options)
      .map(res => this._handleSuccess(res))
      .catch(err => this._handleError(err, 'POST'));
  }

  public delete(url: string) {
    return this._http
      .delete(`${url}`, this.options)
      .map(res => this._handleSuccess(res))
      .catch(err => this._handleError(err, 'DELETE'));
  }

  public put(url: string, data?: any) {
    return this._http
      .put(`${url}`, data || {}, this.options)
      .map(res => this._handleSuccess(res))
      .catch(err => this._handleError(err, 'PUT'));
  }

  public patch(url: string, data?: any) {
    return this._http
      .patch(`${url}`, data || {}, this.options)
      .map(res => this._handleSuccess(res))
      .catch(err => this._handleError(err, 'PATCH'));
  }

  public setToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.options = {};
      return false;
    }

    this.options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
  }

  // Method for request with success
  private _handleSuccess(res: any): Observable<any> {
    if (res && res.error) {
      throw { error: res };
    }

    if (res && !res.error) {
      // console.log('success');
    }
    return res;
  }

  // Method for parsing global http errors
  private _handleError(res: any, method: string): Observable<any> {
    if (res.error) {
      console.log('error', res);
    }
    return of(res);
  }
}
