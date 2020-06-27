import { Injectable } from '@angular/core';
import { JdFieldComponent } from './jd-field/jd-field.component';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private jdFields: JdFieldComponent[];

    constructor() { }

    public getJdHtml(): string {
        // tslint:disable-next-line:max-line-length
        // return `<p>This is a paragraph... And this is a <app-green-text #dynamicComponent fieldId="abc" text="green text" (contentChanged)="greenTextContentChanged($event)"></app-green-text></p>`;
        return `<p>Hello my name is <jd-field id="1" title="First name" value="Rodrigo" #dynamicComponent (contentChanged)="jdHtmlContentChanged($event)"></jd-field></p>`;
    }

    addJdField(jdField: JdFieldComponent) {
        for (const jf of this.jdFields) {
            if (jf.id === jdField.id) {
                return;
            }
        }
        this.jdFields.push(jdField);
    }

    getJdFields(): JdFieldComponent[] {
        return this.jdFields;
    }

}
