import * as authenticationActions from '../actions/authenticationActions';
import * as editUserActions from '../actions/editUserActions';
import * as forumThreadActions from '../actions/forumThreadActions';
import * as forumMessageActions from '../actions/forumMessageActions';

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
  thread: null
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    // auth
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
    //user
    case editUserActions.SHOW_USER_DELETE_DIALOG:
      return {
        ...state,
        showDeleteDialog: true,
        error: null
      };
    case editUserActions.CLOSE_USER_DELETE_DIALOG:
      return {
        ...state,
        showDeleteDialog: false,
        error: null
      };
    case editUserActions.CLOSE_USER_EDIT_DIALOG:
      return {
        ...state,
        showEditDialog: false,
        updateUserSuccess: false,
        error: null
      };    
    case editUserActions.SHOW_USER_EDIT_DIALOG:
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
    // forum threads
    case forumThreadActions.SHOW_FORUM_THREAD_DELETE_DIALOG:
      return {
        ...state,
        showDeleteDialog: true,
        error: null
      };
    case forumThreadActions.CLOSE_FORUM_THREAD_DELETE_DIALOG:
      return {
        ...state,
        showDeleteDialog: false,
        error: null
      };
    case forumThreadActions.CLOSE_FORUM_THREAD_EDIT_DIALOG:
      return {
        ...state,
        showEditDialog: false,
        updateForumThreadSuccess: false,
        error: null
      };    
    case forumThreadActions.SHOW_FORUM_THREAD_EDIT_DIALOG:
      return {
        ...state,
        showEditDialog: true,
        error: null
      };
    case forumThreadActions.GET_FORUM_THREADS_PENDING:
      return {
        ...state,
        getForumThreadsPending: true,
        error: null
      };
    case forumThreadActions.GET_FORUM_THREADS_SUCCESS:
      return {
        ...state,
        getForumThreadsPending: false,
        threads: action.threads,
        error: null
      };
    case forumThreadActions.GET_FORUM_THREADS_FAILURE:
      return {
        ...state,
        getForumThreadsPending: false,
        error: 'Getting threads failed'
      };
    case forumThreadActions.SELECTED_FORUM_THREAD:
      return {
        ...state,
        selectedForumThread: action.selectedForumThread,
        error: null
      };
    case forumThreadActions.UPDATE_FORUM_THREAD_PENDING:
      return {
        ...state,
        updateForumThreadPending: true,
        error: null
      };
    case forumThreadActions.UPDATE_FORUM_THREAD_SUCCESS:
      return {
        ...state,
        updateForumThreadPending: false,
        updateForumThreadSuccess: true,
        error: null
      };
    case forumThreadActions.UPDATE_FORUM_THREAD_FAILURE:
      return {
        ...state,
        updateForumThreadPending: false,
        updateForumThreadSuccess: false,
        error: 'Updating thread failed'
      };
    case forumThreadActions.DELETE_FORUM_THREAD_PENDING:
      return {
        ...state,
        deleteForumThreadPending: true,
        error: null
      };
    case forumThreadActions.DELETE_FORUM_THREAD_SUCCESS:
      return {
        ...state,
        deleteForumThreadPending: false,
        deleteForumThreadSuccess: true,
        error: null
      };
    case forumThreadActions.DELETE_FORUM_THREAD_FAILURE:
      return {
        ...state,
        deleteForumThreadPending: false,
        deleteForumThreadSuccess: false,
        error: 'Deleting thread failed'
      };
    case forumThreadActions.CLOSE_CREATE_FORUM_THREAD_DIALOG:
      return {
        ...state,
        showCreateForumThreadDialog: false,
        error: null
      }
    case forumThreadActions.SHOW_CREATE_FORUM_THREAD_DIALOG:
      return {
        ...state,
        showCreateForumThreadDialog: true,
        error: null
      }
    // forum message
    case forumMessageActions.HANDLE_THREAD_TRANSFER:
      return {
        ...state,
        thread: action.thread,
        threadName: action.threadName,
        threadDescription: action.threadDescription,
        error: null
      }
    case forumMessageActions.SHOW_FORUM_MESSAGE_DELETE_DIALOG:
      return {
        ...state,
        showDeleteDialog: true,
        error: null
      };
    case forumMessageActions.CLOSE_FORUM_MESSAGE_DELETE_DIALOG:
      return {
        ...state,
        showDeleteDialog: false,
        error: null
      };
    case forumMessageActions.CLOSE_FORUM_MESSAGE_EDIT_DIALOG:
      return {
        ...state,
        showEditDialog: false,
        updateForumMessageSuccess: false,
        error: null
      };    
    case forumMessageActions.SHOW_FORUM_MESSAGE_EDIT_DIALOG:
      return {
        ...state,
        showEditDialog: true,
        error: null
      };
    case forumMessageActions.GET_FORUM_MESSAGES_PENDING:
      return {
        ...state,
        getForumMessagesPending: true,
        error: null
      };
    case forumMessageActions.GET_FORUM_MESSAGES_SUCCESS:
      return {
        ...state,
        getForumMessagesPending: false,
        messages: action.messages,
        error: null
      };
    case forumMessageActions.GET_FORUM_MESSAGES_FAILURE:
      return {
        ...state,
        getForumMessagesPending: false,
        error: 'Getting messages failed'
      };
    case forumMessageActions.SELECTED_FORUM_MESSAGE:
      return {
        ...state,
        selectedForumMessage: action.selectedForumMessage,
        error: null
      };
    case forumMessageActions.UPDATE_FORUM_MESSAGE_PENDING:
      return {
        ...state,
        updateForumMessagePending: true,
        error: null
      };
    case forumMessageActions.UPDATE_FORUM_MESSAGE_SUCCESS:
      return {
        ...state,
        updateForumMessagePending: false,
        updateForumMessageSuccess: true,
        error: null
      };
    case forumMessageActions.UPDATE_FORUM_MESSAGE_FAILURE:
      return {
        ...state,
        updateForumMessagePending: false,
        updateForumMessageSuccess: false,
        error: 'Updating message failed'
      };
    case forumMessageActions.DELETE_FORUM_MESSAGE_PENDING:
      return {
        ...state,
        deleteForumMessagePending: true,
        error: null
      };
    case forumMessageActions.DELETE_FORUM_MESSAGE_SUCCESS:
      return {
        ...state,
        deleteForumMessagePending: false,
        deleteForumMessageSuccess: true,
        error: null
      };
    case forumMessageActions.DELETE_FORUM_MESSAGE_FAILURE:
      return {
        ...state,
        deleteForumMessagePending: false,
        deleteForumMessageSuccess: false,
        error: 'Deleting message failed'
      };
    case forumMessageActions.CLOSE_CREATE_FORUM_MESSAGE_DIALOG:
      return {
        ...state,
        showCreateForumMessageDialog: false,
        error: null
      }
    case forumMessageActions.SHOW_CREATE_FORUM_MESSAGE_DIALOG:
      return {
        ...state,
        showCreateForumMessageDialog: true,
        error: null
      }
    default:
      return state;
  }
}

export default rootReducer;
