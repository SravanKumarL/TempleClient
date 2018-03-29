import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { Search } from 'material-ui-icons';
import Table from '../../components/UI/Table/Table';
import Typography from 'material-ui/Typography/Typography';
import CircularProgress from 'material-ui/Progress/CircularProgress';

import * as actions from '../../../store/actions';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    flexDirection: 'column'
  },
  formControl: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '2vh',
    minWidth: '40%',
    width: '50%',
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  progress: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },
});
class InputAdornments extends React.Component {
  state = {
    value: '',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  searchClickHandler = event => {
    this.props.searchTransaction({ phoneNumber: this.state.value });
  };

  getColumns = () => {
    return [
      { name: 'Names', id: 'names' },
      { name: 'Gothram', id: 'gothram' },
      { name: 'Nakshatram', id: 'nakshatram' },
    ];
  }

  render() {
    const { classes, transactions } = this.props;
    let table = null;
    let loading = null;
    if (this.props.loading) {
      loading = (<CircularProgress className={classes.progress} />);
    }
    if (transactions) {
      if (transactions.length === 0) {
        table = (
          <Typography variant='body1' align='center' gutterBottom>
            Search returned no results...
           </Typography>
        );
      } else {
        const columns = this.getColumns();
        table = (
          <Table
            columns={columns}
            rows={transactions}
          />
        );
      }
    }
    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="search">Search</InputLabel>
          <Input
            id="adornment-search"
            type='input'
            value={this.state.value}
            onChange={this.handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={this.searchClickHandler}
                // onMouseDown={this.handleMouseDownPassword}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {loading}
        {table}
      </div>
    );
  }
}

InputAdornments.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    transactions: state.transactions.searchedTransactions,
    loading: state.transactions.loading
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    searchTransaction: (searchData) => {
      dispatch(actions.searchTransactions(searchData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InputAdornments));