import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: "root",
})
export class DataService {

  contentType = "application/json";
  baseUrl = environment.EndPointUrl;

  constructor(private http: HttpClient) { }


  Get(url, id = null) {
    url = this.SetBaseUrl(url);

    if(id != null)
        url += "/" + id;    

    return this.http
      .get(url, { headers: this.setHeaders() })
      .pipe(catchError(this.handleErro));
  }

  Post(url, resource) {
    url = this.SetBaseUrl(url);

    let x = this.http
      .post(url, resource, { headers: this.setHeaders() })
      .pipe(catchError(this.handleErro));
    return x;
  }

  Put(url, resource) {
    url = this.SetBaseUrl(url);
    
    return this.http
      .put(url, resource, { headers: this.setHeaders() })
      .pipe(catchError(this.handleErro));
  }

  Delete(url, id) {
    url = this.SetBaseUrl(url);
    
    url += "/" + id;
    return this.http
      .delete(url, { headers: this.setHeaders() })
      .pipe(catchError(this.handleErro));
  }

  private setHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", this.contentType);
    return headers;
  }


  private handleErro(error: Response) {

    return null;
    //return throwError(new AppError(error));
  }

  private SetBaseUrl(url: any) {
    url = this.baseUrl + url;
    return url;
  }
}