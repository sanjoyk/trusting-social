import React, { PureComponent } from "react";
import { removeAppMessage } from "../app-actions.js";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import withStyles from "@material-ui/core/styles/withStyles";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";

import { MessageTypes } from "../app-constants/index.js";
import { DialogContentText } from "@material-ui/core";

function Transition(props) {
  return <Slide direction="down" {...props} />
}

const theme = {
  dialogTitle: {
    display: "flex"
  },
  iconStyle: {
    textAlign: "center",
    position: "relative",
    top: "3px"
  },
  errorIconColor: {
    color: "red"
  },
  successIconColor: {
    color: "green"
  },
  infoIconColor: {
    color: "grey"
  }
};

class AppMessages extends PureComponent {

  getIcon = (type, classes) => {
    switch (type) {
      case MessageTypes.ERROR:
        return (<Icon className={`${classes.iconStyle} ${classes.errorIconColor}`}>error</Icon>)
      case MessageTypes.SUCCESS:
        return (<Icon className={`${classes.iconStyle} ${classes.successIconColor}`}>check_circle</Icon>)
      case MessageTypes.INFO:
        return (<Icon className={`${classes.iconStyle} ${classes.infoIconColor}`}>info</Icon>)
      default:
        return null;
    }
  }
  getParticularMessage = () => {
    const { messages } = this.props;
    const message = messages && messages.length ? messages[messages.length - 1] : null;
    return message;
  }
  onOkHandler = () => {
    const { onAcknowledgedAppMessage } = this.props;
    const { onOk, id } = this.getParticularMessage();
    if (onOk) {
      onOk();
    }
    onAcknowledgedAppMessage(id);
  }
  onCancelHandler = () => {
    const { onAcknowledgedAppMessage } = this.props;
    const { onCancel, id } = this.getParticularMessage();
    onCancel();
    onAcknowledgedAppMessage(id);
  }

  render() {
    const { classes } = this.props;
    const message = this.getParticularMessage();
    if (!message) {
      return null;
    }
    const messageText = message.message;
    const { onCancel = null, type } = message || {};
    const showOnCancelMessage = typeof onCancel === "function";
    return (
      <Dialog
        open={messageText !== null}
        TransitionComponent={Transition}
        keepMounted
        maxWidth={"xs"}
        fullWidth={true}
      >
        <DialogTitle className={classes.dialogTitle}>
          {this.getIcon(type, classes)} {type}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            {messageText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
            showOnCancelMessage ? <Button key="cancel" onClick={this.onCancelHandler}>Cancel</Button> : null
          }
          <Button key="ok" onClick={this.onOkHandler}>OK</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.app.messages
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onAcknowledgedAppMessage: id => dispatch(removeAppMessage(id)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(theme)(AppMessages));