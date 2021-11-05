import { VehicleService } from '../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  makes: any[];
  models: any[];
  features: any[];
  vehicle: any = {
    features: [],
    contact: {}
  };
  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router) { 
      route.params.subscribe(p => {
        this.vehicle.id = +p['id'];
      })
    }

  ngOnInit() {

    this.vehicleService.getMakes().subscribe(makes => this.makes = makes);
    this.vehicleService.getFeatures().subscribe(features => this.features = features);
    this.vehicleService.getVehicle(this.vehicle.id).subscribe(v => {
      this.vehicle = v;
    }, err => {
      if(err.status == 404){
        console.log("aici");
        this.router.navigate(['/home']);
      }
    })
    
  }

  onMakeChange(){

    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId)
    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;
    
  }

  onFeatureToggle(featureId, $event){
    if($event.target.checked){
      this.vehicle.features.push(featureId);
    }else{
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index,1);
    }
  }

  submit(){
    this.vehicleService.create(this.vehicle)
    .subscribe(x=> console.log(x));
  }

}