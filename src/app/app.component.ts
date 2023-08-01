import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule, AbstractControl, Form } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','./app.component.scss'],
})
export class AppComponent {
  submitted = false;
  title = 'bluSmart-task';
  tableHeaders = ['Product ID', 'Product Name', 'Brand', 'Qty', 'Unit', 'Category', 'Unit Cost', 'Total Cost', 'Product Type'];
  public serialNo !: FormArray<any>;
  public serialNo2!: FormArray<any>;
  public serialNo3!: FormArray<any>;
  public serialNo4!: FormArray<any>;
  noOfRowReq: number;
  submitForm !: FormGroup<any>;
  totalCost: number;
  totalCost2: number;

  constructor(private formbuilder: FormBuilder) {
    this.submitForm1();
  };

  submitForm1() {
    this.submitForm = this.formbuilder.group({
      productId: this.formbuilder.control(''),
      productName: this.formbuilder.control(''),
      brand: this.formbuilder.control(''),
      quantity: this.formbuilder.array([]),
      quantity2: this.formbuilder.array([]),
      quantity3: this.formbuilder.array([]),
      quantity4: this.formbuilder.array([]),
      unit: this.formbuilder.control('Piece'),
      category: this.formbuilder.control(''),
      unitCost: this.formbuilder.control('Rs.4500'),
      totalCost: this.formbuilder.control(''),
      productType: this.formbuilder.control('Spare Parts'),
    })
  }


  createSNoForm(): FormGroup {
    return this.formbuilder.group({
      serialNum: this.formbuilder.control(''),
    });
  }

  createSNoForm2(): FormGroup {
    return this.formbuilder.group({
      serialNum2: this.formbuilder.control(''),
    });
  }

  onchangeqty(item) {
    this.noOfRowReq = +item.target.value;
    this.serialNo = this.submitForm.get('quantity') as FormArray;
    while (this.serialNo.length < this.noOfRowReq) {
      this.serialNo.push(this.createSNoForm());
    }
    while (this.serialNo.length > this.noOfRowReq) {
      this.serialNo.removeAt(+this.serialNo.length - 1);
    }
    this.totalCost = ((this.serialNo.length) * (this.submitForm.value.unitCost).slice(3));
  }

  onchangeqty2(item) {
    this.noOfRowReq = +item.target.value;
    this.serialNo2 = this.submitForm.get('quantity2') as FormArray;
    while (this.serialNo2.length < this.noOfRowReq) {
      this.serialNo2.push(this.createSNoForm2());
    }
    while (this.serialNo2.length > this.noOfRowReq) {
      this.serialNo2.removeAt(+this.serialNo2.length - 1);
    }
    this.totalCost2 = ((this.serialNo2.length) * (this.submitForm.value.unitCost).slice(3));
  }

  submitFormDetails() {
    this.submitted = true;
    if (this.submitForm.invalid) {
      return;
    }
  }


  get serialNumDetails() {
    return this.submitForm.get('quantity') as FormArray;
  }

  get serialNumDetails2() {
    return this.submitForm.get('quantity2') as FormArray;
  }

  // Form Validations

  alphabetOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keycode;
    if (!((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8 || charCode == 32)) {
      return false;
    }
    return true;
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keycode;
    if (charCode > 32 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}

