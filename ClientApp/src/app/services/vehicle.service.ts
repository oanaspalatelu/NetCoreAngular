import { SaveVehicle } from './../models/vehicle';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly vehiclesEndpoint = '/api/vehicle';

  constructor( private HttpClient: HttpClient) { }

  getMakes(): Observable<any[]> {
    return this.HttpClient.get<any[]>('/api/makes');
  }

  getFeatures(): Observable<any[]>{
    return this.HttpClient.get<any[]>('/api/features');
  }

  create(vehicle){
    return this.HttpClient.post(this.vehiclesEndpoint, vehicle);
  }

  update(vehicle: SaveVehicle){
    return this.HttpClient.put(this.vehiclesEndpoint + '/' + vehicle.id, vehicle);
  }

  delete(id){
    return this.HttpClient.delete(this.vehiclesEndpoint + '/' + id);
  }

  getVehicle(id): Observable<any[]>{
    return this.HttpClient.get<any[]>(this.vehiclesEndpoint + '/' + id);
  }

  getVehicles(filter): Observable<any[]>{
    return this.HttpClient.get<any[]>(this.vehiclesEndpoint + '?' + this.toQueryString(filter));
  }

  toQueryString(obj) {
    var parts = [];
    for (var property in obj) {
      var value = obj[property];
      if (value != null && value != undefined) 
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }

    return parts.join('&');
  }
}
