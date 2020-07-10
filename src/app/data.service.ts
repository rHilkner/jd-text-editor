import { Injectable } from '@angular/core';
import { JdFieldComponent } from './jd-field/jd-field.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { JdField } from './models/jd-field.model';
import { timeout } from 'rxjs/operators';
import { compareNumbers } from '@angular/compiler-cli/src/diagnostics/typescript_version';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    // tslint:disable-next-line:variable-name
    private _jdFields = new BehaviorSubject<JdField[]>([]);
    private jdFieldComponents: { [id: string]: JdFieldComponent } = {};

    public getJdHtml(): string {
        // tslint:disable-next-line:max-line-length
        // return `<p>This is a paragraph... And this is a <app-green-text #dynamicComponent fieldId="abc" text="green text" (contentChanged)="greenTextContentChanged($event)"></app-green-text></p>`;
        // return `<p>Hello my name is <jd-field id="'1'" title="'First name'" value="'Rodrigo'" order="1" #dynamicComponent (contentChanged)="jdHtmlContentChanged($event)"></jd-field></p>`;
        return `<p>Hello my name is <app-green-text id="'1'" title="'First name'" text="'123123'" #dynamicComponent (contentChanged)="jdHtmlContentChanged($event)"></app-green-text></p>`;
    }

    get jdFieldsObservable() {
        return this._jdFields.asObservable();
    }

    addJdFieldComponent(jdFieldComponent: JdFieldComponent) {
        this.jdFieldComponents[jdFieldComponent.id] = jdFieldComponent;
    }

    get jdFields(): JdField[] {
        const jdFields = Object.assign({}, Object.keys(this.jdFieldComponents).map(k => this.jdFieldComponents[k].jdField));
        jdFields.sort((a, b) => a.order === b.order ? 0 : a.order > b.order ? 1 : -1);
        return jdFields;
    }

    emitJdFields() {
        this._jdFields.next(this.jdFields);
    }
}
