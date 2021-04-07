import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'  
})
export class GitHubService {
  tries = 0
  getUser(username: string) {
    if(this.tries === 0) {
      this.tries++;
      return throwError('Try again').pipe(delay(1500))  
    }
    return this.http.get(`https://api.github.com/users/${username}`).pipe(delay(900))  
  }

  constructor(private http: HttpClient){}
}