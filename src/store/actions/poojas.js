import * as actionTypes from './actionTypes';

export const addPooja = (poojaDetails) => {
  return {
    type: actionTypes.ADD_POOJA,
    poojaDetails
  }
}

export const addPoojaStarted = (poojaDetails) => {
  return {
    type: actionTypes.ADD_POOJA_START,
  }
}

export const addPoojaSuccess = (message) => {
  return {
    type: actionTypes.ADD_POOJA_SUCCESS,
    message
  }
}

export const addPoojaFail = (error) => {
  return {
    type: actionTypes.ADD_POOJA_START,
    error
  }
}

export const getPoojaDetails = () => {
  return {
    type: actionTypes.GET_POOJADETAILS,
  }
}
export const getPoojaDetailsStarted = () => {
  return {
    type: actionTypes.GET_POOJADETAILS_START,
  }
}
export const getPoojaDetailsSuccess = (poojaDetails) => {
  return {
    type: actionTypes.GET_POOJADETAILS_SUCCESS,
    poojaDetails,
  }
}

export const getPoojaDetailsFail = (error) => {
  return {
    type: actionTypes.GET_POOJADETAILS_FAIL,
    error
  }
}
