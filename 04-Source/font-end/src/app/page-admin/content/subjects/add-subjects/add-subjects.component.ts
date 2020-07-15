import { Component, OnInit } from '@angular/core';
import {Subjects} from "../../../../shared/_models/subjects";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SubjectsService} from "../../../../shared/_service/subjects.service";
import {BsModalRef} from "ngx-bootstrap/modal";
import {Select2OptionData} from "ng-select2";
import { Options } from 'select2';
import {reload} from "../../../../shared/_models/constant";

@Component({
  selector: 'app-add-subjects',
  templateUrl: './add-subjects.component.html',
  styleUrls: ['./add-subjects.component.css']
})
export class AddSubjectsComponent implements OnInit {

  subject: Subjects;
  subjectFormGroup: FormGroup;
  // @ts-ignore
  public onClose: Subjects<boolean>;
  value: null;
  public exampleData: Array<Select2OptionData>;

  public data: any[] = [];
  public options: Options;


  constructor(
    private subjectService: SubjectsService,
    public bsModalRef: BsModalRef,
    public formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {
    this.subject = new Subjects();
    this.createForm();
    this.onClose = new Subjects();
    this.exampleData = [
      {
        id: 'basic1',
        text: 'Basic 1'
      },
      {
        id: 'basic2',
        disabled: true,
        text: 'Basic 2'
      },
      {
        id: 'basic3',
        text: 'Basic 3'
      },
      {
        id: 'basic4',
        text: 'Basic 4'
      }
    ];
    this.options = {
      theme: 'classic',
      width: '300',
    };
  }

  public createForm() {
    this.subjectFormGroup = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      name: ['', Validators.required],
      codeDepartMent: ['', Validators.required]
    });
  }

  onSubmit(){
    this.onClose.next(reload);
    this.bsModalRef.hide();
  }


}
