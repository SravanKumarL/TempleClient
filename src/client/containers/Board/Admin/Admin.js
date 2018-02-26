import React from 'react';
import Button from 'material-ui/Button';
import { withRouter } from 'react-router-dom';

import Typography from 'material-ui/Typography';
import { SpeakerNotes, Edit, Delete, PersonAdd, Assignment, RemoveCircle, Update } from 'material-ui-icons';
import withStyles from 'material-ui/styles/withStyles';

import Aux from '../../../hoc/Wrapper/Wrapper';

const styles = theme => ({
  container: {
    width: '80vw',
    minHeight: '70vh',
    display: 'flex',
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    height: 75,
    width: 150,
    margin: '7px',
    padding: '25px',
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
    height: 30,
    width: 70,
  },
  iconButton: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttonText: {
    fontWeight: 'bold',
  }
});
class Admin extends React.Component {
  state = {
    options: {
      transactions: {
        editTransaction: {
          label: 'Edit',
          backgroundColor: '#FFB300',
        },
        deleteTransaction: {
          label: 'Delete',
          backgroundColor: '#D32F2F',
        },
      },
      users: {
        addUser: {
          label: 'Add',
          backgroundColor: '#8E24AA',
        },
        deleteUser: {
          label: 'Delete',
          backgroundColor: '#D32F2F',
        },
      },
      poojas: {
        Poojas: {
          label: 'poojas',
          backgroundColor: '#1E88E5',
        },
      },
      reports: {
        poojaReports: {
          label: 'Reports',
          backgroundColor: '#7CB342',
        }
      },
    }
  }
  getIcon = (iconName) => {
    const { classes } = this.props
    switch (iconName) {
      case 'editTransaction':
        return (<Edit className={classes.icon} />);
      case 'deleteTransaction':
        return (<Delete className={classes.icon} />);
      case 'addUser':
        return (<PersonAdd className={classes.icon} />);
      case 'deleteUser':
        return (<RemoveCircle className={classes.icon} />);
      case 'Poojas':
        return (<Assignment className={classes.icon} />);
      case 'deletePooja':
        return (<Assignment className={classes.icon} />);
      case 'updatePooja':
        return (<Update className={classes.icon} />);
      case 'reports':
        return (<SpeakerNotes className={classes.icon} />);
      default:
        break;
    }
  }
  getButtons = (optionKey) => {
    const { classes } = this.props;
    const optionsArray = [];
    for (let key in this.state.options[optionKey]) {
      optionsArray.push({
        id: key,
        config: this.state.options[optionKey][key],
      });
    }
    return (
      <Aux>
        {optionsArray.map(option => (
          <Button
            key={option.id}
            onClick={this.clicked.bind(this, option.config.label)}
            style={{ backgroundColor: option.config.backgroundColor }}
            raised
            color='primary'
            className={classes.button}>
            <div className={classes.iconButton}>
              {this.getIcon(option.id)}
              <Typography type='button' gutterBottom align='center' className={classes.text}>
                {option.config.label}
              </Typography>
            </div>

          </Button>
        ))
        }
      </Aux>
    );
  }

  clicked = (option) => {
    const { history } = this.props;
    switch (option) {
      case 'poojas':
        history.push('/poojas');
        break;
      default:
        break;
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        {/* <ExpansionPanel defaultExpanded title='Transactions'> */}
          {this.getButtons('transactions')}
        {/* </ExpansionPanel> */}
        {/* <ExpansionPanel defaultExpanded title='Users'> */}
          {this.getButtons('users')}
        {/* </ExpansionPanel> */}
        {/* <ExpansionPanel title='Poojas'> */}
          {this.getButtons('poojas')}
        {/* </ExpansionPanel> */}
        {/* <ExpansionPanel title='Reports'> */}
          {this.getButtons('reports')}
        {/* </ExpansionPanel> */}
      </div>
    );
  }
};

export default withRouter(withStyles(styles)(Admin));