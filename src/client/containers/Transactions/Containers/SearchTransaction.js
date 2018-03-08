import React from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Search from 'material-ui-icons/Search';
import Fade from 'material-ui/transitions/Fade';

import SearchPanel from '../../../components/UI/SearchPanel/SearchPanel';
import * as actions from '../../../../store/actions';

class SearchTransaction extends React.Component {
  constructor() {
    super();
    this.baseState = this.state;
  }

  state = {
    searchPanelOpen: false,
    showSearchButton: true,
    radioValue: 'Phone Number',
  };

  openSearchPanelHandler = () => this.setState({ showSearchButton: false, searchPanelOpen: true, });

  closeSearchPanelHandler = () => this.setState({ searchPanelOpen: false, });

  panelExitHandler = () => this.setState({ showSearchButton: true, });

  itemSelectinChangedHandler = (selectedItem) => this.props.itemSelected(selectedItem);

  searchValueChangedHandler = (event) => {
    const { value } = event.target;
    this.setState({searchValue: value});
  }

  radioChangedHandler = (event) => {
    const { value } = event.target;
    this.setState({radioValue: value,});
  }

  searchClickedHandler = () => {
    const { radioValue } = this.state;
    this.props.searchTransactions({ phoneNumber: this.state.searchValue, selection: radioValue });
  }

  render() {
    const { searchedTransactions } = this.props;
    const { showSearchButton, searchPanelOpen } = this.state;
    return (
      <div>
        <Fade in={showSearchButton} timeout={{ enter: 800, exit: 0 }} mountOnEnter unmountOnExit>
          <Button style={{ marginRight: '10px', marginTop: '10px' }} color='primary' fab aria-label="open" onClick={this.openSearchPanelHandler}>
            <Search />
          </Button>
        </Fade>
        <SearchPanel
          value={this.state.searchValue}
          changed={this.searchValueChangedHandler}
          searchClicked={this.searchClickedHandler}
          open={searchPanelOpen}
          itemSelected={this.itemSelectinChangedHandler}
          transactions={searchedTransactions}
          radioNames={['Names', 'Phone Number']}
          radioValue={this.state.radioValue}
          radioChanged={this.radioChangedHandler}
          closed={this.closeSearchPanelHandler}
          panelExited={this.panelExitHandler}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    searchedTransactions: state.transactions.searchedTransactions,
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
