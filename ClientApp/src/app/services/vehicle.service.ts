import { SaveVehicle } from './../models/vehicle';
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

  create(vehicle){
    return this.HttpClient.post('/api/vehicle', vehicle);
  }

  update(vehicle: SaveVehicle){
    return this.HttpClient.put('/api/vehicle/' + vehicle.id, vehicle);
  }

  delete(id){
    return this.HttpClient.delete('/api/vehicle/' + id);
  }

  getVehicle(id): Observable<any[]>{
    return this.HttpClient.get<any[]>('/api/vehicle/' + id);
  }
}
