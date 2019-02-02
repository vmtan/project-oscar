import Player from './player.model';

export default interface Guess {
  value: number;
  submitTime: Date;
  player: Player;
}