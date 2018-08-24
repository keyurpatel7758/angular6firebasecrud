import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { ToastsManager } from 'ng6-toastr/ng2-toastr'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList : Employee[];
  constructor(private employeeService : EmployeeService, private toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    var x = this.employeeService.getEmployees();
    x.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      item.forEach(element=>{
        var y = element.payload.toJSON(); 
        y["$key"] = element.key;
        this.employeeList.push(y as Employee);
      })
    });

  }


  showForEdit = (emp: Employee) => {
    this.employeeService.selectedEmployee = Object.assign({}, emp);
  }

  deleteEmployee = (empkey: string) => {
    if(confirm('Are you sure want to delete employee ?'))
      {
        this.employeeService.deleteEmployee(empkey);
          this.employeeService.getEmployees();
          this.toastr.warning('Employee deleted successfully!!', 'Employee Registration');          
      };
  }
}
