import { Component, DoCheck, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, } from '@angular/core';

import { DynamicHTMLRef, DynamicHTMLRenderer } from './dynamic-html.renderer';

@Component({
    selector: 'app-dynamic-html',
    template: '',
})
export class DynamicHTMLComponent implements DoCheck, OnInit, OnChanges, OnDestroy {

    @Input() content: string;
    @Output() contentChanged = new EventEmitter();

    oldContent: string;

    private ref: DynamicHTMLRef = null;

    constructor(
        private renderer: DynamicHTMLRenderer,
        private elementRef: ElementRef,
    ) { }

    ngOnInit(): void {
        this.oldContent = this.content;
    }

    ngOnChanges(_: SimpleChanges) {
        if (this.ref) {
            this.ref.destroy();
            this.ref = null;
        }

        if (this.content && this.elementRef && this.content !== this.oldContent) {
            this.ref = this.renderer.renderInnerHTML(this.elementRef, this.content);
            this.contentChanged.emit(this.content);
        }
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

    emitContent() {
        if (this.content && this.elementRef && this.content !== this.oldContent) {
            this.contentChanged.emit(this.content);
        }
    }

}
