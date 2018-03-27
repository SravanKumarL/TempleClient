import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import withPoojaDetails from '../../hoc/withPoojaDetails/withPoojaDetails';
import { Receipt, SpeakerNotes, Edit, AddCircle, Remove } from 'material-ui-icons';
// import DatePicker from '../../components/UI/DatePicker/DatePicker';
import Dialog from '../../components/UI/Dialog/Dialog';
import ReportCriteria from './Containers/ReportCriteria';
import { convertToStartCase } from '../../shared/utility';
import * as actions from '../../../store/actions';
import constants from '../../../../store/sagas/constants'

const styles = theme => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
    alignContent: 'space-evenly',
    width: 160,
    boxShadow: theme.shadows[1],
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    height: 50,
    flexBasis: 136,
    margin: '10px',
    padding: '50px',
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

class Reports extends React.Component {
  state = {
    modalOpen: false,
    selectedOption: {},
    poojaDetails: null,
  }
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
  poojaReportsClickedHandler = () => {
    this.setState({
      modalOpen: true,
    });
  };
  closeHandler = () => {
    this.setState({
      modalOpen: false,
    });
  }
  getReportHandler = () => {
    this.closeHandler();
    this.props.history.push('/reports/managementReport');
  }
  closeDialogHandler = () => {
    this.setState({ modalOpen: false });
  }
  generateReportHandler = () => { }
  dateSelectionChangedHandler = () => { }
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
        />
      </Dialog>
    );
  }
  optionClickedHandler = (option) => {
    this.setState({ selectedOption: option, modalOpen: true });
  }
  getButtons = () => {
    const { classes } = this.props;
    const options = [
      { name: 'Pooja Report', color: '#F57C00', icon: <SpeakerNotes className={classes.icon} /> },
      { name: 'Management Report', color: '#00C853', icon: <Edit className={classes.icon} /> },
      { name: 'Temple Report', color: '#0288D1', icon: <Receipt className={classes.icon} /> },
      { name: 'Cancellations Report', color: '#512DA8', icon: <AddCircle className={classes.icon} /> },
      { name: 'Accounts Report', color: '#D50000', icon: <Remove className={classes.icon} /> },
    ];
    return (
      <Fragment>
        {options.map(option => {
          return (
            <Button
              key={option.name}
              style={{ backgroundColor: option.color }}
              raised
              color="primary"
              className={classes.button}
              onClick={() => this.optionClickedHandler(option)}
            >
              <div className={classes.iconButton}>
                {option.icon}
                <Typography type='button' gutterBottom align='center'>
                  {option.name}
                </Typography>
              </div>
            </Button>
          )
        })}
        {/* <Button
          onClick={this.poojaReportsClickedHandler}
          style={{ backgroundColor: '#03A9F4' }}
          raised
          color='primary'
          className={classes.button}>
          <div className={classes.iconButton}>
            <Edit className={classes.icon} />
            <Typography type='button' gutterBottom align='center' className={classes.text}>
              Management Report
      </Typography>
          </div>
        </Button>
        <Button
          style={{ backgroundColor: '#4CAF50' }}
          raised color='primary'
          className={classes.button}>
          <div className={classes.iconButton}>
            <SpeakerNotes className={classes.icon} />
            <Typography type='button' gutterBottom align='center' className={classes.text}>
              Accounts Report
      </Typography>
          </div>
        </Button> */}
      </Fragment>
    );
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        {this.getButtons()}
        {this.getModal()}
        {/* <Switch>
        </Switch> */}
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
    poojaDetails: state.poojas.poojaDetails,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getPoojaDetails: () => { dispatch(actions.fetchData(constants.Poojas)); },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withPoojaDetails(withStyles(styles)(Reports))));
