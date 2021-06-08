
//image interface
export interface ImageInterface {
  name : string,
  width : number,
  height: number
}

//error interface
export interface ErrorInterface {
  status: number,
  errorCode: number,
  errorMessage: string,
  paramsMissing?: string[]
}
