const AppAction = {
  SET: {
    MESSAGE: "AppAction.Set.Message",
    NOTIFICATION: "AppAction.Set.Notification",
  },
  REMOVE: {
    MESSAGE: "AppAction.Clear.Message",
    NOTIFICATION: "AppAction.Remove.Notification",
  },

  CLEAR: {
    ALL_MESSAGES: "AppAction.clear.AllMessages",
    ALL_NOTIFICATIONS: "AppAction.Remove.AllNotifications",
  }
}

export default AppAction;
