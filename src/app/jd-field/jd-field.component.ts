import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { DynamicComponent } from '../dynamic-html/dynamic-html.interfaces';
import { JdField } from '../models/jd-field.model';
import { DataService } from '../data.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'jd-field',
    templateUrl: './jd-field.component.html',
    styleUrls: ['./jd-field.component.scss']
})
export class JdFieldComponent implements DynamicComponent {

    constructor(private eRef: ElementRef,
                private dataService: DataService) {}

    @Input() id: string;
    @Input() title: string;
    @Input() value: string;
    @Input() order: number;

    private originalValue: string;

    onMount(attrs?: Map<string, string>, content?: string, element?: Element): void {
        this.id = attrs.get('id');
        this.title = attrs.get('title');
        this.value = attrs.get('value');
        this.order = Number(attrs.get('order'));
        this.originalValue = this.value;
        this.dataService.addJdFieldComponent(this);
        this.dataService.emitJdFields();
    }

    get jdField() {
        const jdField = new JdField();
        jdField.id = this.id;
        jdField.title = this.title;
        jdField.value = this.value;
        jdField.order = this.order;
        return jdField;
    }

    setNewValue(newValue: string) {
        if (this.value !== newValue) {
            this.value = newValue;
            this.dataService.emitJdFields();
        }
    }

    @HostListener('document:click', ['$event'])
    clickout(event) {
        if (this.eRef.nativeElement.contains(event.target)) {
            this.setNewValue('Ronaldo');
        } else {
            this.setNewValue(this.originalValue);
        }
    }

    buildHtmlString() {
        const tagName = this.eRef.nativeElement.tagName;
        return `<` + tagName +
            ` id="` + this.jdField.id + `"` +
            ` title="` + this.jdField.title + `"` +
            ` value="` + this.jdField.value + `">` +
            ` order="` + this.jdField.order + `">` +
            `</` + tagName + `>`;
    }
}
