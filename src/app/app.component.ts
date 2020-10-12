import { Component, VERSION } from '@angular/core';
import { StateInterface } from './state';
import { Store } from './store/store.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  constructor(private readonly store: Store<{ global: StateInterface }>) { }
}
