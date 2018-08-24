import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class EmployeeService {

  employeeList : AngularFireList<any>;
  selectedEmployee : Employee = new Employee();
  constructor(private firebase : AngularFireDatabase) { }

  getEmployees(){
    this.employeeList = this.firebase.list('employees');
    return this.employeeList;
  }

  postEmployee(employee : Employee){
    this.employeeList.push({
      Name : employee.Name,
      Position : employee.Position,
      Salary : employee.Salary,
      Office : employee.Office
    });
  }

  putEmployee(employee : Employee){
    this.employeeList.update(employee.$key, {
      Name : employee.Name,
      Position : employee.Position,
      Salary : employee.Salary,
      Office : employee.Office
    });
  }

  deleteEmployee($key : string){
    this.employeeList.remove($key);
  }
}
