import { InjectionToken } from '@angular/core';
import { MgxLoaderComponent } from './loader.component';

/**
 * Injection token used to set the loader component that the directive will use
 */
export const MGX_LOADER_COMPONENT = new InjectionToken('mgx_loader_component', {
  factory: () => MgxLoaderComponent,
});

/**
 * Injection token used to set the display condition of the loader
 */
export const MGX_LOADER_CONDITION = new InjectionToken('mgx_loader_condition', {
  factory: () => ((value) => !!value) as MgxLoadingCondition<any>,
});

/**
 * Type used for the loader condition
 */
export type MgxLoadingCondition<T> = (value: T) => boolean;
