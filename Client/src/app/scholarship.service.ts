import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Register } from './models/register';

@Injectable({
  providedIn: 'root',
})
export class ScholarshipService {
  private apiUrl = 'http://localhost:3000/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getAllScholarships(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'scholarships').pipe(
      catchError((error: any) => {
        console.error('Error in retrieving scholarships:', error);
        return throwError('Internal Server Error');
      })
    );
  }

  getScholarshipById(scholarshipId: string): Observable<any> {
    const url = `${this.apiUrl + 'scholarships'}/${scholarshipId}`;
    return this.http.get<any>(url).pipe(
      catchError((error: any) => {
        console.error('Error in retrieving scholarship by ID:', error);
        if (error.status === 404) {
          return throwError('Scholarship not found');
        }
        return throwError('Internal Server Error');
      })
    );
  }
  createUser(user: Register): Observable<any> {
    return this.http
      .post<any>(this.apiUrl + 'users', user, this.httpOptions)
      .pipe(
        catchError((error: any) => {
          console.error('Error in creating user:', error);
          return throwError('Internal Server Error');
        })
      );
  }
  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'users').pipe(
      catchError((error: any) => {
        console.error('Error in accessing users:', error);
        return throwError('Internal Server Error');
      })
    );
  }
  getUserById(userId: string): Observable<any> {
    const url = `${this.apiUrl}users/${userId}`;

    return this.http.get(url).pipe(
      catchError((error: any) => {
        console.error(`Error in accessing user ${userId}:`, error);
        return throwError('Internal Server Error');
      })
    );
  }

  updateUser(scholarshipId: string, userId: string): Observable<any> {
    const url = `${this.apiUrl + 'users'}/${userId}`;

    return this.http.put(url, { scholarshipId }).pipe(
      catchError((err) => {
        console.error('Error in updating user scholarships:', err);
        return throwError('Internal Server Error');
      })
    );
  }

  removeScholarship(userId: string, scholarshipId: string): Observable<any> {
    const url = `${this.apiUrl + 'users'}/${userId}/removeScholarship`;
    const body = { scholarshipId };
    return this.http.put(url, body);
  }
}
