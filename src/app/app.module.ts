import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GreenTextComponent } from './green-text/green-text.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { DynamicHTMLModule } from './dynamic-html/dynamic-html.index';

@NgModule({
    declarations: [
        AppComponent,
        GreenTextComponent,
        SafeHtmlPipe
    ],
    imports: [
        BrowserModule,
        DynamicHTMLModule.forRoot({
            components: [
                {component: GreenTextComponent, selector: 'app-green-text'}
            ]
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
