import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import classNames from 'classnames';
import Clear from '@material-ui/icons/Clear';
import createContainer from '../../../hoc/createContainer/createContainer';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Edit from '@material-ui/icons/ModeEdit';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { SEARCH_OPERATIONS } from '../../../../store/constants/transactions';
import List from '@material-ui/core/List';

const { USE, EDIT } = SEARCH_OPERATIONS;
const pageSize = 50;
const CustomListItem = ({ transaction, optionClicked }) => {
  return (
    <div
      style={{ display: 'flex', flexGrow: 1, width: '80%' }} >
      <ListItem style={{ paddingLeft: 0 }} onClick={() => optionClicked(USE, transaction)} button disableRipple>
        <ListItemText inset primary={transaction.names} />
      </ListItem>
      <IconButton style={{}} onClick={() => optionClicked(EDIT, transaction)} >
        <Edit />
      </IconButton>
    </div>
  );
}
const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing.unit,
  },
  header: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 0,
    borderBottom: '2px solid #eee'
  },
  textField: {
    flexGrow: 1,
    marginRight: '5%',
    paddingTop: theme.spacing.unit,
  },
});

class MobileSearchPanel extends React.Component {
  constructor() {
    super();
    this.optionClickedHandler = this.optionClickedHandler.bind(this);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.searchedTransactions !== prevState.prevSearchedTransactions) {
      return {
        searchedTransactions: nextProps.searchedTransactions, prevSearchedTransactions: nextProps.searchedTransactions,
        count: nextProps.searchedTransactions.length
      };
    }
    return null;
  }
  componentDidMount() {
    this.input.focus();
  }
  state = {
    searchValue: '',
  };
  optionClickedHandler = (option, transaction) => {
    this.setState({ searchValue: '' });
    this.props.closed();
    this.props.selectedTransactionChanged(transaction, option);
  }
  inputChangeHandler = (event) => {
    const { value } = event.target;
    this.setState({ searchValue: value });
    this.props.searchTransactions({ searchValue: value, skip: 0, take: pageSize }, true); //update count in scroll event
  }
  clearTextHandler = () => {
    this.setState({ searchValue: '' });
    this.input.focus();
  }
  render() {
    const { classes, closed, searchedTransactions: transactions, loading } = this.props;
    const { searchValue: value } = this.state;
    let transactionsList = null;
    if (value !== '' && transactions && transactions.length === 0) {
      transactionsList = (
        <Typography style={{ marginTop: 20 }} variant='body1' align='center'> No search results found</Typography>
      );
    }
    if (loading) {
      transactionsList = (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography style={{ marginTop: 20 }} variant='caption'>Searching...</Typography>
          <CircularProgress />
        </div>
      );
    }
    if (transactions && transactions.length > 0) {
      transactionsList = (
        <List component="nav" style={{ maxHeight: '87%', overflow: 'auto' }}>
          {transactions.map(transaction => {
            return (
              <div key={`${transaction.phoneNumber}_${transaction.id}`} style={{ display: 'flex', width: '80%', margin: '0 auto' }}>
                <CustomListItem optionClicked={this.optionClickedHandler} transaction={transaction} />
              </div>
            );
          })}
        </List>
      );
    }
    if (value === '') {
      transactionsList = null;
    }
    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <IconButton onClick={closed}>
            <ArrowBack />
          </IconButton>
          <FormControl className={classNames(classes.margin, classes.textField)}>
            <Input
              inputRef={node => this.input = node}
              id="adornment-cancelSearch"
              type={'text'}
              value={this.state.searchValue}
              onChange={this.inputChangeHandler}
              placeholder='Enter name or phone number to search'
              autoFocus
              disableUnderline
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    style={{ height: 40, width: 40 }}
                    aria-label="Toggle password visibility"
                    onClick={this.clearTextHandler}
                  >
                    {this.state.searchValue !== '' ? <Clear /> : null}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        {transactionsList}
      </div>

    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    searchedTransactions: state.transactions.searchedTransactions,
    loading: state.transactions.loading,
    totalCount: state.transactions.totalCount
  }
}

export default createContainer(withStyles(styles)(MobileSearchPanel), mapStateToProps);