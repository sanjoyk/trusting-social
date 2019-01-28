import { AppAction } from "./app-constants/action-types";

//************** Start Errors ************************
export function setAppMessage(message, params) {
  return {
    type: AppAction.SET.MESSAGE,
    message: message,
    params: params
  }
}

export function removeAppMessage(id) {
  return {
    type: AppAction.REMOVE.MESSAGE,
    id: id
  }
}

export function clearAllAppMessages() {
  return {
    type: AppAction.CLEAR.ALL_MESSAGES
  }
}
//************** End Errors *************************

//************** Start Notification *****************
export function setAppNotification(message, params) {
  return {
    type: AppAction.SET.NOTIFICATION,
    message: message,
    params: params
  }
}

export function removeAppNotification(id) {
  return {
    type: AppAction.REMOVE.NOTIFICATION,
    id: id,
  }
}
export function clearAppNotifications() {
  return {
    type: AppAction.CLEAR.ALL_NOTIFICATIONS
  }
}
  //************** End Notification *****************
