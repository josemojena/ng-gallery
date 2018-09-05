import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GalleryComponent } from './modules/gallery/gallery.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  config = {
    restUrl: "http://localhost:3001/backend-api-rest/api/gallery",//Path to load, upload and delete a file.
    baseUrl: "http://pornfinger.local/", //public directory to display all files
    width: "1024px",
    height: "650px"
  };
  constructor() { }
}
