import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import {  Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiURL = 'https://620dfdda20ac3a4eedcf5a52.mockapi.io/api';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>(this.apiURL + '/employee?page=1&limit=10').pipe(
      map((res) => {
        return res;
      })
    );
  }

  getEmpById(id: any) {
    return this.http.get<any>(this.apiURL + '/employee/' + id);
  }

  searchEmp(name: string) {
    return this.http.get<any>(this.apiURL + '/employee?search=' + name);
  }

  paginationList(page: any) {
    return this.http.get<any>(
      this.apiURL + '/employee?page=' + page + '&limit=15'
    );
  }

  sortingOfEmp(sortKey: string, data: string) {
    return this.http.get<any>(
      this.apiURL + '/employee?sortBy=' + sortKey + '&order=' + data
    );
  }
}
