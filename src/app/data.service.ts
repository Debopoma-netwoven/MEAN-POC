import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  result: any;
  constructor(private _http: Http) { }
  getUsers() {
    return this._http.get("/api/users")
      .map(result => this.result = result.json().data);
  }
  setData() {
    var id =Math.random()*10;
    var data ={"message": "add", "data": { "relapse_id": id.toString(), "relapse_month": "August", "relapse_year": "2019", "last_updated_provider_id": "G00123", "save_csn": "865482572", "save_csn_status": "Open", "last_updated_instant": "08/31/2019 10:41:05", "patient_reported": false, "qx_id": "", "clinician_confirmed": true }};
    // Call service with response
    return this._http.post("/api/users", data)
    .map(result => {
    });
  }
  deleteData(id) {
    var data ={"message": "delete","id" : id}
    // Call service with response
    return this._http.post("/api/users",data)
    .map(result => {
    });
  }
  editData(id,month,year) {
    var data ={"message": "edit","id" : id, "month": month, "year": year}
    // Call service with response
    return this._http.post("/api/users",data)
    .map(result => {
    });
  }
}
