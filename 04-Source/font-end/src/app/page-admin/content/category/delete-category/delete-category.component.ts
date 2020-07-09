import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {BsModalRef} from "ngx-bootstrap/modal";
import {reload} from "../../../../shared/_models/constant";
import {Categories} from "../../../../shared/_models/categories";
import {CategoriesService} from "../../../../shared/_service/categories.service";

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {
  categories: Categories;
  idCategories: string;
  public onClose: Subject<boolean>;

  constructor(
    public categoriesService: CategoriesService,
    public bsModalRef: BsModalRef,
  ) {
  }

  ngOnInit(): void {
    this.categories = new Categories();
    this.setData();
    this.onClose = new Subject();
  }

  private setData() {
    this.categoriesService.findCategoriesById(this.idCategories).subscribe((data: Categories) => {
        this.categories = data;
      },
      error1 => {
        alert("Lỗi load data từ server đề nghỉ reload lại trang");
        this.bsModalRef.hide();
      });
  }

  delete() {
    this.categoriesService.deleteCategories(this.idCategories).subscribe((data: boolean) => {
        this.onClose.next(reload);
        this.bsModalRef.hide();
      },
      error1 => {
        this.onClose.next(!reload);
        this.bsModalRef.hide();
      }
    );
  }
}
