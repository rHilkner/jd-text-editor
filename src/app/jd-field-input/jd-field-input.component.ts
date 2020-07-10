import { Component, Input, OnInit } from '@angular/core';
import { JdField } from '../models/jd-field.model';

@Component({
  selector: 'app-jd-field-input',
  templateUrl: './jd-field-input.component.html',
  styleUrls: ['./jd-field-input.component.scss']
})
export class JdFieldInputComponent implements OnInit {

  @Input() jdField: JdField;

  constructor() { }

  ngOnInit(): void {
  }

}
