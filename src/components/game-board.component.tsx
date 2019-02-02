import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

import { Player, Game } from '../game-core';
import PlayerComponent from './player.component';
import AddPlayerComponent from './add-player.component';

interface Props {
  classes: any
}
interface State {
  game?: Game;
}

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

const mockPlayer: Player = new Player('Tan');

class GameBoardComponent extends Component<Props, State> {

  private game: Game;

  constructor(props) {
    super(props);
    this.state = {};

    this.addNewPlayer = this.addNewPlayer.bind(this);
    this.hasPlayer = this.hasPlayer.bind(this);
    this.setCurrentPlayer = this.setCurrentPlayer.bind(this);
    this.renderPlayer = this.renderPlayer.bind(this);
  }

  componentDidMount() {
    this.game = new Game(1, 10);
    this.game.onGameChanged(this.onGameChanged.bind(this));
  }

  onGameChanged(game) {
    console.log("game changed");
    this.setState({
      game: game
    });
  }

  get players(): Player[] {
    return this.state.game ? this.state.game.players : [];
  }

  addNewPlayer(playerName: string) {
    const player = new Player(playerName);
    player.join(this.game);
  }

  hasPlayer(playerName: string): boolean {
    return this.game ? this.game.hasPlayer(playerName) : true;
  }

  setCurrentPlayer(player) {
    alert(player);
  }

  renderPlayer(player: Player, i) {
    return <PlayerComponent player={player} key={i} onClick={this.setCurrentPlayer} />;
  }

  render() {
    const { classes } = this.props;
    const players = this.players;
    var cache = [];
    return (
      <Grid container spacing={8}>
        <Grid item xs={8}>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Paper className={classes.paper} >
                <Typography color="textSecondary" gutterBottom>
                  Players
                </Typography>
                {players.map(this.renderPlayer)}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <AddPlayerComponent
                checkDuplicated={this.hasPlayer}
                submit={this.addNewPlayer} />
            </Grid>
          </Grid>
        </Grid>
        <pre>
          <code>{JSON.stringify(this.state.game, (key, value) => {
            if (typeof value === 'object' && value !== null) {
              if (cache.indexOf(value) !== -1) {
                // Duplicate reference found
                try {
                  // If this value does not reference a parent it can be deduped
                  return JSON.parse(JSON.stringify(value));
                } catch (error) {
                  // discard key if value cannot be deduped
                  return;
                }
              }
              // Store value in our collection
              cache.push(value);
            }
            return value;
          }, 2)}</code>
        </pre>
      </Grid>
    )
  }
}

export default withStyles(styles)(GameBoardComponent);