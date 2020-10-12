import { Injectable, ModuleWithProviders,  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from './store.service';

interface StoreItemsInterface {
  initialState: Record<string, any>;
  key: string;
}

class StoreExtension<T> extends Store<T> {
  constructor(initialState: T) {
    super(initialState);
  }
}

@NgModule()
export class StoreModule {

  static forRoot(items: StoreItemsInterface[]): ModuleWithProviders<StoreModule> {
      return {
        ngModule: StoreModule,
        providers: [
          { provide: Store, useValue: new StoreExtension(combineStates(items)) }
        ]
    };
  }
}

function combineStates(items: StoreItemsInterface[]): Record<string, any> {
  const state: Record<string, any> = {};
  items.forEach(item => state[item.key] = item.initialState);
  return state;
}
