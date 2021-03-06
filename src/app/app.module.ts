import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GreenTextComponent } from './green-text/green-text.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { DynamicHTMLModule } from './dynamic-html/dynamic-html.index';
import { JdFieldComponent } from './jd-field/jd-field.component';
import { JdDocumentComponent } from './jd-document/jd-document.component';
import { FlexModule } from '@angular/flex-layout';
import { JdFieldInputComponent } from './jd-field-input/jd-field-input.component';

@NgModule({
    declarations: [
        AppComponent,
        GreenTextComponent,
        SafeHtmlPipe,
        JdFieldComponent,
        JdDocumentComponent,
        JdFieldInputComponent
    ],
    imports: [
        BrowserModule,
        DynamicHTMLModule.forRoot({
            components: [
                {component: GreenTextComponent, selector: 'app-green-text'},
                {component: JdFieldComponent, selector: 'jd-field'}
            ]
        }),
        FlexModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
