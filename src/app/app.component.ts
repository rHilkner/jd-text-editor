import { AfterViewInit, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DynamicHTMLComponent } from './dynamic-html/dynamic-html.component';
import { DataService } from './data.service';
import { JdFieldComponent } from './jd-field/jd-field.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

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
