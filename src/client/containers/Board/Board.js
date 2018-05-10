import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import blueGrey from 'material-ui/colors/blueGrey'
import Receipt from 'material-ui-icons/Receipt';
import Pages from 'material-ui-icons/Pages';
import Event from 'material-ui-icons/Event';
import AccountCircle from 'material-ui-icons/AccountCircle';

import Transactions from '../../containers/Transactions/Transactions';
import Reports from '../../containers/Reports/Reports';
import Poojas from '../Poojas/Poojas';
import DataGridWrapper from '../DataGrid/dataGridWrapper';
import constants from '../../../store/sagas/constants';
import TabContainer from './TabContainer';


const styles = theme => ({
  root: {
    backgroundColor: blueGrey[800],
    flexGrow: 1,
  },
  flexContainer: {
    display: 'inline-flex',
  },
  indicator: {
    background: 'white',
  },
  rootInheritSelected: {
    background: 'white !important',
    width: 216,
    height: 75,
    color: 'green !important',
    fontWeight: 'bold',
  },
  wrapper: {
    flexDirection: 'row',
  },
  rootInherit: {
    margin: 5,
    marginTop: 0,
    marginBottom: 10,
    borderRadius: 8,
    height: 60,
    width: 216,
    color: '#eee',
    background: blueGrey[700],
    boxShadow: theme.shadows[17],
  },
  labelContainer: {
    paddingLeft: 8,
    paddingRight: 12,
  },
  tabContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100%',
  },
  span: {
    height: 18,
    background: 'white',
    color: blueGrey[500],
    textAlign: 'center',
    paddingTop: 20,
    transiton: 'initial',
  },
  label: {
    fontSize: 16,
  }
});

const initialState = { activeTab: 'transactions' };
class SimpleTabs extends React.Component {
  
  state = { ...initialState };

  handleChange = (event, value) => { this.setState({ activeTab: value }); };

  render() {
    const { classes, role } = this.props;
    const { activeTab } = this.state;
    const newTabClasses = {
      textColorInherit: classes.rootInherit,
      textColorInheritSelected: classes.rootInheritSelected,
      wrapper: classes.wrapper,
      labelContainer: classes.labelContainer,
      label: classes.label,
    };
    return (
      <div className={classes.root}>
        <Tabs
          classes={{
            root: classes.root,
            flexContainer: classes.flexContainer,
            indicator: classes.span,
          }}
          fullWidth
          value={activeTab}
          onChange={this.handleChange}
        >
          <Tab classes={newTabClasses} label="Transactions" value='transactions' icon={<Receipt />} />
          <Tab label="Reports" value='reports' classes={newTabClasses} icon={<Pages />} />
          {role === 'admin' && <Tab label="Poojas" value='poojas' classes={newTabClasses} icon={<Event />} />}
          {role === 'admin' && <Tab label="Users" value='users' classes={newTabClasses} icon={<AccountCircle />} />}
        </Tabs>
        <div className={classes.tabContainer}>
          {activeTab === 'transactions' &&
            <TabContainer>
              <Transactions />
            </TabContainer>}
          {activeTab === 'reports' &&
            <TabContainer>
              <Reports />
            </TabContainer>}
          {activeTab === 'poojas' &&
            <TabContainer>
              <Poojas />
            </TabContainer>}
          {activeTab === 'users' &&
            <TabContainer>
              <DataGridWrapper style={{ flexGrow: 1 }} collection={constants.Users} />
            </TabContainer>}
        </div>
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);