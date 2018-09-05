import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { GalleryService } from './gallery.service';
import { ConfigurationInterface, FileInfo, DialogData } from './shared/interfaces';
import { ArrayType } from '@angular/compiler/src/output/output_ast';


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
  }

  openMedia() {

    const dialogRef = this.dialog.open(DialogComponent, {
      width: this.Config.width,
      height: this.Config.height,
      data: {
        retrieveUrl: this.Config.restUrl, //upload to get files list
        fieldToSend: [],
        uploadUrl: this.Config.restUrl,//Url to upload a new file
        baseUrl: this.Config.baseUrl, //public path to display thumb-files
        removeUrl: this.Config.restUrl //Url to remove
      }
      //@TODO I used the same url to retrieve, upload and remove because I just changed the protocol depend of the request
      //You can use different url as you wish
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
  fileSelected: FileInfo;
  /**
   *Creates an instance of DialogComponent.
   *
   * @param {MatDialogRef<DialogComponent>} dialogRef
   * @param {DialogData} data
   * @param {GalleryService} galleryService
   * @memberof DialogComponent
   */


  @ViewChild('tabGroup') tabGroup;


  classSelected = "gallery-selected";

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private galleryService: GalleryService) {

  }

  /**
   * Load gallery's files
   *
   * @memberof DialogComponent
   */
  ngOnInit() {
    this.initSelectedFile();
    this.errorMsg = '';
    this.loadFiles();

  }

  initSelectedFile() {
    this.fileSelected = new FileInfo();
  }
  /**
   * Method that return a list of files from server...
   *
   * @memberof DialogComponent
   */
  loadFiles() {
    this.galleryService.loadFiles(this.data.retrieveUrl).subscribe((response) => {

      try {
        if (response.status !== 200) {
          throw new Error('An error has ocurred: Status response(' + response.status + ')');
        }
        const result = ((response.body) as Array<FileInfo>);
        if (Array.isArray(result)) {
          this.files = result.slice(0, 20);
        }
        else {
          this.files = [];
        }
      }
      catch (error) {
        this.showErrorMsg(error);
      }
    });
  }

  remove(file: FileInfo) {

    this.galleryService.remove(this.data.removeUrl, file.Id).subscribe(response => {
      if (response.status === 200) {
        this.loadFiles();
        this.initSelectedFile();

      }
    }, error => {

    });

  }

  /**
   * Listen onFileChange Event
   * @param event
   */
  onFileChange(event): void {

    this.clearError();
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

            if (response.status !== undefined && response.status !== 200) {
              throw new Error('An error has ocurred: Status response(' + response.status + ')');
            }

            this.loadFiles();
            this.ActiveTab(2);

          }
          catch (error) {
            this.showErrorMsg(error);
          }
        },
          error1 => {
            this.setVisibleProgressBar(false);
            this.showErrorMsg('An error has ocurred: Status response(' + error1.status + ')');
          });


      };
    }
  }
  selectFile(file: FileInfo) {
    this.fileSelected = file;
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

  clearError() {
    this.errorMsg = "";
  }
  /**
    * Set active tab
    *
    * @param number
    * @constructor
    */
  ActiveTab(number) {
    this.tabGroup.selectedIndex = number;
  }

  showErrorMsg (error: string){
    this.errorMsg = error;
    setTimeout(() => {
     this.errorMsg = "";
  }, 5000);
  }
}


