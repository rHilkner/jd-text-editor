import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { DynamicComponent } from '../dynamic-html/dynamic-html.interfaces';

@Component({
    selector: 'app-green-text',
    templateUrl: './green-text.component.html',
    styleUrls: ['./green-text.component.scss']
})
export class GreenTextComponent implements DynamicComponent {

    @Input() text: string;
    @Input() fieldId: string;
    @Output() contentChanged = new EventEmitter();

    constructor(private eRef: ElementRef) {}

    dynamicOnMount(attrs?: Map<string, string>, content?: string, element?: Element): void {
        this.text = attrs.get('text');
    }

    @HostListener('document:click', ['$event'])
    clickout(event) {
        if (this.eRef.nativeElement.contains(event.target)) {
            this.text = 'clicked inside';
        } else {
            this.text = 'clicked outside';
        }
    }
}
