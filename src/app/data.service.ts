import { Injectable } from '@angular/core';
import { JdFieldComponent } from './jd-field/jd-field.component';
import { BehaviorSubject, range } from 'rxjs';
import { JdField } from './models/jd-field.model';
import { JdDocumentComponent } from './jd-document/jd-document.component';
import { Util } from './util/util';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    // tslint:disable-next-line:variable-name
    private _jdFields = new BehaviorSubject<JdField[]>([]);
    private jdFieldComponents: { [id: string]: JdFieldComponent } = {};
    private jdDocumentComponent: JdDocumentComponent;
    private documentContents = '';
    private shouldPersistDocContents = true;

    constructor() {
        this.persistDocumentContents().then(() => console.log('assdaasdasds'));
    }

    updateDocumentContents(documentContents) {
        this.documentContents = documentContents;
    }

    async persistDocumentContents() {
        console.log('Starting async thread to persist document contents every 10 seconds');
        while (true) {
            if (this.shouldPersistDocContents) {
                console.log('Saving data on backend: \n' + this.documentContents);
            }
            await Util.sleep(10000);
        }
    }

    stopPersistingDocumentContents() {
        this.shouldPersistDocContents = false;
    }

    get jdHtml(): string {
        // tslint:disable-next-line:max-line-length
        // return `<p>This is a paragraph... And this is a <app-green-text #dynamicComponent fieldId="abc" text="green text" (contentChanged)="greenTextContentChanged($event)"></app-green-text></p>`;
        return `<p>Hello my name is <jd-field id="1" title="First name" value="Rodrigo" order="1" #dynamicComponent (contentChanged)="jdHtmlContentChanged($event)"></jd-field> and I am <jd-field id="2" title="Age" value="25" order="2" #dynamicComponent (contentChanged)="jdHtmlContentChanged($event)"></jd-field> years old</p><br>`
            + `<p>Hello my name is <app-green-text id="'1'" title="'First name'" text="'Rodreras'" #dynamicComponent (contentChanged)="jdHtmlContentChanged($event)"></app-green-text></p>`;
    }

    get jdFieldsObservable() {
        return this._jdFields.asObservable();
    }

    addJdFieldComponent(jdFieldComponent: JdFieldComponent) {
        this.jdFieldComponents[jdFieldComponent.id] = jdFieldComponent;
    }

    get jdFields(): JdField[] {
        const jdFields = Object.assign([], Object.keys(this.jdFieldComponents).map(k => this.jdFieldComponents[k].jdField)) as JdField[];
        jdFields.sort((a, b) => a.order - b.order);
        return jdFields;
    }

    emitJdFields() {
        this._jdFields.next(this.jdFields);
    }

    buildFullHtml(domHtml: string): string {
        const doc = new DOMParser().parseFromString(domHtml, 'text/html');
        const jdFieldElements = doc.getElementsByTagName('jd-field');
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < jdFieldElements.length; i++) {
            const jdFieldElem = jdFieldElements[i];
            const fieldId = jdFieldElem.getAttribute('id');
            const jdFieldComponent = this.jdFieldComponents[fieldId];
            jdFieldElem.innerHTML = jdFieldComponent.componentAsHtml;
        }
        return doc.body.innerHTML;
    }
}
