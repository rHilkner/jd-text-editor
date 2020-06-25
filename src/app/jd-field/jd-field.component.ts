import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DynamicComponent } from '../dynamic-html/dynamic-html.interfaces';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'jd-field',
    templateUrl: './jd-field.component.html',
    styleUrls: ['./jd-field.component.scss']
})
export class JdFieldComponent implements DynamicComponent {

    @Input() id: string;
    @Input() title: string;
    @Input() value: string;
    @Output() contentChanged = new EventEmitter();

    constructor() {}

    dynamicOnMount(attrs?: Map<string, string>, content?: string, element?: Element): void {
        this.id = attrs.get('id');
        this.title = attrs.get('title');
        this.value = attrs.get('value');
    }

}
