import {Component, OnInit, ViewChild} from '@angular/core';
import {Department} from '../../../../shared/_models/department';
import {DepartmentService} from '../../../../shared/_service/department.service';
import {Router} from '@angular/router';
import {DepartmentComponent} from '../department.component';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  department: Department;
  departmentComponent: DepartmentComponent;
  @ViewChild('closebutton') closebutton;

  constructor(
    public departmentService: DepartmentService,
    private router: Router
  ) {
  }

  onSubmit() {
    this.departmentService.addDepartment(this.department).subscribe(
      // tslint:disable-next-line:ban-types
      (data: Boolean) => {
        console.log(data);
        this.closebutton.nativeElement.click();
        this.department.departmentCode = '';
        this.department.departmentName = '';
        this.router.navigateByUrl('/management/department', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/management/department']);
        });
      }
    );
  }

  ngOnInit(): void {
    this.department = new Department();
  }

}
