import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GalleryModule } from './modules/gallery/gallery.module';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
//import {DialogComponent, GalleryComponent} from './modules/gallery/gallery.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GalleryModule
  ],
  exports:[GalleryModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }


//platformBrowserDynamic().bootstrapModule(AppModule);
