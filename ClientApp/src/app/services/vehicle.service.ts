import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor( private HttpClient: HttpClient) { }

  getMakes(): Observable<any[]> {
    return this.HttpClient.get<any[]>('/api/makes');
  }

  getFeatures(): Observable<any[]>{
    return this.HttpClient.get<any[]>('/api/features');
  }
}
