import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DynamicHTMLComponent } from './dynamic-html/dynamic-html.component';
import { DataService } from './data.service';
import { JdFieldComponent } from './jd-field/jd-field.component';
import { JdField } from './models/jd-field.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

    @ViewChild(DynamicHTMLComponent) myRef: DynamicHTMLComponent;
    @ViewChildren(JdFieldComponent) jdFieldComponentList: QueryList<JdFieldComponent>;

    jdFields: JdField[];

    constructor(private dataService: DataService) {}

    ngOnInit(): void {
        this.dataService.jdFieldsObservable.subscribe(jdFields => {
            this.jdFields = jdFields;
            console.log(jdFields);
            console.log(this.jdFieldComponentList);
        });
    }

    ngAfterViewInit(): void {
    }

    contentChanged(newContent: string) {
        console.log(newContent);
    }

    getJdHtmlContent(): string {
        return this.dataService.getJdHtml();
    }
}
