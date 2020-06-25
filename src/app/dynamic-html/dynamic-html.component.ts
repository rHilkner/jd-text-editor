import {
    Component,
    ElementRef,
    Input,
    SimpleChanges,
    OnChanges,
    OnDestroy,
    DoCheck, Output, EventEmitter,
} from '@angular/core';

import { DynamicHTMLRenderer, DynamicHTMLRef } from './dynamic-html.renderer';

@Component({
    selector: 'app-dynamic-html',
    template: '',
})
export class DynamicHTMLComponent implements DoCheck, OnChanges, OnDestroy {
    @Input() content: string;
    @Output() contentChanged = new EventEmitter();

    private ref: DynamicHTMLRef = null;

    constructor(
        private renderer: DynamicHTMLRenderer,
        private elementRef: ElementRef,
    ) { }

    ngOnChanges(_: SimpleChanges) {
        if (this.ref) {
            this.ref.destroy();
            this.ref = null;
        }

        if (this.content && this.elementRef) {
            this.ref = this.renderer.renderInnerHTML(this.elementRef, this.content);
        }

        this.contentChanged.emit(this.content);
    }

    ngDoCheck() {
        if (this.ref) {
            this.ref.check();
        }
        this.contentChanged.emit(this.elementRef.nativeElement.innerHTML);
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.destroy();
            this.ref = null;
        }
    }
}
