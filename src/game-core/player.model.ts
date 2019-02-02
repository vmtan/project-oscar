import Game from './game';

interface Person {
  name: string;
}

interface IPLayer extends Person {
  join: (Game) => Player;
  guess: (num) => Player;
}

export class Player implements IPLayer {
  name: string;
  private game: Game;
  
  constructor(name) {  
    this.name = name;
  }
  
  join(game: Game): Player {
    console.log("Join game");
    this.game = game;
    this.game.addPlayer(this);
    return this;
  }

  guess(num: number): Player {
    if (this.game) {
      this.game.submitGuess(this.name, num);
      return this;
    } else {
      throw new Error('Player should join a game before submit');
    }  
  }
}