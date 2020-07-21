import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {CategoriesService} from "../../../shared/_service/categories.service";
import {AddCategoryComponent} from "./add-category/add-category.component";
import {EditCategoryComponent} from "./edit-category/edit-category.component";
import {DeleteCategoryComponent} from "./delete-category/delete-category.component";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
  listCategories: any = [];

  @ViewChild(DataTableDirective, {static: false}) // khai bao cac tuy chon cua dataTable
  dtElement: DataTableDirective;
  dataTableOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  bsModalRef: BsModalRef;                         // bắt sự kiện show , ẩn các modal

  constructor(
    private categoriesService: CategoriesService,
    public modalService: BsModalService,
  ) {
  }

  ngOnInit(): void {
    this.loadAllCategories();
  }

  private loadAllCategories() {
    return this.categoriesService.getAllCategories().subscribe((data: {}) => {
      this.listCategories = data;
      this.dtTrigger.next();
    });
  }


  private reload() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.loadAllCategories();
    });
  }

  openModalAdd() {
    this.bsModalRef = this.modalService.show(AddCategoryComponent);

    this.bsModalRef.content.onClose.subscribe(result => { // component cha tiếp tục lắng nghe sự kiện từ component con, nếu thực hiện crud sẽ truyền về 1 v và thực hiện reload
      if (result) {
        this.reload();
      } else if (!result) {
        alert("Mã thể loại và tên thể loại phải là duy nhất")
      }
    })
  }

  openModalEdit(event: Event) {
    const id = (event.target as Element).id;
    const initialState = {
      idCategories: id
    };
    this.bsModalRef = this.modalService.show(EditCategoryComponent, {initialState});

    this.bsModalRef.content.onClose.subscribe(result => { // component cha tiếp tục lắng nghe sự kiện từ component con, nếu thực hiện crud sẽ truyền về 1 v và thực hiện reload
      if (result) {
        this.reload();
      } else if (!result) {
        alert("Mã thể loại và tên thể loại phải là duy nhất")
      }
    })
  }

  openModalDelete(event: Event) {
    const id = (event.target as Element).getAttribute('name');
    const initialState = {
      idCategories: id
    };
    this.bsModalRef = this.modalService.show(DeleteCategoryComponent, {initialState});

    this.bsModalRef.content.onClose.subscribe(result => { // component cha tiếp tục lắng nghe sự kiện từ component con, nếu thực hiện crud sẽ truyền về 1 v và thực hiện reload
      if (result) {
        this.reload();
      } else if (!result) {
        alert("Lỗi không thể xóa thể loại hiện tại đã có dữ liệu liên quan")
      }
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}
