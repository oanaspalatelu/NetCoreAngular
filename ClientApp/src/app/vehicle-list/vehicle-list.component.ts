import { AuthService } from '@auth0/auth0-angular';
import { KeyValuePair, Vehicle } from './../models/vehicle';
import { VehicleService } from './../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  private readonly PAGE_SIZE = 3; 

  queryResult: any = {};
  makes: KeyValuePair[];
  query: any = {
    pageSize: this.PAGE_SIZE
  };
  columns = [
    { title: 'Id' },  
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    { title: 'Contact Name', key: 'contactName', isSortable: true },
    { }
  ];

  constructor(private VehicleService: VehicleService,
    public auth: AuthService) { }

  ngOnInit() {

    this.populateVehicles();
    this.VehicleService.getMakes()
    .subscribe(makes => this.makes = makes);
  }

  private populateVehicles() {
    this.VehicleService.getVehicles(this.query)
    .subscribe(result => this.queryResult = result);
  }

  onFilterChange() {
    this.query.page = 1; 
    this.populateVehicles();
  }

  resetFilter() {
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE
    };
    this.populateVehicles();
  }

  sortBy(columnName) {
    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending; 
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();
  }

  onPageChange(page) {
    this.query.page = page; 
    this.populateVehicles();
  }

}
