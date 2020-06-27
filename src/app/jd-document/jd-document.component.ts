import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DynamicHTMLComponent } from '../dynamic-html/dynamic-html.component';
import { JdFieldComponent } from '../jd-field/jd-field.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-jd-document',
  templateUrl: './jd-document.component.html',
  styleUrls: ['./jd-document.component.scss']
})
export class JdDocumentComponent implements AfterViewInit {

  @ViewChild(DynamicHTMLComponent) myRef: DynamicHTMLComponent;
  @ViewChildren(JdFieldComponent) jdFieldComponentList: QueryList<JdFieldComponent>;

  constructor(private getJdHtmlService: DataService) {}

  ngAfterViewInit(): void {
    console.log(this.jdFieldComponentList);
  }

  contentChanged(newContent: string) {
    console.log(newContent);
  }

  getJdHtmlContent(): string {
    return this.getJdHtmlService.getJdHtml();
  }

}
