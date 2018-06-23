import React, { Component } from 'react';
import createContainer from '../createContainer/createContainer';
import { updateObject } from '../../shared/utility';
import constants from '../../../store/sagas/constants';

const initialState = { poojaDetails: null };

export const withPoojaDetails = (WrappedComponent) => {
  class withPoojaDetails extends Component {
    state = { ...initialState };
    componentDidMount() {
      this.props.fetchEntityData(constants.Poojas);
    }
    static getDerivedStateFromProps(nextProps) {
      if (nextProps.poojaDetails) {
        const poojaDetails = nextProps.poojaDetails.map(item => ({
          [`${item.poojaName}`]: item.amount,
        }))
          .reduce(function (acc, item) {
            return Object.assign(acc, item);
          }, {});
        return { poojaDetails };
      }
      return null;
    }
    render() {
      const updatedProps = updateObject(this.props, { poojaDetails: this.state.poojaDetails });
      return (<WrappedComponent {...updatedProps} />
      );
    }
  }
  const mapStateToProps = (state, ownProps) => ({ poojaDetails: state.poojas.rows });
  return createContainer(withPoojaDetails, mapStateToProps);
}

export default withPoojaDetails;