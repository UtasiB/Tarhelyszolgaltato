import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'  // Ensures that ApiService is a singleton and provided globally
})
export class ApiService { 

  private server = environment.serverUrl;

  constructor(private http: HttpClient) { }
  
  login(table: string, data: object) {
    return this.http.post(this.server + '/api/' + table + '/login/', data);
  }

  registration(table: string, data: object) {
    return this.http.post(this.server + '/api/' + table + '/register', data);
  }
}
