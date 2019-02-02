import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

interface Props {
  classes: {
    paper: any;
    textField: any;
    joinButton: any;
  }
  checkDuplicated: (string) => boolean,
  submit: (string) => void,
}

interface State {
  name?: string
}

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  joinButton: {}
});

class AddPlayerComponent extends Component<Props, State> {  

  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };

    this.join = this.join.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  join() {
    this.props.submit(this.state.name);
  }

  get disableToAddNewUser() {
    return this.state.name === '' || this.playerNameIsExist;
  }

  get playerNameIsExist() {
    return this.props.checkDuplicated(this.state.name);
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper} >
        <Typography color="textSecondary" gutterBottom>Join</Typography>
        <Grid container>
          <Grid item xs={8}>
            <TextField
              error={this.playerNameIsExist}
              id="player"
              label="Player name"
              className={classes.textField}
              variant="outlined"
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              disabled={this.disableToAddNewUser}
              variant="contained"
              color="primary"
              className={classes.joinButton}
              onClick={this.join}
            >
              Join
            </Button>
          </Grid>
        </Grid>
      </Paper>);
  }
}

export default withStyles(styles)(AddPlayerComponent);