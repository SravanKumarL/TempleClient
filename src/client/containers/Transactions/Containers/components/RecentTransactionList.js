import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '../../../../components/UI/SearchPanel/ListItem';
import { SEARCH_OPERATIONS } from '../../../../../store/constants/transactions';
import createContainer from '../../../../hoc/createContainer/createContainer';
import { Typography } from '@material-ui/core';
import shortid from 'shortid';

const { USE } = SEARCH_OPERATIONS;

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class SelectedListItem extends React.Component {
  state = {
    selectedNames: null,
  };
  handleListItemClick = (option, transaction) => {
    if (option === USE) {
      this.props.usedTransactionChanged(null, '');
      return this.props.usedTransactionChanged(transaction, option);
    }
    this.props.editedTransactionChanged(transaction, option);
    return this.props.openEditForm(true);
  }

  render() {
    const { recentList: transactions } = this.props;
    return (
      <List key={shortid.generate()} component="nav" style={{ overflow: 'auto', width: '100%' }}>
        {transactions.length > 0 ? transactions.map(transaction => {
          return (
            <div key={`${shortid.generate()}`} style={{
              display: 'flex',
            }}>
              <ListItem optionClicked={this.handleListItemClick} transaction={transaction} />
            </div>
          );
        }) :
          <Typography variant='body1' align='center'>No Recent Transactions...</Typography>}
      </List>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    recentList: state.transactions.recentList
  }
}

SelectedListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default createContainer(withStyles(styles)(SelectedListItem), mapStateToProps);