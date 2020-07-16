import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {SubjectsService} from "../../../shared/_service/subjects.service";
import {Subjects} from "../../../shared/_models/subjects";
import {AddSubjectsComponent} from "./add-subjects/add-subjects.component";
import {EditSubjectsComponent} from "./edit-subjects/edit-subjects.component";
import {DeleteSubjectsComponent} from "./delete-subjects/delete-subjects.component";

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit, OnDestroy {
  subjects: any = []; /// mảng chứa dữ liệu từ api đưa lên dataTable

  @ViewChild(DataTableDirective, {static: false}) // khai bao cac tuy chon cua dataTable
  dtElement: DataTableDirective;
  dataTableOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  bsModalRef: BsModalRef;       // modal

  constructor(
    private subjectsService: SubjectsService,
    public modalService: BsModalService
  ) {
  }

  ngOnInit(): void {
    this.dataTableOptions = {
      pagingType: 'full_numbers'
    };
    this.loadSujects();
  }

  private loadSujects() {
    return this.subjectsService.getSubjects().subscribe((data: Subjects[]) => {
        this.subjects = data;
        this.dtTrigger.next();
      }, error1 => alert("Lỗi load serve, đề f5 lại trang web")
    )
  }

  /**
   * khi click vao cac button crud se goi den ham reload
   * document : https://viblo.asia/p/rxjs-voi-angular-subscribe-va-unsubscribe-observable-Do754kQ0lM6
   */
  private reload() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.loadSujects();
    });
  }

  openModalAdd() {
    this.bsModalRef = this.modalService.show(AddSubjectsComponent);

    this.bsModalRef.content.onClose.subscribe(result => { // component cha tiếp tục lắng nghe sự kiện từ component con, nếu thực hiện crud sẽ truyền về 1 v và thực hiện reload
      if (result) {
        this.reload();
      } else {
        alert("Thêm thất bại do mã bộ môn hoặc tên bộ môn đã tồn tại")
      }
    })

  }

  openModalEdit(event: Event) {
    const id = (event.target as Element).id;
    const initialState = {
      idsubject: id
    };
    this.bsModalRef = this.modalService.show(EditSubjectsComponent, {initialState});

    this.bsModalRef.content.onClose.subscribe(result => { // component cha tiếp tục lắng nghe sự kiện từ component con, nếu thực hiện crud sẽ truyền về 1 v và thực hiện reload
      if (result) {
        this.reload();
      } else if (!result) {
        alert("Lỗi tên môn học và môn học không được trùng nhau");
      }
    })
  }

  openModalDelete(event: Event) {
    const id = (event.target as Element).getAttribute('name');
    const initialState = {
      idSubject: id,
    };
    this.bsModalRef = this.modalService.show(DeleteSubjectsComponent, {initialState});

    this.bsModalRef.content.onClose.subscribe(result => { // component cha tiếp tục lắng nghe sự kiện từ component con, nếu thực hiện crud sẽ truyền về 1 v và thực hiện reload
      if (result) {
        this.reload();
      } else if (!result) {
        alert("Lỗi không thể xóa môn học hiện tại đã có dữ liệu liên quan")
      }
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}
