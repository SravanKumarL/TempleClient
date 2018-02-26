import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button';
import AccountCircle from 'material-ui-icons/AccountCircle';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';

const styles = theme => ({
  container: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '50px',
  },
  textFieldRoot: {
    margin: 'auto',
    width: '250px',
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  textFieldInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: '250px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
    marginBottom: '30px',
  },
  textFieldFormLabel: {
    fontSize: 18,
  },
  root: {
    width: 250,
    marginBottom: 30,
  },
  button: {
    margin: theme.spacing.unit,
    width: '250px',
    '&:hover': {
      boxShadow: '0px 0px 10px #000000',
      zIndex: 2,
      transition: 'all 200ms ease-in',
      transform: 'scale(1.1)',
    },
  },
});

const validate = values => {
  const errors = {}
  const requiredFields = [
    'username',
    'password',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.username &&
    /[^a-zA-Z0-9 ]/i.test(values.username)
  ) {
    errors.username = 'Invalid email address'
  }
  if (values.password && values.password.length < 3) {
    errors.password = 'Password should contain more than three characters'
  }
  return errors
}

const renderTextField = ({
  input,
  label,
  type = 'input',
  classes,
  placeholder,
  meta: { touched, error },
  ...custom
}) => (
    <TextField
      InputProps={{
        disableUnderline: true,
        classes: {
          root: classes.textFieldRoot,
          input: classes.textFieldInput,
        },
      }}
      placeholder={placeholder}
      InputLabelProps={{
        shrink: true,
        className: classes.textFieldFormLabel,
      }}
      type={type}
      error={touched && error !== undefined}
      {...input}
      {...custom}
    />
  )

class MaterialUiForm extends React.Component {
  state = {
    value: 0,
  };
  onSubmitHandler = ({ username, password }) => {
    const role = this.state.value === 0 ? 'user' : 'admin';
    this.props.onSubmit(username, password, role);
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, handleSubmit } = this.props;
    const { value } = this.state;
    return (
      <form className={classes.container} onSubmit={handleSubmit(this.onSubmitHandler)}>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction label="User" icon={<AccountCircle />} />
          <BottomNavigationAction label="Admin" icon={<AccountCircle />} />
        </BottomNavigation>
        <div>
          <Field
            name="username"
            component={renderTextField}
            label="Username"
            autoFocus
            placeholder={'Username'}
            classes={classes}
          />
        </div>
        <div>
          <Field
            placeholder={'Password'}
            name="password"
            type='password'
            classes={classes}
            component={renderTextField} label="Password" />
        </div>
        <div>
          <Button type='submit' raised size='large' className={classes.button} color='primary' >
            Sign In
        </Button>
        </div>
      </form>
    );
  }
}


export default reduxForm({
  form: 'LoginForm', // a unique identifier for this form
  validate,
})(withStyles(styles)(MaterialUiForm));