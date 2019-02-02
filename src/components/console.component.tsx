import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FaceIcon from '@material-ui/icons/Face';
import { withStyles } from '@material-ui/core/styles';

interface Props {
  player: any;
  classes?: {
    paper: any,
    title: any,
    button: any,
    textField: any
  };
  disabled: boolean;
  onRequestSetCurrentUser: (any) => any;
  guess: (number) => any;
}

interface State { }

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  paper: {
    padding: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  button: {
    marginTop: 16,
    height: 56,
  },
});

class ConsoleComponent extends Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {};
    this.guess = this.guess.bind(this);
  }

  guess() {}

  setCurrentUser() {}

   handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { player, classes, disabled, onRequestSetCurrentUser} = this.props;

    let button = null;
    if (disabled) {
      button = <button className={classes.button} onClick={this.guess}>Submit</button>;
    } else {
      button = <button className={classes.button} onClick={this.setCurrentUser}>Set current user</button>;
    }

    return (
      <Paper className={classes.paper} >
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {player} - Guess number
          </Typography>
        <TextField
          type="number"
          disabled={disabled}
          id="number"
          label="Number"
          className={classes.textField}
          variant="outlined"
          value={player}
          onChange={this.handleChange('number')}
          margin="normal"
        />
        {button}
      </Paper>);
  }
}

export default withStyles(styles)(ConsoleComponent);