import { extendObservable, action } from 'mobx';

export default class GameManager {

  constructor(){
    extendObservable(this, {
      levelCount: 0,
      cardMatrix: [],
      get boardDimensions(){
        return {
          rows: this.levelCount + 1,
          columns: this.levelCount + 1
        }
      }
    });

    this.startGame = action(this.startGame);
    this.generateCards = action(this.generateCards);
  }

  getRandomIndex(rows, columns) {
    return {
      rows: Math.floor(Math.random() * rows),
      columns: Math.floor(Math.random() * columns),
    }
  }

  fillCardPair(text, count = 1){
    const { rows, columns } = this.boardDimensions;
    const index = this.getRandomIndex(rows, columns);
    let newCount = count;
    if (!this.cardMatrix[index.rows][index.columns]){
      this.cardMatrix[index.rows][index.columns] = text;
      newCount = newCount + 1;
    }
    return newCount > 2 ? false : this.fillCardPair(text, newCount);
  }

  generateCards(){
    const { rows, columns } = this.boardDimensions;
    this.cardMatrix = new Array(rows).fill(new Array(columns));
    for (let i = 0; i < Math.floor((rows * columns / 2) + 1); i++ ){
      this.fillCardPair(i);
    }
  }

  startGame(){
    this.levelCount = 2;
  }
}
