import { Injectable } from '@angular/core';
import { DynamicComponent } from './dynamic-html.interfaces';

@Injectable({
    providedIn: 'root'
})
export class DynamicHtmlService {

    dynamicComponents: DynamicComponent[] = [];

    constructor() { }

    addDynamicComponent(dynamicComponent: DynamicComponent) {
        this.dynamicComponents.push(dynamicComponent);
    }
}
