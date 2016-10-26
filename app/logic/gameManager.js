import { extendObservable } from 'mobx';

export default class GameManager {

  constructor(){
    extendObservable(this, {
      levelCount: 0,
      get cardMatrix(){
        return {
          rows: this.levelCount + 2,
          columns: this.levelCount + 2
        }
      }
    });
  }
}
