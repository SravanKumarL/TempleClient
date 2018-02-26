import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { Receipt, SpeakerNotes, Edit } from 'material-ui-icons';
import Modal from '../../components/UI/Modal/Modal';
import DatePicker from '../../components/UI/DatePicker/DatePicker';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexWrap: 'wrap',
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    height: 75,
    width: 200,
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
  getModal = () => {
    const { classes } = this.props;
    return (
      <Modal open={this.state.modalOpen} closed={this.closeHandler} title='Pooja Report'>
        <div className={classes.modalContent}>
          <DatePicker label='select a date' value={new Date()} changed={this.dateChangedHandler} />
          <Button raised color='primary' align='center' onClick={this.getReportHandler} gutterBottom> Get Report </Button>
        </div>
      </Modal>
    );
  }
  getButtons = () => {
    const { classes } = this.props;
    return (
      <Fragment>
        <Button
          style={{ backgroundColor: '#FFB300' }}
          raised
          color="primary"
          className={classes.button}
          onClick={this.poojaReportsClickedHandler}
        >
          <div className={classes.iconButton}>
            <Receipt className={classes.icon} />
            <Typography type='button' gutterBottom align='center'>
              Pooja Report
      </Typography>
          </div>
        </Button>
        <Button
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
        </Button>
      </Fragment>
    );
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container} style={{ flexDirection: 'row' }}>
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
  }
}
export default withRouter(connect(mapStateToProps)(withStyles(styles)(Reports)));
