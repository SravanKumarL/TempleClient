import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import { blueGrey } from 'material-ui/colors'
import { Receipt, Pages, Event, AccountCircle } from 'material-ui-icons';
import Fade from 'material-ui/transitions/Fade';

import Transactions from '../../containers/Transactions/Transactions';
import Reports from '../../containers/Reports/Reports';
import Poojas from '../Poojas/Poojas';
import { DataGridWrapper } from '../DataGrid/dataGridWrapper';
import constants from '../../../store/sagas/constants';

function TabContainer(props) {
  return (
    <Typography component="div" style={{
      display: 'flex',
      flexDirection: 'column',
      background: 'white',
      color: 'black',
      height: '100%',
      marginLeft: 5,
      padding: 8 * 3,
      paddingTop: '10px',
      paddingBottom: '88px',
      marginRight: '40px',
      borderTopRightRadius: '10px,'
    }}>
      {props.children}
    </Typography >
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

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

class SimpleTabs extends React.Component {
  state = {
    activeTab: 'transactions',
  };

  handleChange = (event, value) => {
    this.setState({ activeTab: value });
  };

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
          {role==='admin' && <Tab label="Poojas" value='poojas' classes={newTabClasses} icon={<Event/>}/>}
          {role==='admin' && <Tab label="Users" value='users' classes={newTabClasses} icon={<AccountCircle/>}/>}
        </Tabs>
        <div className={classes.tabContainer}>
          {activeTab === 'transactions' &&
            <TabContainer>
              <Fade in={activeTab === 'transactions'} timeout={500} mountOnEnter unmountOnExit>
                <Transactions />
              </Fade>
            </TabContainer>}
          {activeTab === 'reports' &&
            <TabContainer>
              <Fade in={activeTab === 'reports'} timeout={500} mountOnEnter unmountOnExit>
                <Reports />
              </Fade>
            </TabContainer>}
          {activeTab === 'poojas' && 
          <TabContainer>
              <Fade in={activeTab === 'poojas'} timeout={500} mountOnEnter unmountOnExit>
                <Poojas />
              </Fade>
            </TabContainer>}
          {activeTab === 'users' && 
          <TabContainer>
              <Fade in={activeTab === 'users'} timeout={500} mountOnEnter unmountOnExit>
                <DataGridWrapper style={{flexGrow:1}} collection={constants.Users}/>
              </Fade>
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