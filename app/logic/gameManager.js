import { extendObservable, action, autorun } from 'mobx';

export default class GameManager {

  constructor(){
    extendObservable(this, {
      levelCount: 0,
      cardMatrix: [],
      flippedCard: null,
      matches: [],
      flipCount: 0,
      get boardDimensions(){
        return {
          rows: 3,
          columns: this.levelCount + 1
        }
      },
      get uniqueCardQuantity(){
        return Math.floor((this.boardDimensions.rows * this.boardDimensions.columns / 2) + 1)
      }
    });

    this.startGame = action(this.startGame);
    this.generateCards = action(this.generateCards);
    this.flipCard = action(this.flipCard);
    this.checkMatches = action(this.checkMatches);
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
    for (let i = 0; i < this.uniqueCardQuantity; i++ ){
      this.fillCardPair({
        id: i,
        flipped: false
      });
    }
  }

  flipCard({ isFlipped, index, id }){
    if (this.flipCount === 0 && isFlipped) {
      this.flippedCard = { index, id };
    }
    this.cardMatrix[index.rows][index.columns].flipped = !this.cardMatrix[index.rows][index.columns].flipped;
    this.flipCount = this.flipCount + 1;
    if (this.flipCount === 2) {
      this.flipCount = 0;
      autorun(() => this.checkMatches(index, id));
    }
  }

  checkMatches(index, id){
    if (id === this.flippedCard.id) {
      this.matches.push(id);
      console.log(this.matches.length,this.uniqueCardQuantity)
      if (this.matches.length === this.uniqueCardQuantity - 1){
        this.levelCount = this.levelCount +  1;
        this.matches = [];
        this.generateCards();
      }
    } else {
      setTimeout(()=>{
        this.cardMatrix[this.flippedCard.index.rows][this.flippedCard.index.columns].flipped = false;
        this.cardMatrix[index.rows][index.columns].flipped = false;
      }, 1000)
    }
  }

  startGame(){
    this.levelCount = 1;
  }
}
