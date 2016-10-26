import { extendObservable, action } from 'mobx';

export default class GameManager {

  constructor(){
    extendObservable(this, {
      levelCount: 0,
      get cardMatrix(){
        return {
          rows: this.levelCount + 1,
          columns: this.levelCount + 1
        }
      }
    });

    this.startGame = action(this.startGame)
  }

  startGame(){
    this.levelCount = 1;
  }
}
