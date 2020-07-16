import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {SubjectsService} from "../../../shared/_service/subjects.service";
import {Subjects} from "../../../shared/_models/subjects";
import {AddSubjectsComponent} from "./add-subjects/add-subjects.component";

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit, OnDestroy {
  subjects: any = [];

  @ViewChild(DataTableDirective, {static: false}) // khai bao cac tuy chon cua dataTable
  dtElement: DataTableDirective;
  dataTableOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  bsModalRef: BsModalRef;

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
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}
