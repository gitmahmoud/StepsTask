import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '../Models/item';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'Item',
  templateUrl: './Item.component.html',
  styleUrls: ['./Item.component.css']
})
export class ItemComponent implements OnInit {

  ItemForm: FormGroup;
  formErrors: any;
  validationMessages: any;
  endpointUrl = "Items";


  @Output() saved = new EventEmitter<any>();
  @Input() itemData: Item;

  constructor(
    public formBuilder: FormBuilder,
    public dataService: DataService
  ) { }


  ngOnInit(): void {

    this.createForm();

    this.setFormValues();
  }

  createForm() {
    this.ItemForm = this.formBuilder.group({
      title: [""],
      description: [""],
      StepId: [""]
    });
    this.formErrors = {
    };

    this.validationMessages = {
    };
  }

  setFormValues() {

      this.ItemForm.patchValue({
        title: this.itemData.title,
        description: this.itemData.description,
        stepId: this.itemData.stepId,
      });
    }

  onSubmit() {

    if (!this.ItemForm.valid) {
      alert(' data not valid');
      return;
    }

    this.Save();
  }



  Save() {

    this.ItemForm.controls.StepId.setValue(this.itemData.stepId);     
  
      this.dataService.Post(this.endpointUrl, this.ItemForm.value)
        .subscribe(response => {
          this.saved.emit(this.ItemForm.value);  
        }, error => {
          alert(error);
        });
    
  }

}
