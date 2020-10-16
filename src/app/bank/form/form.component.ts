import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BankService } from '../bank.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  bankForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private bankService: BankService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let data = this.route.snapshot.data.item;
    console.log(data);
    this.bankForm = this.createForm(data);
  }

  createForm(data):FormGroup {
    return this.fb.group({
      name: data.name,
      image: data.image,
      separatetype: data.separatetype,
      separatechar:  data.separatechar,
      rows: this.fb.array(this.createRows(data))
    })
  }
  
  createRows(data): any[]{
    let rows = [];
    data.rows.forEach(row => {
      rows.push(this.fb.group({
        fields: this.fb.array(this.createFields(row))
      }))
    });
    return rows;
  }

  createFields(row): any[]{
    let fields = [];
    row.fields.forEach(field => {
      fields.push(this.fb.group({
        fieldname: field.fieldname,
        fieldtype: field.fieldtype,
        fieldlength: field.fieldlength,
        defaultvalue: field.defaultvalue,
        example: field.example
      }))
    });
    return fields;
  }

  getRows(){
    let rows = (this.bankForm.get("rows") as FormArray).controls;
    return rows;
  }

  getFields(row){
    let fields = (row.get("fields") as FormArray).controls;
    return fields
  }
  

  onSubmit() {
    alert('Thanks!');
  }
}
