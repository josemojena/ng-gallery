import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogComponent, GalleryComponent} from './gallery.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {GalleryService} from './gallery.service';
import { ClipboardModule } from 'ngx-clipboard';

import {
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatRippleModule,
  MatInputModule,
  MatButtonModule,
  MatTabsModule,
  MatProgressBarModule,
} from '@angular/material';



@NgModule({
  imports: [
    MatFormFieldModule,
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ClipboardModule,
  ],
  declarations: [GalleryComponent, DialogComponent],
  exports: [
    GalleryComponent,
    DialogComponent
  ],
  providers: [GalleryService],
  entryComponents: [GalleryComponent, DialogComponent]
})
export class GalleryModule { }
