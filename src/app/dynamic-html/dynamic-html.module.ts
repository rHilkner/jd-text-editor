import { ANALYZE_FOR_ENTRY_COMPONENTS, ModuleWithProviders, NgModule } from '@angular/core';
import { DynamicHTMLComponent } from './dynamic-html.component';
import { DynamicHTMLOptions } from './dynamic-html.options';
import { DynamicHTMLRenderer } from './dynamic-html.renderer';

@NgModule({
  declarations: [DynamicHTMLComponent],
  exports: [DynamicHTMLComponent],
})
export class DynamicHTMLModule {
  static forRoot(options: DynamicHTMLOptions): ModuleWithProviders {
    return {
      ngModule: DynamicHTMLModule,
      providers: [
        DynamicHTMLRenderer,
        { provide: DynamicHTMLOptions, useValue: options },
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: options.components, multi: true },
      ],
    };
  }
}
