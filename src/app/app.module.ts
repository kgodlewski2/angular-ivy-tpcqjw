import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { StoreModule } from './store/store.module';
import { initialState } from './state';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot([{
      initialState, key: 'global'  
    }])
  ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
