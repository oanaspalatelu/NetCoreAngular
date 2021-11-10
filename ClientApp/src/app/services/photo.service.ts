import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PhotoService {

    constructor(private HttpClient: HttpClient) { }

    upload(vehicleId, photo){
        var formData = new FormData();
        formData.append('file', photo);
        return this.HttpClient.post(`/api/vehicles/${vehicleId}/photos`, formData);
    }

    getPhotos(vehicleId): Observable<any[]>{
        return this.HttpClient.get<any>(`/api/vehicles/${vehicleId}/photos`);
    }
    
}