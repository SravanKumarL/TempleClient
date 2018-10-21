import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Event from '@material-ui/icons/Event';
import Poll from '@material-ui/icons/Poll';
import ImportContacts from '@material-ui/icons/ImportContacts';
import uuidV1 from 'uuid/v1';
import Dialog from '../../components/UI/Dialog/Dialog';
import ReportCriteria from './Containers/ReportCriteria';
import {
  convertToStartCase,
  getCurrentDate,
  parseDateObject,
  getFormattedDate
} from '../../shared/utility';
import Blue from '@material-ui/core/colors/blue';
import Green from '@material-ui/core/colors/green';
import constants from '../../../store/sagas/constants'
import ReportsGrid from '../DataGrid/reportsGrid';
import createContainer from '../../hoc/createContainer/createContainer';
import { REPORT_TYPES } from '../../../store/constants/reports';
import report from '../../../assets/mainReport.svg';

const { POOJA, MANAGEMENT, ACCOUNTS } = REPORT_TYPES;
const ModalDialog = ({
  modalOpen,
  selectedOption,
  selectedDates,
  selectedPooja,
  generateDisabled,
  generateReportHandler,
  closeHandler,
  closeDialogHandler,
  poojaDetails,
  dateSelectionChangedHandler,
  forAllUsersChangedHandler,
  poojaSelected,
  forAllUsers
}) => {
  return (
    <Dialog
      open={modalOpen}
      primaryClicked={generateReportHandler}
      handleClose={closeHandler}
      primaryText='Generate Report'
      secondaryText='Close'
      secondaryClicked={closeDialogHandler}
      title={selectedOption.name}
      primaryDisabled={generateDisabled}
      cancelled={closeDialogHandler}>
      <ReportCriteria
        poojas={poojaDetails}
        title={selectedOption.name}
        selectedDates={selectedDates}
        dateSelectionChanged={dateSelectionChangedHandler}
        forAllUsersChangedHandler={forAllUsersChangedHandler}
        poojaSelected={poojaSelected}
        selectedPooja={selectedPooja}
        forAllUsers={forAllUsers}
      />
    </Dialog>
  );
}
const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'auto',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      flexGrow: 1,
      overflow: 'auto'
    }
  },
  container: {
    display: 'flex',
    height: 92,
    boxShadow: theme.shadows[10],
    marginTop: 'auto',
    width: '100%',
    order: 1,
    marginBottom: 10,
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      height: 'auto',
      marginTop: 3,
      order: 'initial',
      flexWrap: 'wrap',
      alignContent: 'space-evenly',
      width: 220,
      flexGrow: 'initial',
      background: 'initial',
      boxShadow: 'initial',
    }
  },
  button: {
    margin: 8,
    borderRadius: 4,
    width: '30%',
    [theme.breakpoints.up('sm')]: {
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
    }
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
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      height: 50,
      width: 100,
    }
  },
  iconButton: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    }
  },
  buttonText: {
    fontWeight: 'bold',
  },
  dataGrid: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexGrow: 1
    }
  },
  centerTextboxContainer: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTextbox: {
    display: 'flex',
    flexDirection: 'column',
    height: '40vh',
    width: '30vw',
    border: '2px dashed #eee',
    marginBottom: '10vh',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      height: '50vh',
      width: '75vw',
      border: '2px dashed #eee',
      justifyContent: 'center',
      alignItems: 'center',
    }
  },
  centerText: {
    fontSize: 16,
    [theme.breakpoints.up('sm')]: {
      fontSize: 24,
    }
  }
});
const signatureStyle = { padding: '0.1em 2em', fontWeight: 'bold' };

const initialState = {
  modalOpen: false,
  selectedOption: {},
  selectedDates: [getCurrentDate()],
  printTitle: '',
  poojaDetails: null,
  reportOpen: false,
  selectedPooja: '',
  selectedGenerateOption: {},
  searchObj: {},
  generateDisabled: false,
  generateClicked: false
};
class Reports extends React.Component {
  state = { ...initialState };
  static getDerivedStateFromProps(nextProps, prevState) {
    const { poojaDetails } = nextProps;
    const { selectedOption, selectedPooja } = prevState;
    let newState = { ...prevState };
    if (poojaDetails) {
      const options = poojaDetails.map(pooja => {
        return { value: pooja.poojaName, label: convertToStartCase(pooja.poojaName) }
      });
      newState = { ...newState, poojaDetails: options };
    }
    let generateDisabled = false;
    if (selectedOption.name === POOJA) {
      generateDisabled = true;
      if (selectedPooja && selectedPooja !== '') {
        generateDisabled = false;
      }
    }
    newState = { ...newState, generateDisabled };
    return newState;
  }
  //UI State Handlers
  poojaReportsClickedHandler = () => { this.setState({ modalOpen: true }); };
  closeDialogHandler = () => this.setState({ modalOpen: false });
  generateReportHandler = () => {
    this.props.resetEntity(constants.Reports);
    let searchObj = {};
    if (this.state.selectedOption.name) {
      searchObj = {
        ReportName: this.state.selectedOption.name.split(' ')[0],
        selectedDates: parseDateObject(this.state.selectedDates).map(parsedDate => getCurrentDate(parsedDate)),
        id: uuidV1()
      };
      if (searchObj.ReportName === POOJA)
        searchObj = { ...searchObj, pooja: this.state.selectedPooja };
      else if (searchObj.ReportName === MANAGEMENT)
        searchObj = { ...searchObj, createdBy: this.props.user };
    }
    this.setState(prevState => ({
      reportOpen: true, modalOpen: false, searchObj,
      selectedGenerateOption: this.state.selectedOption, generateClicked: !prevState.generateClicked,
    }));
  }
  dateSelectionChangedHandler = (selectedDates, selectedDays, datePickerMode) => {
    this.printTitle = 'generated for ' + getFormattedDate(selectedDates, datePickerMode, selectedDays);
    this.setState({ selectedDates });
  }
  poojaSelected = (selectedPooja) => this.setState({ selectedPooja });
  optionClickedHandler = (option) => {
    this.props.onDatepickerReset(initialState.selectedDates);
    this.props.resetAllUsersCheck();
    this.setState({
      selectedOption: option, modalOpen: true,
      selectedDates: [...initialState.selectedDates], selectedPooja: ''
    });
  }
  forAllUsersChangedHandler = e => {
    this.props.onMgmtReportAllUsersToggled(e.target.checked, 'reports');
  }
  getButtons = () => {
    const { classes } = this.props;
    const options = [
      { name: POOJA, color: '#DE6400', icon: <Event className={classes.icon} /> },
      { name: MANAGEMENT, color: Blue[500], icon: <Poll className={classes.icon} /> },
      { name: ACCOUNTS, color: Green[500], icon: <ImportContacts className={classes.icon} /> },
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
  componentDidUpdate(prevProps, prevState) {
    if (this.state.generateClicked !== prevState.generateClicked) {
      this.setState({ printTitle: this.printTitle });
      this.printTitle = '';
    }
  }
  render() {
    const { reportOpen, selectedGenerateOption, poojaDetails, generateDisabled, searchObj,
      modalOpen, selectedOption, selectedPooja, selectedDates, printTitle } = this.state;
    const { classes, user, forAllUsers } = this.props;
    const signature = (<div style={{ alignSelf: 'flex-end' }}>
      <Typography variant='caption' align='right' style={signatureStyle}>
        Generated on : <strong>{getCurrentDate()}</strong>
      </Typography>
      <Typography variant='caption' align='right' style={signatureStyle}>
        Generated by: <strong>{user}</strong>
      </Typography>
    </div>);
    const selectedReportName = selectedGenerateOption.name;
    const defaultSorting = selectedReportName === POOJA ? [{ columnName: 'gothram', direction: 'asc' }] : [];
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          {this.getButtons()}
          <ModalDialog
            modalOpen={modalOpen}
            selectedOption={selectedOption}
            selectedDates={selectedDates}
            selectedPooja={selectedPooja}
            generateDisabled={generateDisabled}
            poojaDetails={poojaDetails}
            poojaSelected={this.poojaSelected}
            closeHandler={this.closeHandler}
            closeDialogHandler={this.closeDialogHandler}
            generateReportHandler={this.generateReportHandler.bind(this)}
            dateSelectionChangedHandler={this.dateSelectionChangedHandler}
            forAllUsersChangedHandler={this.forAllUsersChangedHandler}
            forAllUsersChecked={forAllUsers}
          ></ModalDialog>
        </div>
        {reportOpen ?
          <div className={classes.dataGrid}>
            <ReportsGrid title={`${selectedReportName} Report ${printTitle}`} collection={constants.Reports}
              searchCriteria={searchObj} readOnly={true} printTitle={printTitle} signature={signature} defaultSorting={defaultSorting} />
            {signature}
          </div> :
          <div className={classes.centerTextboxContainer}>
            <div className={classes.centerTextbox}>
              <img style={{ width: '100%', height: '100%', flexGrow: 1 }} src={report} alt="Reports" />
              <Typography variant='title' className={classes.centerText} align='center'>Please select a Report to continue... </Typography>
            </div>
          </div>
        }
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
    forAllUsers: state.ManagementReport.forAllUsers
  }
}
export default createContainer(withStyles(styles)(Reports), mapStateToProps);
