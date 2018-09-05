import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GalleryService {
  constructor(private httpClient: HttpClient) {

  }

  /**
   * Load files from server.. return  an Observable object
   *
   * @param {*} path
   * @returns
   * @memberof GalleryService
   */
  loadFiles(path) {
    return this.httpClient.get(path, { 'observe': 'response' });
  }

  /**
   * Upload a file ... return 200 status code for successful or 500 in case of error
   *
   * @param {*} path
   * @param {*} form
   * @returns
   * @memberof GalleryService
   */
  upload(path, form) {
    return this.httpClient.post(path, form, { 'observe': 'response' });
  }
  /**
   * Remove a file from the gallery, implementation of this function run on the server
   *
   * @param {string} path path to the server
   * @param {string} file Id of the file
   * @returns {Observable<any>}
   * @memberof GalleryService
   */
  remove(path: string, file: string): Observable<any> {
    const url = `${path}/${file}`;
    console.log(file);
    return this.httpClient.delete(url, { 'observe': 'response' });

  }
}
