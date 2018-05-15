import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withRouter from 'react-router-dom/withRouter';
import withStyles from 'material-ui/styles/withStyles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Event from 'material-ui-icons/Event';
import Poll from 'material-ui-icons/Poll';
import ImportContacts from 'material-ui-icons/ImportContacts';

import Dialog from '../../components/UI/Dialog/Dialog';
import ReportCriteria from './Containers/ReportCriteria';
import { convertToStartCase, getCurrentDate } from '../../shared/utility';
import Orange from 'material-ui/colors/orange';
import Blue from 'material-ui/colors/blue';
import Green from 'material-ui/colors/green';
import constants from '../../../store/sagas/constants'
import DataGridWrapper from '../DataGrid/dataGridWrapper';
import withPoojaDetails from '../../hoc/withPoojaDetails/withPoojaDetails';
import createContainer from '../../hoc/createContainer/createContainer';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'space-evenly',
    width: 190,
    marginRight: 20,
    boxShadow: theme.shadows[3],
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
  selectedDates: getCurrentDate(),
  poojaDetails: null,
  reportOpen: false,
  pooja: ''
};
class Reports extends React.Component {
  state = { ...initialState };
  componentWillReceiveProps(nextProps) {
    const { poojaDetails } = nextProps;
    if (poojaDetails) {
      const options = Object.keys(poojaDetails).map(key => {
        const newkey = convertToStartCase(key);
        return { value: newkey, label: newkey }
      });
      this.setState({ poojaDetails: options });
    }
  }
  //UI State Handlers
  poojaReportsClickedHandler = () => { this.setState({ modalOpen: true }); };
  closeHandler = () => { this.setState({ modalOpen: false, }); }
  closeDialogHandler = () => { this.setState({ modalOpen: false }); }
  generateReportHandler = () => this.setState({ reportOpen: true, modalOpen: false });
  dateSelectionChangedHandler = (selectedDates) => this.setState({ selectedDates });
  poojaSelected = (pooja) => this.setState({ pooja });
  optionClickedHandler = (option) => { this.setState({ selectedOption: option, modalOpen: true, reportOpen: false }); }

  getReportHandler = () => {
    this.closeHandler();
    this.props.history.push('/reports/managementReport');
  }
  getModal = () => {
    const { modalOpen, selectedOption } = this.state;
    return (
      <Dialog
        open={modalOpen}
        primaryClicked={this.generateReportHandler}
        primaryText='Generate Report'
        secondaryText='Close'
        secondaryClicked={this.closeDialogHandler}
        title={selectedOption.name}
        cancelled={this.closeDialogHandler}>
        <ReportCriteria
          poojas={this.state.poojaDetails}
          title={selectedOption.name}
          dateSelectionChanged={this.dateSelectionChangedHandler}
          poojaSelected={this.poojaSelected}
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
                <Typography variant='button' gutterBottom align='center'>
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
    const { reportOpen, selectedOption, selectedDates, pooja } = this.state;
    const { classes } = this.props;
    let searchObj = {};
    if (selectedOption.name) {
      searchObj = { ReportName: selectedOption.name.split(' ')[0], selectedDates };
      if (searchObj.ReportName === 'Pooja')
        searchObj = { ...searchObj, pooja };
    }
    return (
      <div style={{ display: 'flex', height: '100%', flexGrow: 1 }}>
        <div className={classes.container}>
          {this.getButtons()}
          {this.getModal()}
        </div>
        {reportOpen &&
          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }} >
            <Typography variant='display1' align='center' style={{ marginBottom: 20 }}> {selectedOption.name} </Typography>
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

export default withRouter(createContainer(withPoojaDetails(withStyles(styles)(Reports), mapStateToProps)));
