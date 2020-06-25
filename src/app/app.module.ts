import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GreenTextComponent } from './green-text/green-text.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { DynamicHTMLModule } from './dynamic-html/dynamic-html.index';
import { JdFieldComponent } from './jd-field/jd-field.component';

@NgModule({
    declarations: [
        AppComponent,
        GreenTextComponent,
        SafeHtmlPipe,
        JdFieldComponent
    ],
    imports: [
        BrowserModule,
        DynamicHTMLModule.forRoot({
            components: [
                {component: GreenTextComponent, selector: 'app-green-text'},
                {component: JdFieldComponent, selector: 'jd-field'}
            ]
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
