import { DynamicHtmlService } from './dynamic-html.service';

export abstract class DynamicComponent {

    // protected constructor(private dynamicHtmlService: DynamicHtmlService) {
    //     dynamicHtmlService.addDynamicComponent(this);
    // }

    abstract onMount(attrs?: Map<string, string>, content?: string, element?: Element): void;
    abstract get componentAsHtml(): string;
    abstract get dynamicComponentId(): string;
}
