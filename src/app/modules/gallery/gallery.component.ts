import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { GalleryService } from './gallery.service';
import { ConfigurationInterface, FileInfo, DialogData } from './shared/interfaces';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  @Input() Config: ConfigurationInterface;
  files: Array<any>;


  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {

    /*setTimeout(() => {

    });*/

  }

  openMedia(){

    const dialogRef = this.dialog.open(DialogComponent, {
      width: this.Config.width,
      height: this.Config.height,
      data: {
        retrieveUrl: this.Config.restUrl,
        fieldToSend: [],
        uploadUrl: this.Config.restUrl,
        baseUrl: this.Config.baseUrl
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}

@Component({
  selector: 'app-gallery-dialog',
  templateUrl: './dialog-template.html',
  styleUrls: ['./gallery.component.css']
})

export class DialogComponent implements OnInit {

  /**
   * Array of file returned from server
   *
   * @type {Array<any>}
   * @memberof DialogComponent
   */
  files: Array<any>;
  /**
   * Display progress bar on file uploading
   *
   * @memberof DialogComponent
   */
  showProgressBar = false;
  /**
   * Error getting or sending info to the server
   *
   * @type {string}
   * @memberof DialogComponent
   */
  errorMsg: string;
  /**
   * Current selected file
   *
   * @type {FileInfo}
   * @memberof DialogComponent
   */
  fileSelected: FileInfo ;
  /**
   *Creates an instance of DialogComponent.
   *
   * @param {MatDialogRef<DialogComponent>} dialogRef
   * @param {DialogData} data
   * @param {GalleryService} galleryService
   * @memberof DialogComponent
   */


  @ViewChild('tabGroup') tabGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private galleryService: GalleryService) {
     this.fileSelected = new FileInfo();
  }

  /**
   * Load gallery's files
   *
   * @memberof DialogComponent
   */
  ngOnInit() {
    this.loadFiles();
  }

  /**
   * Method that return a list of files from server...
   *
   * @memberof DialogComponent
   */
  loadFiles() {
    this.galleryService.loadFiles(this.data.retrieveUrl).subscribe((response) => {
      if (response.status !== 200) {
        throw new Error('An error has ocurred: Status response(' + response.status + ')');
      }
      this.files = ((response.body) as Array<FileInfo>).slice(0, 20);

    });
  }


  /**
   * Listen onFileChange Event
   * @param event
   */
  onFileChange(event): void {

    this.setVisibleProgressBar(true);
    const reader = new FileReader();

    if (event.target.files && event.target.files.length > 0) {

      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {

        const uploadForm: FormData = new FormData();
        uploadForm.append('file', file, file.name);
        const otherFieldsToSend = this.data.fieldToSend.length;
        if (otherFieldsToSend > 0) {
          for (let i = 0; i < otherFieldsToSend; i++) {
            uploadForm.append(otherFieldsToSend[i].name, otherFieldsToSend[i].value);
          }
        }

        this.galleryService.upload(this.data.uploadUrl, uploadForm).subscribe(response => {
          try {
            this.setVisibleProgressBar(false);

            if (response.status !== undefined &&  response.status !== 200) {

              throw new Error('An error has ocurred: Status response(' + response.status + ')');
            }
            this.ActiveTab(2);


          }
          catch (error) {
            this.errorMsg = error;
          }
        },
          error1 => {
            this.setVisibleProgressBar(false);
            this.errorMsg = "Internal Server Error";
          });


      };
    }
  }
  selectFile(file: FileInfo) {
    this.fileSelected = file;
    console.log(this.fileSelected);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  /**
   * Show or Hide the ProgressBar
   *
   * @param {boolean} status
   * @memberof DialogComponent
   */
  setVisibleProgressBar(status: boolean) {
    this.showProgressBar = status;
  }

 /**
   * Set active tab
   *
   * @param number
   * @constructor
   */
  ActiveTab(number){
    this.tabGroup.selectedIndex = number;
}
}


