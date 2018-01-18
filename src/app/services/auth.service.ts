import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpResponse} from "selenium-webdriver/http";

@Injectable()
export class AuthService {

  base_url: string;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.base_url = `http://${window.location.hostname}/api/auth`;
    this.headers = new HttpHeaders({'Accept': 'application/json'});
  }

  getToken() {
    return localStorage.getItem('API_TOKEN');
  }


  login(user): Promise<any> {
    const url = `${this.base_url}/login`;

    return this.http.post(url, user, {headers: this.headers})
      .toPromise()
      .then((response: HttpResponse) => response)
      .catch(this.handleError);
  }

  logout() {
    const url = `${this.base_url}/logout`;
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });
    this.http.get(url)
      .toPromise()
      .then((response: Response) => {
        localStorage.removeItem('API_TOKEN');
        response.json();
      })
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    if (error.status === 400) {
      return Promise.reject(error.json());
    }
    if (error.status === 401) {
      return Promise.reject('Unauthorized');
    }
    if (error.status === 403) {
      return Promise.reject('Forbidden');
    }
    return Promise.reject(error);
  }

}
