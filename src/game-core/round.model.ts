import Guess from './guess.model';

interface Props {
    [key: string]: any;
    guess: {[key: string]: Guess};
  }

export default class Round {
  private props: Props = {
    guess: {}
  };

  get guess() {
    return this.props.guess;
  }
 
}