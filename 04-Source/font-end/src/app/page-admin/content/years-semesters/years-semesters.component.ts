import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {YearsSemesterService} from '../../../shared/_service/years-semester.service';
import {DataTableDirective} from "angular-datatables";
import {AddDepartmentComponent} from "../department/add-department/add-department.component";
import {AddYearsSemestersComponent} from "./add-years-semesters/add-years-semesters.component";
import {EditDepartmentComponent} from "../department/edit-department/edit-department.component";
import {DeleteDepartmentComponent} from "../department/delete-department/delete-department.component";
import {EditYearsSemestersComponent} from "./edit-years-semesters/edit-years-semesters.component";
import {DeleteYearsSemestersComponent} from "./delete-years-semesters/delete-years-semesters.component";


@Component({
  selector: 'app-years-semesters',
  templateUrl: './years-semesters.component.html',
  styleUrls: ['./years-semesters.component.css']
})
export class YearsSemestersComponent implements OnInit, OnDestroy {
  listYearsSemesters: any = [];

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dataTableOptions: DataTables.Settings = {}; // tùy chọn của Datatable
  dtTrigger = new Subject();

  bsModalRef: BsModalRef;

  constructor(
    public modalService: BsModalService,
    public yearsSemesterService: YearsSemesterService
  ) {
  }

  ngOnInit(): void {
    this.dataTableOptions = {
      pagingType: 'full_numbers',
    };
    this.loadAllYearsSemester();
  }

  loadAllYearsSemester() {
    return this.yearsSemesterService.getAllYearsSemester().subscribe((data: {}) => {
      this.listYearsSemesters = data;
      this.listYearsSemesters.map(object => {
        /**
         * duyệt danh sách trả về . Hiện tại năm có dạng 2019 -> cộng thêm chuỗi  - 2020 vào mỗi bản ghi
         *
         * ex : years = 2019 => dữ liệu hiển thị sẽ thành 2019 - 2020
         */
        object.year = object.year + '-' + `${object.year + 1}`;

        /**
         * Chuyển đổi dữ liệu từ dạng yyyy/mm/dd của serve gửi lên thành dạng dd/mm/yyyy để hiển thị lên giao diện
         *
         */
        // tslint:disable-next-line:max-line-length
        if (object.startDate != null) {
          const startDateArr = object.startDate.split('-');
          // tslint:disable-next-line:max-line-length
          // cắt chuỗi yyyy-mm-dd thành mảng startDateArr = [yyyy,mm,dd]
          object.startDate = startDateArr[2] + '/' + startDateArr[1] + '/' + startDateArr[0];       // set lại giá trị của startDate = dd/mm/yyyy
        }
      });
      this.dtTrigger.next();
    });
  }

  openModalAdd() {
    this.bsModalRef = this.modalService.show(AddYearsSemestersComponent);

    this.bsModalRef.content.onClose.subscribe(result => { // component cha tiếp tục lắng nghe sự kiện từ component con, nếu thực hiện crud sẽ truyền về 1 v và thực hiện reload
      if (result) {
        this.reload();
      }  else if (!result) {
        alert("Lỗi năm học - học kỳ không được trùng nhau");
      }
    })
  }

  openModalEdit(event: Event) {
    const id = (event.target as Element).id;
    const initialState = {
      idYearSemester: id
    };
    this.bsModalRef = this.modalService.show(EditYearsSemestersComponent, {initialState});

    this.bsModalRef.content.onClose.subscribe(result => { // component cha tiếp tục lắng nghe sự kiện từ component con, nếu thực hiện crud sẽ truyền về 1 v và thực hiện reload
      if (result) {
        this.reload();
      } else if (!result) {
        alert("Lỗi năm học - học kỳ không được trùng nhau");
      }
    })
  }

  openModalDelete(event: Event) {
    const id = (event.target as Element).getAttribute('name');
    const initialState = {
      idYearSemester: id
    };
    this.bsModalRef = this.modalService.show(DeleteYearsSemestersComponent, {initialState});

    this.bsModalRef.content.onClose.subscribe(result => { // component cha tiếp tục lắng nghe sự kiện từ component con, nếu thực hiện crud sẽ truyền về 1 v và thực hiện reload
      if (result) {
        this.reload();
      }else if (!result) {
        alert("Học kỳ muốn xóa hiện đã có dữ liệu không thể xóa");
      }
    })
  }

  private reload() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.loadAllYearsSemester()
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}
