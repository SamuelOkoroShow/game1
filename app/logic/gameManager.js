import { extendObservable, action } from 'mobx';

export default class GameManager {

  constructor(){
    extendObservable(this, {
      levelCount: 0,
      cardMatrix: [],
      flippedCard: null,
      flipCount: 0,
      get boardDimensions(){
        return {
          rows: this.levelCount + 1,
          columns: this.levelCount + 1
        }
      }
    });

    this.startGame = action(this.startGame);
    this.generateCards = action(this.generateCards);
    this.flipCard = action(this.flipCard);
  }

  getRandomIndex(rows, columns) {
    return {
      rows: Math.floor(Math.random() * rows),
      columns: Math.floor(Math.random() * columns),
    }
  }

  fillCardPair(data, count = 1){
    const { rows, columns } = this.boardDimensions;
    const index = this.getRandomIndex(rows, columns);
    let newCount = count;
    const matrixCell = this.cardMatrix[index.rows][index.columns];
    if (!matrixCell.id){
      this.cardMatrix[index.rows][index.columns] = { ...data, index };
      newCount = newCount + 1;
    }
    return newCount > 2 ? false : this.fillCardPair(data, newCount);
  }

  generateCards(){
    const { rows, columns } = this.boardDimensions;
    this.cardMatrix = new Array(rows).fill(new Array(columns).fill({}));
    console.log(this.cardMatrix)
    for (let i = 0; i < Math.floor((rows * columns / 2) + 1); i++ ){
      this.fillCardPair({
        id: i,
        flipped: false,
        match: false
      });
    }
  }

  flipCard({ isFlipped, index, id }){
    if (this.flipCount === 0 && isFlipped) {
      this.flippedCard = { index, id };
    }
    this.flipCount = this.flipCount + 1;
    this.cardMatrix[index.rows][index.columns].flipped = isFlipped
    if (this.flipCount === 2) {
      this.checkMatches(index, id)
    }
  }


  checkMatches(index, id){
    if (id === this.flippedCard.id) {
      console.log("match")
    } else {
      console.log("unmatch")
    }
  }

  startGame(){
    this.levelCount = 2;
  }
}
