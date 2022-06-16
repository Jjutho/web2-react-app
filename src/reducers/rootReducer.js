import * as authenticationActions from '../actions/authenticationActions';

const initialState = {
  showLoginDialog: false,
  loginPending: false,
  user: null
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case authenticationActions.SHOW_LOGIN_DIALOG:
      return {
        ...state,
        showLoginDialog: true,
        error: null
      };
    case authenticationActions.HIDE_LOGIN_DIALOG:
      return {
        ...state,
        showLoginDialog: false,
        error: null
      };
    case authenticationActions.LOGIN_PENDING:
      return {
        ...state,
        loginPending: true,
        error: null
      };
    case authenticationActions.LOGIN_SUCCESS:
      return {
        ...state,
        showLoginDialog: false,
        loginPending: false,
        user: action.user,
        accessToken: action.accessToken,
        error: null
      };
    case authenticationActions.LOGIN_FAILURE:
      return {
        ...state,
        loginPending: false,
        error: 'Login failed'
      };
    case authenticationActions.LOGOUT:
      return {
        ...state,
        user: null,
        accessToken: null,
        error: null
      };
    default:
      return state;
  }
}

export default rootReducer;
