import React from 'react'
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';

import SearchPanel from '../../../components/UI/SearchPanel/SearchPanel';
import createContainer from '../../../hoc/createContainer/createContainer';

const transitionUp = (props) => { return (<Slide direction="left" {...props} />) };

const initialState = {
  searchPanelOpen: false,
  showSearchButton: true,
  searchValue: '',
  searchedTransactions: null,
  prevProps: {},
  searchTextError: false,
  showOverflow: false,
  count: 0,
  countFetched: false,
};
const pageSize = 50;
class SearchTransaction extends React.Component {
  constructor() {
    super();
    this.baseState = this.state;
  }
  state = { ...initialState };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.searchValue !== prevState.prevProps.searchValue) {
      return { prevProps: { ...prevState.prevProps, searchValue: nextProps.searchValue } };
    }
    return null;
  }
  openSearchPanelHandler = () => this.setState({ showSearchButton: false, searchPanelOpen: true, });
  closeSearchPanelHandler = () => this.setState({ searchPanelOpen: false });
  panelExitHandler = () => this.setState({ showSearchButton: true, });
  searchValueChangedHandler = (event) => {
    const value = event.target.value;
    this.props.searchTransactions({ searchValue: value, skip: this.state.count, take: pageSize }, !this.state.countFetched); //update count in scroll event
    this.setState({ searchValue: value, isLoading: true, countFetched: true });
  }
  scrollHandler = () => {
    const count = this.state.count + pageSize;
    this.setState({ count });
    this.props.searchTransactions({ searchValue: this.state.searchValue, skip: count, take: pageSize });
  }
  clearclickedHandler = () => {
    this.setState({ searchValue: '', searchedTransactions: null });
    this.input.focus();
  }
  inputRefHandler = (node) => { this.input = node; }
  optionClickedHandler = (option, transaction) => {
    if (option.toLowerCase() === 'use') {
      this.setState({ ...this.baseState })
    }
    this.props.itemSelected(option, transaction);
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
        <Fade in={showSearchButton} timeout={{ enter: 500, exit: 0 }} mountOnEnter unmountOnExit>
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
    totalCount: state.transactions.totalCount
  }
}

export default createContainer(SearchTransaction, mapStateToProps);
