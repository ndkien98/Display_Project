import { Component, OnInit } from '@angular/core';
import {Categories} from "../../../../shared/_models/categories";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {CategoriesService} from "../../../../shared/_service/categories.service";
import {BsModalRef} from "ngx-bootstrap/modal";
import {reload} from "../../../../shared/_models/constant";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  categories: Categories;
  categoriesFormGroup: FormGroup;     // formgroup để chứa các formcontroll
  public onClose: Subject<boolean>;

  idCategories: any;

  constructor(
    private categoriesService: CategoriesService,
    public bsModalRef: BsModalRef,    // thực hiện mở và đóng modal
    private formBuilder: FormBuilder, // tạo ra các formgroup và fromcontroll
  ) {

  }

  public onSubmit() {
    this.categories.categoryCode = this.categoriesFormGroup.controls.code.value; // gán dữ liệu của các trường vào trong đối tượng
    this.categories.categoryName= this.categoriesFormGroup.controls.name.value;
    this.categoriesService.editCategories(this.categories).subscribe(
      (data: boolean) => {
        this.onClose.next(reload);                                           // khi click submit sẽ gửi 1 biến về component list cha để check xem đã insert thành công chưa, nếu thành công là true sẽ thực hiện reload danh sách
        this.bsModalRef.hide();                                                    // ẩn đi modal thêm bộ môn
        this.categories.categoryName = '';
        this.categories.categoryCode = '';
      },
      error1 => {
        this.onClose.next(!reload);                                           // khi click submit sẽ gửi 1 biến về component list cha để check xem đã insert thành công chưa, nếu thành công là true sẽ thực hiện reload danh sách
        this.bsModalRef.hide();
      }
    );
  }

  ngOnInit(): void {
    this.categories = new Categories();
    this.createForm();
    this.onClose = new Subject();
  }

  /**
   * Khởi tạo form
   * 1 form group sẽ chứa nhiều formcontroll là các form con
   */
  private createForm() {
    this.categoriesFormGroup = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      name: ['', Validators.required]
    });
    this.categoriesService.findCategoriesById(this.idCategories).subscribe((data) => {
      this.categories = data;
      this.categoriesFormGroup.patchValue({
        code: this.categories.categoryCode,
        name: this.categories.categoryName,
      })
    },
      error1 => {
        alert("Lỗi load data từ server đề nghỉ reload lại trang");
        this.bsModalRef.hide();
      }
    )
  }
}
