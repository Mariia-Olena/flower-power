import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  myForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    age: new FormControl(0),
  })

  logForm() {
    console.log(this.myForm.value)
    console.log(this.myForm)
    console.log(this.myForm.controls['age'])

    if(this.myForm.valid) {
      alert('submit')
    }
  }
}
