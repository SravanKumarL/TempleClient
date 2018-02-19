import React from 'react';
import Button from 'material-ui/Button';
import { withRouter } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import { Receipt, SpeakerNotes, Edit } from 'material-ui-icons';
import withStyles from 'material-ui/styles/withStyles';
import Aux from '../../../hoc/Wrapper/Wrapper';

const styles = theme => ({
  button: {
    display: 'flex',
    flexDirection: 'column',
    height: 150,
    width: 300,
    marginTop: '5vh',
    marginBottom: 'auto',
    marginRight: 100,
    // margin: 'auto',
    // padding: '8px',
    borderRadius: '5px',
    '&:hover': {
      boxShadow: '0px 0px 10px #000000',
      zIndex: 2,
      transition: 'all 200ms ease-in',
      transform: 'scale(1.2)',
    },
  },
  text: {
    display: 'flex',
    color: 'white',
    justifyContent: 'center',
  },
  icon: {
    display: 'flex',
    height: 100,
    width: 200,
  },
  iconButton: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttonText: {
    fontWeight: 'bold',
  }
});
class User extends React.Component {
  openTransactionsHandler = () => {
    this.props.history.push('/transactions/create');
  }
  editTransactionsHandler = () => {
    this.props.history.push('/transactions/edit')
  }
  reportsHandler = () => {
    this.props.history.push('/reports');
  }
  render() {
    const { classes } = this.props;
    return (
      <Aux>
        <Button
          style={{ backgroundColor: '#FFB300' }}
          raised
          color="primary"
          className={classes.button}
          onClick={this.openTransactionsHandler}
        >
          <div className={classes.iconButton}>
            <Receipt className={classes.icon} />
            <Typography type='button' gutterBottom align='center'>
              New Transaction
      </Typography>
          </div>
        </Button>
        <Button
          onClick={this.editTransactionsHandler}
          style={{ backgroundColor: '#03A9F4' }}
          raised
          color='primary'
          className={classes.button}>
          <div className={classes.iconButton}>
            <Edit className={classes.icon} />
            <Typography type='button' gutterBottom align='center' className={classes.text}>
              Edit Transaction
      </Typography>
          </div>
        </Button>
        <Button
          onClick={this.reportsHandler}
          style={{ backgroundColor: '#4CAF50' }}
          raised
          color='primary'
          className={classes.button}>
          <div className={classes.iconButton}>
            <SpeakerNotes className={classes.icon} />
            <Typography type='button' gutterBottom align='center' className={classes.text}>
              Reports
      </Typography>
          </div>
        </Button>
      </Aux>
    )
  }
};

export default withRouter(withStyles(styles)(User));