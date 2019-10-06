import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, EMPTY, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { idx } from '../../utils/idx.util';

export class HtHttp {
  constructor(private http: HttpClient, private errorAlert: ErrorAlert) {}
  get<T>(url: string): Observable<T> {
    return this.http.get(`${environment.baseUrl}${url}`).pipe(
      map(res => this.handleSuccess(res)),
      catchError(err => this.handleError(err)))
  }

  post<T>(url: string, data?: any): Observable<T> {
    return this.http.post(`${environment.baseUrl}${url}`, data || {}).pipe(
      map(res => this.handleSuccess(res)),
      catchError(err => this.handleError(err)))
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete(`${environment.baseUrl}${url}`).pipe(
      map(res => this.handleSuccess(res)),
      catchError(err => this.handleError(err)))
  }

  put<T>(url: string, data?: any): Observable<T> {
    return this.http.put(`${environment.baseUrl}${url}`, data || {}).pipe(
      map(res => this.handleSuccess(res)),
      catchError(err => this.handleError(err)))
  }

  patch<T>(url: string, data?: any): Observable<T> {
    return this.http.patch(`${environment.baseUrl}${url}`, data || {}).pipe(
      map(res => this.handleSuccess(res)),
      catchError(err => this.handleError(err)))
  }

  /** Method for request with success */
  private handleSuccess(res: any): Observable<any> {
    if (res && !res.success) {
      throw { error: res };
    }

    if (res && res.success) {
      // console.log('success');
    }
    return res;
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      this.errorAlert.sendError$$.next(new ApiError(new HttpErrorResponse({status: 0})))
      return EMPTY
    } else if (error instanceof HttpErrorResponse) {
      // The backend returned an unsuccessful response code or api server is not reachable
      this.errorAlert.sendError$$.next(new ApiError(error))
      return EMPTY
    } else {
      return EMPTY
    }
  }
}

export class ErrorAlert {
  /** Recieve API errors. Global error subject only receives errors when there is no one subscribed to a local error subject.  */
  globalErrors$$ = new Subject<ApiError | null>()
  sendError$$ = new Subject<ApiError>()
  /** Receive API errors. If subscribed to local error, global errors get redirected to local erros and will not reach global error subject. Dont forget to unsubscribe! */
  localErrors$$ = new Subject<ApiError>()
  /** Show ApiError in the Alert UI. Use .next(apiError) to show the message to the user. Use .next(null) to hide the error.  */
  displayErrorAlert$$ = this.globalErrors$$
  constructor() {
    this.sendError$$.subscribe(val => {
      if (this.localErrors$$.observers.length > 0) {
        this.localErrors$$.next(val)
      } else { this.globalErrors$$.next(val) }
    })
  }
}

export class ApiError extends Error {
  /** The whole error body response from the API.  */
  errorBody: any
  /** Comes from the API error. Can be something like "RequestValidationError" or "ApplicationError". Check the backend error docs for all error types.  */
  errorType: string
  /** The API error code. Check the backend docs for all error codes. */
  errorCode: string
  /** The error message for the user. */
  message: string
  /** The http status code returned by the API.  */
  statusCode: number


  constructor(private httpErrorResponse: HttpErrorResponse) {
    super(idx(httpErrorResponse, ['error', 'error', 'message']) || httpErrorResponse.message);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);

    this.errorBody = idx(this.httpErrorResponse, ['error', 'error'])
    this.errorType = idx(this.errorBody, ['errorType']) || 'unknown'
    this.errorCode = idx(this.errorBody, ['errorCode']) || 'unknown'
    if (idx(this.errorBody, ['message'])) {
      this.message = idx(this.errorBody, ['message'])
    } else if (this.httpErrorResponse.status === 0) {
      this.message = 'Can not connect to the server. Please check your internet connection or retry later.'
    } else {
      this.message = 'An unknown error occurred'
    }
    this.statusCode = this.httpErrorResponse.status
  }
}
