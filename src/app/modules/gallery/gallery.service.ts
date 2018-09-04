import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

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
    return this.httpClient.get(path, {'observe': 'response'});
  }

  /**
   * Upload a file ... return 200 status code for successful or 500 in case of error
   *
   * @param {*} path
   * @param {*} form
   * @returns
   * @memberof GalleryService
   */
  upload(path, form){
    return this.httpClient.post(path, form ,  {'observe': 'response'});
  }

}
