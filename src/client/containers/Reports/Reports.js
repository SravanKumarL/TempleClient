import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Event from '@material-ui/icons/Event';
import Poll from '@material-ui/icons/Poll';
import ImportContacts from '@material-ui/icons/ImportContacts';

import Dialog from '../../components/UI/Dialog/Dialog';
import ReportCriteria from './Containers/ReportCriteria';
import { convertToStartCase } from '../../shared/utility';
import Orange from '@material-ui/core/colors/orange';
import Blue from '@material-ui/core/colors/blue';
import Green from '@material-ui/core/colors/green';
import constants from '../../../store/sagas/constants'
import DataGridWrapper from '../DataGrid/dataGridWrapper';
import withPoojaDetails from '../../hoc/withPoojaDetails/withPoojaDetails';
import createContainer from '../../hoc/createContainer/createContainer';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'space-evenly',
    width: 220,
    marginRight: 20,
  // boxShadow: theme.shadows[3],
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    height: 50,
    flexBasis: 136,
    borderRadius: 10,
    margin: 'auto',
    padding: '80px',
    boxShadow: theme.shadows[5],
    '&:hover': {
      boxShadow: '0px 0px 10px #000000',
      zIndex: 2,
      transition: 'all 200ms ease-in',
      transform: 'scale(1.1)',
    },
  },
  text: {
    display: 'flex',
    color: 'white',
    justifyContent: 'center',
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  icon: {
    display: 'flex',
    height: 50,
    width: 100,
  },
  iconButton: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttonText: {
    fontWeight: 'bold',
  }
});

const initialState = {
  modalOpen: false,
  selectedOption: {},
  selectedDates: [],
  poojaDetails: null,
  reportOpen: false,
  selectedPooja: '',
  searchObj: {}
};
class Reports extends React.Component {
  state = { ...initialState };
  static getDerivedStateFromProps(nextProps, prevState) {
    const { poojaDetails } = nextProps;
    if (poojaDetails) {
      const options = Object.keys(poojaDetails).map(key => {
        const newkey = convertToStartCase(key);
        return { value: newkey, label: newkey }
      });
      return { ...prevState, poojaDetails: options };
    }
    return null;
  }
  //UI State Handlers
  poojaReportsClickedHandler = () => { this.setState({ modalOpen: true }); };
  closeHandler = () => { this.setState({ modalOpen: false, }); }
  closeDialogHandler = () => { this.setState({ modalOpen: false }); }
  generateReportHandler = () => {
    this.props.resetEntity(constants.Reports);
    let searchObj = {};
    if (this.state.selectedOption.name) {
      searchObj = { ReportName: this.state.selectedOption.name.split(' ')[0], selectedDates: this.state.selectedDates };
      if (searchObj.ReportName === 'Pooja')
        searchObj = { ...searchObj, pooja: this.state.selectedPooja };
    }
    this.setState({ reportOpen: true, modalOpen: false, searchObj });
  }
  dateSelectionChangedHandler = (selectedDates) => this.setState({ selectedDates });
  poojaSelected = (selectedPooja) => this.setState({ selectedPooja });
  optionClickedHandler = (option) => { this.setState({ selectedOption: option, modalOpen: true, selectedDates: [], selectedPooja: '' }); }
  getReportHandler = () => {
    this.closeHandler();
    this.props.history.push('/reports/managementReport');
  }
  getModal = () => {
    const { modalOpen, selectedOption, selectedDates, selectedPooja } = this.state;
    return (
      <Dialog
        open={modalOpen}
        primaryClicked={this.generateReportHandler}
        handleClose={this.closeHandler}
        primaryText='Generate Report'
        secondaryText='Close'
        secondaryClicked={this.closeDialogHandler}
        title={selectedOption.name}
        cancelled={this.closeDialogHandler}>
        <ReportCriteria
          poojas={this.state.poojaDetails}
          title={selectedOption.name}
          selectedDates={selectedDates}
          dateSelectionChanged={this.dateSelectionChangedHandler}
          poojaSelected={this.poojaSelected}
          selectedPooja={selectedPooja}
        />
      </Dialog>
    );
  }
  getButtons = () => {
    const { classes } = this.props;
    const options = [
      { name: 'Pooja Report', color: Orange[500], icon: <Event className={classes.icon} /> },
      { name: 'Management Report', color: Blue[500], icon: <Poll className={classes.icon} /> },
      { name: 'Accounts Report', color: Green[500], icon: <ImportContacts className={classes.icon} /> },
    ];

    return (
      <Fragment>
        {options.map(option => {
          return (
            <Button
              key={option.name}
              style={{ backgroundColor: option.color }}
              variant='raised'
              color="primary"
              className={classes.button}
              onClick={() => this.optionClickedHandler(option)}
            >
              <div className={classes.iconButton}>
                {option.icon}
                <Typography variant='button' style={{ color: 'white' }} gutterBottom align='center'>
                  {option.name}
                </Typography>
              </div>
            </Button>
          )
        })}
      </Fragment>
    );
  }
  render() {
    const { reportOpen, selectedOption, searchObj } = this.state;
    const { classes } = this.props;
    return (
      <div style={{ display: 'flex', height: '100%', flexGrow: 1 }}>
        <div className={classes.container}>
          {this.getButtons()}
          {this.getModal()}
        </div>
        {reportOpen &&
          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }} >
            <Typography variant='headline' align='center' style={{ marginBottom: 20, marginTop: 20, fontWeight: 400 }}> {selectedOption.name} </Typography>
            <DataGridWrapper collection={constants.Reports} searchCriteria={searchObj} readOnly={true} />
          </div>}
      </div>
    );
  }
}

Reports.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    role: state.auth.role,
    poojaDetails: state.poojas.rows,
  }
}

export default createContainer(withPoojaDetails(withStyles(styles)(Reports), mapStateToProps));
