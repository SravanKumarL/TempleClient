import React from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Search from 'material-ui-icons/Search';
import Fade from 'material-ui/transitions/Fade';
import SearchPanel from '../../../components/UI/SearchPanel/SearchPanel';
import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';

import * as actions from '../../../../store/actions';

const transitionUp = (props) => { return (<Slide direction="up" {...props} />) };

class SearchTransaction extends React.Component {
  constructor() {
    super();
    this.baseState = this.state;
  }
  state = {
    searchPanelOpen: false,
    showSearchButton: true,
    searchValue: '',
    searchedTransactions: null,
    searchTextError: false,
    showOverflow: false,
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.searchedTransactions !== this.props.searchedTransactions) {
      this.setState({ searchedTransactions: nextProps.searchedTransactions });
    }
  }
  openSearchPanelHandler = () => this.setState({ showSearchButton: false, searchPanelOpen: true, });
  closeSearchPanelHandler = () => this.setState({ searchPanelOpen: false, });
  panelExitHandler = () => this.setState({ showSearchButton: true, });
  itemSelectinChangedHandler = (selectedItem) => {
    this.setState({ ...this.baseState })
    this.props.itemSelected(selectedItem);
  }
  searchValueChangedHandler = (event) => {
    const value = event.target.value;
    this.setState({ searchValue: value, isLoading: true });
    this.props.searchTransactions({ searchValue: value });
  }
  clearclickedHandler = () => {
    this.setState({ searchValue: '', searchedTransactions: null });
    this.input.focus();
  }
  inputRefHandler = (node) => { this.input = node; }
  optionClickedHandler = (option, transaction) => {
    switch (option.toLowerCase()) {
      case 'view':
        break;
      case 'edit':
        break;
      case 'use':
        this.itemSelectinChangedHandler(transaction);
        break;
      default:
        break;
    }
  }
  render() {
    const { searchTextError, showSearchButton, searchPanelOpen, searchedTransactions } = this.state;
    const { loading } = this.props;
    let message = null;
    if (searchTextError) {
      message = (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={searchTextError}
          autoHideDuration={300}
          onClose={this.setState({ searchTextError: false })}
          transition={(props) => transitionUp(props)}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">'Alpha Numeric characters are not allowed'</span>}
        />
      );
    }
    return (
      <div>
        <Fade in={showSearchButton} timeout={{ enter: 800, exit: 0 }} mountOnEnter unmountOnExit>
          <Button style={{ marginRight: '10px', marginTop: '10px' }} color='primary' variant='fab' aria-label="open" onClick={this.openSearchPanelHandler}>
            <Search />
          </Button>
        </Fade>
        <SearchPanel
          inputRef={this.inputRefHandler}
          value={this.state.searchValue}
          optionClicked={this.optionClickedHandler}
          changed={this.searchValueChangedHandler}
          searchClicked={this.searchClickedHandler}
          clearClicked={this.clearclickedHandler}
          loading={loading}
          open={searchPanelOpen}
          // itemSelected={this.itemSelectinChangedHandler}
          transactions={searchedTransactions}
          radioNames={['Names', 'Phone Number']}
          radioValue={this.state.radioValue}
          radioChanged={this.radioChangedHandler}
          closed={this.closeSearchPanelHandler}
          panelExited={this.panelExitHandler}
        />
        {message}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    searchedTransactions: state.transactions.searchedTransactions,
    loading: state.transactions.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchTransactions: (searchData) => {
      dispatch(actions.searchTransactions(searchData))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchTransaction));
