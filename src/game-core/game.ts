import EventEmitter from 'eventemitter3';

import GameHistory from './game-history.model';
import Round from './round.model';
import { Player } from './player.model';

interface GameProps {
  [key: string]: any;
  range: [number?, number?];
  players: Player[];
  histories: GameHistory[];
  rounds: Round[];
}

export class Game {

  private eventEmitter = new EventEmitter();

  private props: GameProps = {
    range: [],
    players: [],
    histories: [],
    rounds: [],
  };

  constructor(
    private min: number,
    private max: number) {
    this.props.roundHistories = [];
  }

  get range(): [number?, number?] {
    return this.props.range;
  }

  get players(): Player[] {
    return this.props.players;
  }

  get rounds(): Round[] {
    return this.props.rounds;
  }

  get status(): string {
    return this.props.status;
  }

  set status(status: string) {
    this.props.status = status;
    this.props.histories.push(new GameHistory('Game changed', status));
  }

  get history() {
    return this.props.histories;
  }

  getPlayer(playerName) {
    return new Player(this, { name: playerName });
  }

  init(initSecret?: number) {
    this.props.autoStartNewRound = false;
    this.props.waitForAll = true;
    this.props.range[0] = this.min;
    this.props.range[1] = this.max;
    this.props.rounds = [];
    this.status = 'READY';
    this.props.secret = Math.round((Math.random() * (this.max - this.min)) + this.min);
  }

  submitGuess(player, num) {
    if (this.props.rounds.length <= 0) {
      this.startNewTurn();
    }
    const currentRoundIndex = this.props.rounds.length - 1;
    this.props.rounds[currentRoundIndex].guess[player] = {
      value: num,
      submitTime: new Date(),
    };

    this.checkTurnFinish();
    this.gameChanged();
  }

  checkTurnFinish() {
    const currentRoundIndex = this.props.rounds.length - 1;
    const currentRound = this.props.rounds[currentRoundIndex];
    const guesses = currentRound.guess;
    const numberPlayersSubmitInRound = Object.keys(guesses).length;
    const totalPlayers = this.props.players.length;
    const firstSubmitPlayer = Object.keys(guesses)[0];
    let winner = null;

    if (this.props.waitForAll) {
      if (numberPlayersSubmitInRound === totalPlayers) {
        Array.from(Object.keys(guesses)).every(((playerName) => {
          const guess = guesses[playerName];
          if (this.check(guess.value)) {
            winner = {
              player: playerName,
              guess: guess,
            }
            return false;
          } else {
            return true;
          }
        }).bind(this));
        if (winner) {
          // Start new round
          this.props.histories.push(new GameHistory(`With ${winner.guess.value} [${winner.player}] was the winner of this round`));
          this.endRound(this.props.autoStartNewRound);
        } else {
          // Start new turn
          this.next(guesses[firstSubmitPlayer].value);
          this.startNewTurn();
        }
      }
    } else {
      if (this.check(guesses[firstSubmitPlayer].value)) {
        winner = {
          player: firstSubmitPlayer,
          guess: guesses[firstSubmitPlayer],
        }
      }
      if (winner) {
        // Start new round
        this.props.histories.push(new GameHistory(`With ${winner.guess.value} [${winner.player}] was the winner of this round`));
        this.endRound();
      } else {
        // Start new turn   
        this.next(guesses[firstSubmitPlayer].value);
        this.startNewTurn();
      }
    }
  }

  startNewTurn() {
    this.props.rounds.push({
      _meta: {
        range: [this.props.range[0], this.props.range[1]]
      },
      guess: {}
    });
  }

  gameChanged() {
    this.eventEmitter.emit('gameChanged', {
      range: this.range,
      players: this.players,
      rounds: this.rounds,
      status: this.status,
      history: this.history,
    })
  }

  next(num) {
    if (this.props.range[0] <= num && this.props.secret > num) {
      this.props.range[0] = num;
    }

    if (num <= this.props.range[1] && this.props.secret < num) {
      this.props.range[1] = num;
    }

    if (num === this.props.secret) {
      this.endRound(this.props.autoStartNewRound);
    }
    return this;
  }

  startRound() {
    this.init();
    this.gameChanged();
  }

  endRound(autoStartNewRound?: boolean) {
    this.props.roundHistories.push(this.rounds);
    this.status = 'END_ROUND';
    this.props.histories.push(new GameHistory(`Round ended`));
    if (autoStartNewRound) {
      this.startRound();
      return;
    }
    this.gameChanged();
  }

  addPlayer(player: Player) {
    console.log('Player added');
    this.props.players.push(player);    
    this.props.histories.push(new GameHistory(`[${name}] has just joined into this game`));
    this.gameChanged();
  }

  hasPlayer(playerName: string) {
    return this.props.players.find((player: Player) => {
        return player.name === playerName;
    }) !== undefined;
  } 

  check(num: number) {
    return num === this.props.secret;
  }

  onGameChanged(callback: () => any) {
    this.eventEmitter.addListener('gameChanged', callback);
  }
}