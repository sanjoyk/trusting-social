import { AppAction } from "./app-constants";
import { combineReducers } from "redux";
import articles from "./articles/articles-reducers.js";
import articleSettings from "./article/article-reducer.js";

const appDefault = {
  messages: [],
  notifications: []
};

const app = (state = appDefault, action) => {
  const newMessages = Object.assign([], state.messages);
  const existingMessageIdx = newMessages.findIndex(message =>
    (message.message === action.message)
    && (action.params ? message.type === action.params.type : true));

  const newNotifications = [...state.notifications];
  const newNotificationsIdx = newNotifications.findIndex(noti =>
    (noti.message === action.message)
    && (action.params ? noti.type === action.params.type : true));


  switch (action.type) {
    //************** Start Messages *****************
    case AppAction.SET.MESSAGE: {
      if (existingMessageIdx === -1) {
        newMessages.push({
          key: Date.now(),
          id: state.messages.length,
          message: action.message,
          type: action.params && action.params.type,
          onOk: action.params.onOk,
          onCancel: action.params.onCancel || null
        })
        return { ...state, messages: newMessages }
      }
      return state;
    }
    case AppAction.REMOVE.MESSAGE: {
      if (newMessages && newMessages.length > 0) {
        newMessages.splice(action.id, 1);
        return { ...state, messages: newMessages };
      }
      return state;
    }

    case AppAction.CLEAR.ALL_MESSAGES: {
      return { ...state, messages: [] };
    }
    //************** End Messages *****************

    //************** Start Notifications *****************
    case AppAction.SET.NOTIFICATION: {
      if (newNotificationsIdx === -1) {
        newNotifications.push({
          key: Date.now(),
          id: state.notifications.length,
          message: action.message,
          type: action.params && action.params.type
        });
        return { ...state, notifications: newNotifications };
      }
      return state;

    }
    case AppAction.REMOVE.NOTIFICATION: {
      if (newNotifications && newNotifications.length > 0) {
        newNotifications.splice(action.id, 1);
        return { ...state, notifications: newNotifications }
      }
      return state;
    }
    case AppAction.CLEAR.ALL_NOTIFICATIONS: {
      return { ...state, notifications: [] };
    }
    //************** End Notifications *****************

    default: return state;
  }
}
export default combineReducers({
  app: app,
  articles: articles,
  articleSettings: articleSettings,
});