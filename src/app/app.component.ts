import { AfterViewInit, Component, ComponentFactoryResolver, ElementRef, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { GreenTextComponent } from './green-text/green-text.component';
import { DynamicHTMLComponent } from './dynamic-html/dynamic-html.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

    content = `<p>This is a paragraph... And this is a <app-green-text #dynamicComponent fieldId="abc" text="green text" (contentChanged)="greenTextContentChanged($event)"></app-green-text></p>`;

    @ViewChild(DynamicHTMLComponent) myRef: DynamicHTMLComponent;

    constructor() {}

    ngAfterViewInit(): void {
        // const factory = this.componentFactoryResolver.resolveComponentFactory(GreenTextComponent);
        // const ref2 = factory.create(this.injector);
        // const ref = this.myRef.createComponent(factory);
        // ref2.changeDetectorRef.detectChanges();
    }

    contentChanged(newContent: string) {
        console.log(newContent);
    }

}
