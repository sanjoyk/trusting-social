import React, { PureComponent } from "react";
import { removeAppNotification, } from "../app-actions.js";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { connect } from "react-redux";


class AppNotifications extends PureComponent {
  componentDidUpdate() {
    const { notifications, removeNotification } = this.props;
    this.generateNotifications(notifications, removeNotification);

  }
  generateNotifications = (notifications, removeNotification) => {
    if (notifications && notifications.length > 0) {
      notifications
        .slice(0, 5)
        .map(notification => this.createNotification(notification, removeNotification));
    }
  }

  createNotification = ({ type, message, id }, removeNotification) => {
    return (
      NotificationManager[type.toLowerCase()](message, "", 1000, ((id) => removeNotification(id))(id))
    )

  }
  render() {
    return (
      <NotificationContainer />
    )
  }
}
const mapStateToProps = (state) => {
  return {
    ...state.app
  }
}

const mapDisaptchToProps = (dispatch) => {
  return {
    removeNotification: id => dispatch(removeAppNotification(id)),
  }
}

export default connect(mapStateToProps, mapDisaptchToProps)(AppNotifications);
