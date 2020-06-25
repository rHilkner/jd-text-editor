export abstract class DynamicComponent {
    abstract dynamicOnMount(attrs?: Map<string, string>, content?: string, element?: Element): void;
}
