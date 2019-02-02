export default class GameHistory {
  private props: {[key: string]: any} = {};

  constructor(message: string, subMessage?: string) {  
    this.message = message;
    this.subMessage = subMessage;
  }

  get message(): string {
    return this.props.message;
  }

  set message(message: string) {
    this.props.message = message;
  }

  get subMessage(): string {
    return this.props.subMessage;
  }

  set subMessage(message: string) {
    this.props.subMessage = message;
  }
}