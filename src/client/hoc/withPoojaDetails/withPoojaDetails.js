import React, { Component } from 'react';
import { updateObject } from '../../shared/utility';

export const withPoojaDetails = (WrappedComponent) => {
  return class withPoojaDetails extends Component {
    state = {
      poojaDetails: null,
    };
    componentDidMount() {
      this.props.getPoojaDetails();
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.poojaDetails) {
        const poojaDetails = nextProps.poojaDetails.map(item => ({
          [`${item.poojaName}`]: item.amount,
        }))
          .reduce(function (acc, item) {
            return Object.assign(acc, item);
          }, {});
        this.setState({ poojaDetails });
      }
    }
    render() {
      const updatedProps = updateObject(this.props, { poojaDetails: this.state.poojaDetails });
      return (
        <WrappedComponent {...updatedProps} />
      );
    }
  }
}



export default withPoojaDetails;