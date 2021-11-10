import * as Raven from 'raven-js'; 
//import { ToastyService } from 'ng2-toasty';
import { ErrorHandler, Inject, isDevMode} from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
  constructor(
    ) {
  }

  handleError(error: any): void {

    if(!isDevMode()){
        Raven.captureException(error.originalError || error);
    }else{
        console.log("Error!!!");
        console.log(error);
    }
     
  }
}