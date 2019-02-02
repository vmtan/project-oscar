import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import { withStyles } from '@material-ui/core/styles';

import { Player } from '../game-core';

interface Props {
  player: Player;
  classes?: any;
  onClick: (Player) => void;
}

interface State { }

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit,
  },
});

class PlayerComponent extends Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {};
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick(this.props.player);
  }

  render() {
    const { player: { name }, classes } = this.props;
    return (
      <Chip
        onClick={this.onClick}
        icon={< FaceIcon />}
        label={name}
        className={classes.chip}
        variant="default"
      />)
  }
}

export default withStyles(styles)(PlayerComponent);