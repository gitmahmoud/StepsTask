import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';
import { Step } from '../Models/step'
import { Item } from '../Models/item';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  steps: Step[] = [];
  endpointUrl = "Steps";

  constructor(public dataService: DataService) { }
  ngOnInit() {
    this.GetSteps();
  }
  GetSteps() {
    this.dataService.Get(this.endpointUrl)
      .subscribe(response => {
        this.steps = <Step[]>response;
      }, error => {
        alert(error);

      });
  }

  Delete(id) {
    this.dataService.Delete(this.endpointUrl, id)
      .subscribe(response => {
        this.GetSteps();
      }, error => {
        alert(error);
      });
  }

  Create() {

    let step: Step = this.CreateStep();

    this.dataService.Post(this.endpointUrl, step)
      .subscribe(response => {
        this.GetSteps();
      }, error => {
        alert(error);
      });
  }

  private CreateStep() {

    let step: Step;

    step = { id: 0, stepName: "Step", items: [] };
    this.steps.push(step);

    return step;
  }

  CreateItem(step: Step) {
    let stepIndex = this.steps.indexOf(step);

    let item: Item = { id: 0, title: '', description: '', stepId: step.id };

    if (this.steps[stepIndex].items && this.steps[stepIndex].items.length > 0)
      this.steps[stepIndex].items.push(item);
    else {

      let items: Item[] = [item];
      this.steps[stepIndex].items = items;

    }
  }

  ItemSaved() {
    this.GetSteps();
  }
}

