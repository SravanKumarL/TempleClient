import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import withPoojaDetails from '../../hoc/withPoojaDetails/withPoojaDetails';
import { Event, Poll, ImportContacts } from 'material-ui-icons';
// import DatePicker from '../../components/UI/DatePicker/DatePicker';
import Dialog from '../../components/UI/Dialog/Dialog';
import ReportCriteria from './Containers/ReportCriteria';
import { convertToStartCase } from '../../shared/utility';
import * as actions from '../../../store/actions';
import orange from 'material-ui/colors/orange';
import blue from 'material-ui/colors/blue';
import green from 'material-ui/colors/green';
import constants from '../../../store/sagas/constants'
import { DataGridWrapper } from '../DataGrid/dataGridWrapper';

const styles = theme => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
    alignContent: 'space-evenly',
    width: 200,
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

class Reports extends React.Component {
  state = {
    modalOpen: false,
    selectedOption: {},
    date:new Date(),
    poojaDetails: null,
    reportOpen:false
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
  generateReportHandler = () => this.setState({reportOpen:true});
  dateSelectionChangedHandler = (dates) => this.setState({date:dates[0]})
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
    const {reportOpen,selectedOption,date}=this.state;
    const options = [
      { name: 'Pooja Report', color: orange[500], icon: <Event className={classes.icon} /> },
      { name: 'Management Report', color: blue[500], icon: <Poll className={classes.icon} /> },
      // { name: 'Temple Report', color: '#0288D1', icon: <Receipt className={classes.icon} /> },
      // { name: 'Cancellations Report', color: '#512DA8', icon: <AddCircle className={classes.icon} /> },
      { name: 'Accounts Report', color: green[500], icon: <ImportContacts className={classes.icon} /> },
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
        {reportOpen && <DataGridWrapper collection={constants.Reports} 
          searchCriteria={{ReportName:selectedOption.name.split(' ')[0],Date:date}} readOnly={true}/>}
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
    poojaDetails: state.poojas.rows,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getPoojaDetails: () => { dispatch(actions.fetchData(constants.Poojas)); },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withPoojaDetails(withStyles(styles)(Reports))));
