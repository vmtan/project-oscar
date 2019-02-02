import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';

import FaceIcon from '@material-ui/icons/Face';
import AddIcon from '@material-ui/icons/Add';
import ChevronRight from '@material-ui/icons/ChevronRight';
import * as _ from 'lodash';

import Game from '../game-core/game';
import PlayerComponent from './player.component';

interface LandingPageProps {
  classes: any;
}
interface LandingPageState {
  name: string;
  gameConsoles: { [key: string]: GameConsole };
  currentUser?: any;
}

interface GameConsole {

}

const styles = theme => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  paper: {
    padding: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    marginTop: 16,
    height: 56,
  },
  rootChip: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
  },
  historyAvatar: {
    color: '#fff',
    backgroundColor: green[500],
  }
});

class LandingPage extends Component<LandingPageProps, LandingPageState> {
  private game: Game;
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
      gameConsoles: {}
    };

    this.game = new Game(1, 10);
    this.game.onGameChanged(this.onGameChanged.bind(this));
    this.next = this.next.bind(this);
    this.join = this.join.bind(this);
    this.endRound = this.endRound.bind(this);
    this.newRound = this.newRound.bind(this);
    this.renderPlayer = this.renderPlayer.bind(this);
    this.renderPlayerConsole = this.renderPlayerConsole.bind(this);
    this.renderTurn = this.renderTurn.bind(this);
    this.renderGuess = this.renderGuess.bind(this);
    this.init();
  }

  componentDidMount() {
    // Start auto mod
    this.game.join('A');
    this.game.join('B');
    this.game.getPlayer('A').guess(4);
    this.game.getPlayer('B').guess(9);
    this.game.getPlayer('B').guess(7);
    this.game.getPlayer('A').guess(6);
  }

  init() {
    // this.game.init();
  }

  get rounds() {
    // return this.state.game ? this.state.game.rounds : [];
  }

  get players() {
    // return this.state.game ? this.state.game.players : [];
  }

  get history() {
    // return this.state.game ? this.state.game.history : [];
  }

  handlePlayerChange = player => name => event => {
    this.setState({
      gameConsoles: {
        [player]: {
          [name]: event.target.value,
        }
      }
    });
  };

  next() {
    this.game.next(parseInt(this.state.nextNumber));
    // this.setState({ range: this.game.range });
  }

  join() {
    this.game.join(this.state.newPlayerName);
    // this.setState({
    //   newPlayerName: '',
    //   [this.state.newPlayerName]: ''
    // });
  }

  guess = playerName => event => {
    this.game.getPlayer(playerName).guess(parseInt(this.state.gameConsoles[playerName].nextNumber));
  }

  setCurrentUser = player => event => {
    this.setState({
      currentUser: player
    });
  }

  endRound() {
    // this.game.endRound();
  }

  newRound() {
    this.game.startRound();
  }

  onGameChanged(game) {
    // this.setState({
    //   game: game
    // });
  }

  newUserIsExisted() {
    return _.find(this.state.game ? this.state.game.players : [], player => player === this.state.newPlayerName);
  }
  
  isCurrentPlayer(player) {
    return this.state.currentUser === player;
  }

  renderPlayer(player: string, i) {
    return <PlayerComponent name={player} />;
  }

  // renderPlayerConsole(player) {
  //   return (
  //     <ConsoleComponent

  //     />
  //   );
  // }

  renderGuess = isCurrentRound => (guess, key) => {
    return (
      <Chip
        icon={<FaceIcon />}
        color={this.game.check(guess.value) && isCurrentRound ? 'primary' : 'default'}
        label={`${key}: ${guess.value}`}
        variant="default"
      />
    );
  }

  renderTurn = isCurrentRound => (round) => {
    const { classes } = this.props;
    return (
      (
        <Grid container spacing={8}>
          <Grid item>
            <Paper className={classes.paper} >
              <Chip
                icon={<ChevronRight />}
                color='secondary'
                label={round._meta.range[0]}
                variant="default"
              />
            </Paper>
          </Grid>
          {!_.isEmpty(round.guess) &&
            (
              <Grid item>
                <Paper className={classes.paper}>
                  {_.map(round.guess, this.renderGuess(isCurrentRound))}
                </Paper>
              </Grid>
            )
          }
          <Grid item>
            <Paper className={classes.paper} >
              <Chip
                icon={<ChevronRight />}
                color='secondary'
                label={round._meta.range[1]}
                variant="default"
              />
            </Paper>
          </Grid>
        </Grid>
      )
    );
  }

  renderGameHistory() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <List>
          {
            _.map(this.history, (history) => {
              return (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.historyAvatar}>
                      <AddIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={history.message}
                    secondary={
                      <React.Fragment>
                        <Typography component="span" className={classes.inline} color="textPrimary">{history.subMessage || 'System'}</Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              );
            })
          }

        </List>
      </Paper>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root} spacing={8}>
        <Grid item xs={8}>
          <Grid container className={classes.root} spacing={8}>
            <Grid item xs={12}>
              <Paper className={classes.paper} >
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Players
            </Typography>                
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={8}>
                {this.players.map((player) => {
                  return (
                    !this.isCurrentPlayer(player) && (
                      <Grid item>
                        {this.renderPlayerConsole(player)}
                      </Grid>
                    )
                  );
                })}
                <Grid item>
                  
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {this.rounds.map((round, index) => {
                return this.renderTurn(index === this.rounds.length - 2)(round);
              })}
              <button onClick={this.endRound}>
                End Round
              </button>
              <button onClick={this.newRound}>
                New Round
              </button>
            </Grid>
            <Grid item xs={12}>
              {this.renderPlayerConsole(this.state.currentUser)}
            </Grid>
            <pre>
              <code>
                {JSON.stringify(this.state, null, 4)}
              </code>
            </pre>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          {this.renderGameHistory()}
        </Grid>
      </Grid>
    );
  }

  // render() {
  //   const { classes } = this.props;

  //   return (
  //     <Grid container className={classes.root} spacing={8}>
  //       <Grid item xs={8}>
  //         <Grid container className={classes.root} spacing={8}>
  //           <Grid item xs={12}>
  //             <Paper className={classes.paper} >
  //               <Typography className={classes.title} color="textSecondary" gutterBottom>
  //                 Players
  //           </Typography>
  //               {this.players.map(this.renderPlayer)}
  //             </Paper>
  //           </Grid>
  //           <Grid item xs={12}>
  //             <Grid container spacing={8}>
  //               {this.players.map((player) => {
  //                 return (
  //                   !this.isCurrentPlayer(player) && (
  //                     <Grid item>
  //                       {this.renderPlayerConsole(player)}
  //                     </Grid>
  //                   )
  //                 );
  //               })}
  //               <Grid item>
  //                 <Paper className={classes.paper} >
  //                   <Typography className={classes.title} color="textSecondary" gutterBottom>
  //                     Join
  //               </Typography>
  //                   <TextField
  //                     error={this.newUserIsExisted()}
  //                     id="player"
  //                     label="Player name"
  //                     className={classes.textField}
  //                     variant="outlined"
  //                     value={this.state.newPlayerName}
  //                     onChange={this.handleChange('newPlayerName')}
  //                     margin="normal"
  //                   />
  //                   <button
  //                     disabled={this.disableToAddNewUser()}
  //                     className={classes.button}
  //                     onClick={this.join}
  //                   >
  //                     Join
  //               </button>
  //                 </Paper>
  //               </Grid>
  //             </Grid>
  //           </Grid>
  //           <Grid item xs={12}>
  //             {this.rounds.map((round, index) => {
  //               return this.renderTurn(index === this.rounds.length - 2)(round);
  //             })}
  //             <button onClick={this.endRound}>
  //               End Round
  //             </button>
  //             <button onClick={this.newRound}>
  //               New Round
  //             </button>
  //           </Grid>
  //           <Grid item xs={12}>
  //             {this.renderPlayerConsole(this.state.currentUser)}
  //           </Grid>
  //           <pre>
  //             <code>
  //               {JSON.stringify(this.state, null, 4)}
  //             </code>
  //           </pre>
  //         </Grid>
  //       </Grid>
  //       <Grid item xs={4}>
  //         {this.renderGameHistory()}
  //       </Grid>
  //     </Grid>
  //   );
  // }
}

export default withStyles(styles)(LandingPage);