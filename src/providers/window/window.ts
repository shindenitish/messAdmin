import { Injectable } from '@angular/core';

@Injectable()
export class WindowProvider {

  constructor() {
    
  }

  get windowRef() {
    return window;
  }

}
