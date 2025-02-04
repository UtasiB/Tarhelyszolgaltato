import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'  // Ensures that ApiService is a singleton and provided globally
})
export class ApiService { 

  private server = environment.serverUrl;
  public tokenName = environment.tokenName;


  getTokenName(): string{
    return this.tokenName;
  }

  getToken():String | null{
    return localStorage.getItem(this.tokenName);
  }

  tokenHeader():{ headers: HttpHeaders }{
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    }); 
    return { headers }
  }

  getStoragePackages(): Observable<any> {
    return this.http.get(`${this.server}/api/storages`);
  }
  
  constructor(private http: HttpClient) { }
  
  login(table: string, data: object) {
    return this.http.post(this.server + '/api/' + table + '/login/', data);
  }

  registration(table: string, data: object) {
    return this.http.post(this.server + '/api/' + table + '/register', data);
  }
}
