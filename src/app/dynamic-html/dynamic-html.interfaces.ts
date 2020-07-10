export abstract class DynamicComponent {
    abstract onMount(attrs?: Map<string, string>, content?: string, element?: Element): void;
}
