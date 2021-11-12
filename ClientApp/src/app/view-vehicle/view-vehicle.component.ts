import { AuthService } from '@auth0/auth0-angular';
import { PhotoService } from './../services/photo.service';
import { VehicleService } from './../services/vehicle.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
  vehicle: any;
  vehicleId: number; 
  photos: any[];

  constructor( 
    private route: ActivatedRoute, 
    private router: Router,
    private photoService: PhotoService,
    private vehicleService: VehicleService,
    private auth: AuthService) {

      route.params.subscribe(p => {
        this.vehicleId = +p['id'];
        if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
          router.navigate(['/vehicles']);
          return; 
        }
      });
     }

  ngOnInit() {
    this.photoService.getPhotos(this.vehicleId)
    .subscribe(photos => this.photos = photos);

    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
        v => this.vehicle = v,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/vehicles']);
            return; 
          }
        });
  }
  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/vehicles']);
        });
    }
  }

  uploadPhoto(){
    var nativeElement: HTMLInputElement =  this.fileInput.nativeElement;

    this.photoService.upload(this.vehicleId, nativeElement.files[0])
    .subscribe(photo => {
      this.photos.push(photo);
    });

  }

}
