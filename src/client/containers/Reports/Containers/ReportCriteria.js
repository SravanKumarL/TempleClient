import React from 'react';
import Typography from 'material-ui/Typography';
import Field from '../../../components/UI/Field/Field';
import { getCurrentDate } from '../../../shared/utility';

const initialState = { value: '', poojaValue: '' };
class ReportCriteria extends React.Component {
  state = { ...initialState };
  poojaChangedHandler = (event, inputIdentifier) => {
    const { poojaSelected } = this.props;
    if (poojaSelected)
      poojaSelected(event);
    this.setState({ poojaValue: event });
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
    return (
      <div style={{ display: 'flex', width: 450, flexGrow: 1, flexDirection: 'column' }}>
        <Typography variant='subheading' align='center'>{heading}</Typography>
        {pooja}
        <Field
          elementType='date'
          changed={dateSelectionChanged}
          maxDate={getCurrentDate()}
        />
      </div>
    );
  }
}

export default ReportCriteria;