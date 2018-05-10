import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import * as actions from '../../../store/actions';

const createContainer = (EnhancedComponent, mapStatetoProps) => {
  class Container extends React.PureComponent {
    constructor(props) {
      super(props);
      const { dispatch } = props;
      this.boundActionCreators = bindActionCreators(actions, dispatch);
    }
    render() {
      return (<EnhancedComponent {...this.props} {...this.boundActionCreators} />);
    }
  }
  Container.propTypes = {
    dispatch: PropTypes.func
  }
  return connect(mapStatetoProps)(Container)
} 
export default createContainer;