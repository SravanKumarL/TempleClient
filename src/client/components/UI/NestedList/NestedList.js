import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
// import InboxIcon from 'material-ui-icons/MoveToInbox';
// import DraftsIcon from 'material-ui-icons/Drafts';
// import SendIcon from 'material-ui-icons/Send';
// import ExpandLess from 'material-ui-icons/ExpandLess';
// import ExpandMore from 'material-ui-icons/ExpandMore';
// import StarBorder from 'material-ui-icons/StarBorder';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class NestedList extends React.Component {
  state = { open: true };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {this.props.children}
            {/* <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary="Starred" />
            </ListItem> */}
          </List>
        </Collapse>
      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);