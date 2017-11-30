import { Component,Input } from '@angular/core';
// Import the DataService
import { DataService } from './data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
   // Define a users property to hold our user data
   users: Array<any>;
   
     // Create an instance of the DataService through dependency injection
     constructor(private _dataService: DataService) {
       // Access the Data Service's getUsers() method we defined
       this._dataService.getUsers()
           .subscribe(res => {
            this.users = res[0].relapses
            
          });
         
            
          
     }
     ngOnInit() {
     
     }
     addData()
     {
       this._dataService.setData()
       .subscribe(d=> {
        //this._dataService.getUsers();
        window.location.reload();
       });
     }
     deleteRel(id)
     {
       this._dataService.deleteData(id)
       .subscribe(d=> {
        //this._dataService.getUsers();
        window.location.reload();
       });
     }
     editRel(id)
     {
       var data:any = this.users.filter(item=> item.relapse_id == id);
      this._dataService.editData(id,data[0].relapse_month,data[0].relapse_year)
      .subscribe(d=> {
       //this._dataService.getUsers();
       window.location.reload();
      });
     }
}
