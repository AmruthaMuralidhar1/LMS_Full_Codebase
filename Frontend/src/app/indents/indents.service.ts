import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { indents } from 'src/assets/mock-data/indents-mock-data';
import { indentDetails } from 'src/assets/mock-data/indent-details';

@Injectable({
  providedIn: 'root',
})
export class IndentServices {
  private indents = indents;
  private details = indentDetails;

  constructor(private http: HttpClient) { }

  // Method to get all indents
  getIndents(): Observable<any[]> {
    return of(this.indents);
  }

  getIndentDetails(): Observable<any> {
    return of(this.details);
  }

  fetchIndentDetails(soId: string): Observable<any> {
    const apiUrl = `http://localhost:9090/api/indents/${soId}`;
    return this.http.get<any>(apiUrl);
  }

  saveIndent(soId: string, pickupLocation: string, dropLocation: string): Observable<any> {
    const apiUrl = 'http://localhost:9090/api/indents/saveIndent';
    const requestBody = {
      salesOrder: { soId },
      route: [pickupLocation, dropLocation]
    };
    return this.http.post<any>(apiUrl, requestBody);
  }
  saveBidding(soId: string, pickupLocation: string, dropLocation: string, biddingPrice: number): Observable<any> {
    const apiUrl = 'http://localhost:9090/api/indents/saveIndent';
    const requestBody = {
      salesOrder: { soId },
      route: [pickupLocation, dropLocation],
      biddingPrice
    };
    return this.http.post<any>(apiUrl, requestBody);
  }
}
