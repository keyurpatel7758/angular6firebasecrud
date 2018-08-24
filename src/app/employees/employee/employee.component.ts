import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService : EmployeeService, private toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.onResetClick(null);
  }

  onResetClick(form : NgForm){
    if(form != null)
      form.reset();
    this.employeeService.selectedEmployee = {
      $key : null,
      Salary : 0,
      Name : '',
      Office : '',
      Position : ''
    };
  }

  onSubmitClick(form : NgForm){
     if(form.value.$key == null){
      this.employeeService.postEmployee(form.value);
      this.toastr.success('Employee added successfully!!', 'Employee Registration');
     }
     else{
      this.employeeService.putEmployee(form.value);
      this.toastr.info('Employee updated successfully!!', 'Employee Registration');
     }

    //   {
    //     this.employeeService.postEmployee(form.value)
    //     .subscribe(data=>{
    //       this.onResetClick(form);
    //       this.employeeService.getEmployees();
    //       'this.toastr.success('Employee added successfully!!', 'Employee Register');
    //     });
    //   }
    //   else{
    //     this.employeeService.putEmployee(form, form.value)
    //     .subscribe(data=> {
    //       this.onResetClick(form);
    //       this.employeeService.getEmployees();
    //       'this.toastr.info('Employee updated successfully!!', 'Employee Register');
    //     })
    //   }

    
    this.onResetClick(form);    
  }
}
