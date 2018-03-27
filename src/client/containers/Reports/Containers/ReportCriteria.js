import React from 'react';
import Typography from 'material-ui/Typography';
// import TextField from '../../components/UI/TextField/TextField';
import Field from '../../../components/UI/Field/Field';
class ReportCriteria extends React.Component {
  state = {
    value: '',
    poojaValue: '',
  }
  poojaChangedHandler = (event, inputIdentifier) => {
    this.setState({ poojaValue: event })
  }
  render() {
    const { title, dateSelectionChanged, poojas } = this.props;
    const heading = `Select From Date and To Date to generate ${title}`;
    let pooja = null;
    if (title.trim().toLowerCase() === 'pooja report') {
      const elementConfig = {
        options: poojas
      }
      pooja = (
        <Field
          elementType='singleselect'
          value={this.state.poojaValue}
          changed={this.poojaChangedHandler}
          elementConfig={elementConfig}
          label='Pooja Name'
        />
      )
    }
    let option = (
      <div style={{ display: 'flex', width: 450, flexGrow: 1, flexDirection: 'column' }}>
        <Typography type='subheading' align='center'>{heading}</Typography>
        {pooja}
        <Field
          elementType='date'
          changed={dateSelectionChanged}
        />
      </div>
    );

    return option;
  }
}

export default ReportCriteria;