import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { DynamicComponent } from '../dynamic-html/dynamic-html.interfaces';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'jd-field',
    templateUrl: './jd-field.component.html',
    styleUrls: ['./jd-field.component.scss']
})
export class JdFieldComponent implements DynamicComponent {

    constructor(private eRef: ElementRef) {}

    @Input() id: string;
    @Input() title: string;
    @Input() value: string;
    @Output() contentChanged = new EventEmitter();

    private originalValue: string;

    dynamicOnMount(attrs?: Map<string, string>, content?: string, element?: Element): void {
        this.id = attrs.get('id');
        this.title = attrs.get('title');
        this.value = attrs.get('value');
        this.originalValue = this.value;
    }

    setNewValue(newValue: string) {
        if (this.value !== newValue) {
            this.value = newValue;
            this.contentChanged.emit(this.buildHtmlString());
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
            ` id="` + this.id + `"` +
            ` title="` + this.title + `"` +
            ` value="` + this.value + `">` +
            `</` + tagName + `>`;
    }
}
