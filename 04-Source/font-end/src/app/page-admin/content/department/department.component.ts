import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DepartmentService} from '../../../shared/_service/department.service';
import {Subject} from 'rxjs';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AddDepartmentComponent} from './add-department/add-department.component';
import {EditDepartmentComponent} from './edit-department/edit-department.component';
import {DeleteDepartmentComponent} from './delete-department/delete-department.component';
import {DataTableDirective} from 'angular-datatables';
import {reload} from "../../../shared/_models/constant";


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit, OnDestroy {
  listDepartments: any = [];                      // mảng chứa danh sách bộ môn

  @ViewChild(DataTableDirective, {static: false}) // khai bao cac tuy chon cua dataTable
  dtElement: DataTableDirective;
  dataTableOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  bsModalRef: BsModalRef;                         // bắt sự kiện show , ẩn các modal

  constructor(
    private departmentService: DepartmentService,
    public modalService: BsModalService,
  ) {
  }

  ngOnInit(): void {
    this.dataTableOptions = {
      pagingType: 'full_numbers',
    };
    this.loadAllDepartment();
  }

  /**
   * - call api từ service để nhận được mảng bộ môn
   * - thực hiện load data lên datatable
   */
  private loadAllDepartment() {
    return this.departmentService.getAllDepartment().subscribe((data: {}) => {
      this.listDepartments = data;
      this.dtTrigger.next();
    });
  }

  /**
   * khi click vao cac button crud se goi den ham reload
   * document : https://viblo.asia/p/rxjs-voi-angular-subscribe-va-unsubscribe-observable-Do754kQ0lM6
   */
  private reload() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.loadAllDepartment();
    });
  }

  openModalAdd() {
    this.bsModalRef = this.modalService.show(AddDepartmentComponent);

    this.bsModalRef.content.onClose.subscribe(result => { // component cha tiếp tục lắng nghe sự kiện từ component con, nếu thực hiện crud sẽ truyền về 1 v và thực hiện reload
      if (result) {
        this.reload();
      } else {
        console.log('Thêm thất bại');
      }
    })
  }

  openModalEdit(event: Event) {
    const id = (event.target as Element).id;
    const initialState = {
      idDepartment: id
    };
    this.bsModalRef = this.modalService.show(EditDepartmentComponent, {initialState});

    this.bsModalRef.content.onClose.subscribe(result => { // component cha tiếp tục lắng nghe sự kiện từ component con, nếu thực hiện crud sẽ truyền về 1 v và thực hiện reload
      if (result) {
        this.reload();
      } else if (!result) {
        alert("Lỗi tên bộ môn và mã bộ môn không được trùng nhau");
      }
    })
  }

  openModalDelete(event: Event) {
    const id = (event.target as Element).getAttribute('name');
    const initialState = {
      idDepartment: id
    };
    this.bsModalRef = this.modalService.show(DeleteDepartmentComponent, {initialState});

    this.bsModalRef.content.onClose.subscribe(result => { // component cha tiếp tục lắng nghe sự kiện từ component con, nếu thực hiện crud sẽ truyền về 1 v và thực hiện reload
      if (result) {
        this.reload();
      } else if (!result) {
        alert("Lỗi không thể xóa do bộ môn hiện tại đã có dữ liệu liên quan")
      }
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
