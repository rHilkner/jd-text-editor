import { Component, DoCheck, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, } from '@angular/core';

import { DynamicHTMLRef, DynamicHTMLRenderer } from './dynamic-html.renderer';
import { DataService } from '../data.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'dynamic-html',
    template: '',
})
export class DynamicHTMLComponent implements DoCheck, OnChanges, OnDestroy {

    @Input() content: string;
    @Output() contentChanged = new EventEmitter();

    oldContent = '';

    private ref: DynamicHTMLRef = null;

    constructor(
        private renderer: DynamicHTMLRenderer,
        private elementRef: ElementRef,
        private dataService: DataService
    ) { }

    ngOnChanges(_: SimpleChanges) {
        if (this.ref) {
            this.ref.destroy();
            this.ref = null;
        }

        if (this.content && this.elementRef) {
            this.ref = this.renderer.renderInnerHTML(this.elementRef, this.content);
        }

        this.emitContent();
    }

    ngDoCheck() {
        if (this.ref) {
            this.ref.check();
        }
        this.emitContent();
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.destroy();
            this.ref = null;
        }
    }

    emitContent() {
        if (this.content && this.elementRef) {
            const newContent = this.dataService.buildFullHtml(this.content);
            if (newContent !== this.oldContent) {
                this.contentChanged.emit(this.content);
                this.oldContent = newContent;
            }
        }
    }

}
