import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Select2OptionData} from "ng-select2";
import {DataConvertSelect2} from "../../../shared/_models/constant";
import {Options} from 'select2';
import {RoleService} from "../../../shared/_service/role.service";
import {UserService} from "../../../shared/_service/user.service";
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {DetailUserComponent} from "./detail-user/detail-user.component";
import {AddUserComponent} from "./add-user/add-user.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  roles: any = [];      // chứa danh sách role
  users: any = [];        // chứa danh sách user từ api
  dataForTable: any = []; // chứa dữ liệu để đưa lên table

  dataSelect2: Array<Select2OptionData>;
  option: Options;
  dataConvert: DataConvertSelect2;

  @ViewChild(DataTableDirective, {static: false}) // khai bao cac tuy chon cua dataTable
  dtElement: DataTableDirective;
  dataTableOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  bsModalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private roleService: RoleService,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.dataTableOptions = {
      pagingType: 'full_numbers'
    };
    this.setDataSelectRole();
    this.getUsers();
  }

  // lấy danh sách user từ serve đưa lên table
  getUsers() {
    this.userService.getUsers().subscribe((data) => {
        this.users = data;
        this.dataForTable = data;
        this.dtTrigger.next();
      },
      error1 => {
        alert("Lỗi tải dữ liệu từ server, đề nghị tải lại trang")
      }
    )

  }


  openModalDetail(event: Event) {
    let id = (event.target as Element).id;
    let idRole = (event.target as Element).getAttribute("name");
    console.log(idRole);
    const initialState = {
      idRole: idRole,
      idUser: id,
    };
    this.bsModalRef = this.modalService.show(DetailUserComponent, {initialState});

    this.bsModalRef.content.onClose.subscribe(result => { // component cha tiếp tục lắng nghe sự kiện từ component con, nếu thực hiện crud sẽ truyền về 1 v và thực hiện reload
      if (result) {
        console.log("ok")
      } else if (!result) {
        alert('Lỗi tải dữ liệu từ serve, đề nghị tải lại trang');
      }
    });
  }

  openModalAdd() {
    this.bsModalRef = this.modalService.show(AddUserComponent);
    this.bsModalRef.content.onClose.subscribe(result => {
      if (result) {
        this.reload();
      } else if (!result) {
        alert('Lỗi khi thêm dữ liệu vào serve, hoặc do người dùng đã tồn tại, đề nghị thực hiện lại');
      }
    })
  }

  // khi click vào các vai trò khác nhua sẽ show lên danh sách user thep vao trò đó
  onChangeSelect2(id: any) {
    this.dataForTable = [];
    if (id != undefined) {
      if (id == 'all') {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dataForTable = this.users;
          this.dtTrigger.next();
        });
      } else {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.users.map(user => {
            if (user.roleId == id) {
              this.dataForTable.push(user);
            }
          });
          this.dtTrigger.next();
        });
      }
    }
  }

  setDataSelectRole() {
    this.option = {
      theme: 'classic',
      width: '100%',
      placeholder: 'Tất cả',
    };
    let dataAdapterArray = [];
    this.roleService.getRoles().subscribe((data: any) => {
        this.roles = data;
        this.roles.map(role => {
            if (role.roleName != "Admin") {
              this.dataConvert = new DataConvertSelect2();
              this.dataConvert.id = role.id;
              this.dataConvert.text = role.roleName;
              dataAdapterArray.push(this.dataConvert);
            }
          }
          // @ts-ignore
        );
        dataAdapterArray.push(new DataConvertSelect2("all", "Tất cả"));
        this.dataSelect2 = dataAdapterArray;
      },
      error1 => {
        alert("Lỗi tải data từ serve, đề nghị tải lại trang");
      }
    )
  }

  private reload() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.getUsers();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
