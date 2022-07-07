import * as authenticationActions from '../actions/authenticationActions';
import * as editUserActions from '../actions/editUserActions';

const initialState = {
  showLoginDialog: false,
  loginPending: false,
  user: null,
  showEditDialog: false,
  getUsersPending: false,
  selectedUser: null,
  updateUserSuccess: false,
  users: null,
  showDeleteDialog: false,
  deleteUserPending: false,
  deleteUserSuccess: false,
  deleteUserFailure: false,
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
    case editUserActions.SHOW_DELETE_DIALOG:
      return {
        ...state,
        showDeleteDialog: true,
        error: null
      };
    case editUserActions.CLOSE_DELETE_DIALOG:
      return {
        ...state,
        showDeleteDialog: false,
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
    case editUserActions.CLOSE_EDIT_DIALOG:
      return {
        ...state,
        showEditDialog: false,
        updateUserSuccess: false,
        error: null
      };    
    case editUserActions.SHOW_EDIT_DIALOG:
      return {
        ...state,
        showEditDialog: true,
        error: null
      };
    case editUserActions.GET_USERS_PENDING:
      return {
        ...state,
        getUsersPending: true,
        error: null
      };
    case editUserActions.GET_USERS_SUCCESS:
      return {
        ...state,
        getUsersPending: false,
        users: action.users,
        error: null
      };
    case editUserActions.GET_USERS_FAILURE:
      return {
        ...state,
        getUsersPending: false,
        error: 'Getting users failed'
      };
    case editUserActions.SELECTED_USER:
      return {
        ...state,
        selectedUser: action.selectedUser,
        error: null
      };
    case editUserActions.UPDATE_USER_PENDING:
      return {
        ...state,
        updateUserPending: true,
        error: null
      };
    case editUserActions.UPDATE_USER_SUCCESS:
      return {
        ...state,
        updateUserPending: false,
        updateUserSuccess: true,
        error: null
      };
    case editUserActions.UPDATE_USER_FAILURE:
      return {
        ...state,
        updateUserPending: false,
        updateUserSuccess: false,
        error: 'Updating user failed'
      };
    case editUserActions.DELETE_USER_PENDING:
      return {
        ...state,
        deleteUserPending: true,
        error: null
      };
    case editUserActions.DELETE_USER_SUCCESS:
      return {
        ...state,
        deleteUserPending: false,
        deleteUserSuccess: true,
        error: null
      };
    case editUserActions.DELETE_USER_FAILURE:
      return {
        ...state,
        deleteUserPending: false,
        deleteUserSuccess: false,
        error: 'Deleting user failed'
      };
    case editUserActions.CLOSE_CREATE_USER_DIALOG:
      return {
        ...state,
        showCreateUserDialog: false,
        error: null
      }
    case editUserActions.SHOW_CREATE_USER_DIALOG:
      return {
        ...state,
        showCreateUserDialog: true,
        error: null
      }
    default:
      return state;
  }
}

export default rootReducer;
