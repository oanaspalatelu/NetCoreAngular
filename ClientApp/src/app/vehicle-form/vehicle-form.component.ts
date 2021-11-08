import * as _ from 'underscore';
import { SaveVehicle, Vehicle } from './../models/vehicle';
import { VehicleService } from '../services/vehicle.service';
import { Component, OnInit, isDevMode } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  makes: any[];
  models: any[];
  features: any[];
  sources: any[];
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      email: '',
      phone:''
    }
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

    forkJoin([
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures(),
      !isNaN(this.vehicle.id) ?  this.vehicleService.getVehicle(this.vehicle.id) : null
    ]).subscribe(data =>{
      this.makes = data[0];
      this.features = data[1];
      if(!isNaN(this.vehicle.id)){
        this.setVehicle(data[2] as unknown as Vehicle);
        this.populateModels();
      } 
    }, err => {
      if(err.status == 404){
        console.log("ERROR 404");
        this.router.navigate(['/']);
      }
    });

    /*this.vehicleService.getMakes().subscribe(makes => this.makes = makes);
    this.vehicleService.getFeatures().subscribe(features => this.features = features);
    this.vehicleService.getVehicle(this.vehicle.id).subscribe(v => {
      this.vehicle = v;
    }, err => {
      if(err.status == 404){
        console.log("ERROR 404");
        this.router.navigate(['/']);
      }
    })*/
    
  }

  private setVehicle(v: Vehicle){
    this.vehicle.id = v.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features, 'id');
  }

  onMakeChange(){
    this.populateModels();
    delete this.vehicle.modelId;
  }

  private populateModels(){
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId)
    this.models = selectedMake ? selectedMake.models : [];
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
    if(this.vehicle.id){
      this.vehicleService.update(this.vehicle)
      .subscribe(x=> console.log("The vehicle was cucessfully updated!"))
    }else{
      this.vehicleService.create(this.vehicle)
      .subscribe(x=> console.log(x));
    }
  }

  delete(){
    if(confirm("Are you sure?")){
      this.vehicleService.delete(this.vehicle.id)
      .subscribe
      (x => {
        this.router.navigate(['/']);
      })
    }
  }

}
