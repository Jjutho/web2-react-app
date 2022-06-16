import * as authenticationActions from '../actions/authenticationActions';

const initialState = {
  showLoginDialog: false,
  loginPending: false,
  user: null
};

function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case authenticationActions.SHOW_LOGIN_DIALOG:
      return {
        ...state,
        showLoginDialog: true
      };
    case authenticationActions.HIDE_LOGIN_DIALOG:
      return {
        ...state,
        showLoginDialog: false
      };
    case authenticationActions.AUTHENTICATION_PENDING:
      return {
        ...state,
        pending: true
      };
    case authenticationActions.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        showLoginDialog: false,
        pending: false,
        user: action.user,
        accessToken: action.accessToken
      };
    case authenticationActions.AUTHENTICATION_FAILURE:
      return {
        ...state,
        pending: false
      };
    case authenticationActions.LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}

export default authenticationReducer;
