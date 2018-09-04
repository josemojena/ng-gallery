

export interface FileInfoInterface {

 thumbnail: string;
 file: string;
 size: string;
 lastModified
: string;

}

export class FileInfo implements FileInfoInterface {
  thumbnail = "";
  file = "";
  size = "";
  lastModified= "";
}
export interface ConfigurationInterface {

    restUrl: string;
    baseUrl: string;
    width: string;
    height: string;

}
export class File {

  name: string;
  extension: string;
  path: string;
  size: { width: 0, height: 0 };
}
export class Field {
  name: string;
  value: string;
}
export interface DialogData {
  retrieveUrl: string;
  uploadUrl: string;
  fieldToSend: Array<Field>;
  baseUrl: string;
}
