import React from "react";
import PropTypes from "prop-types";
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

function AppLoader(props) {
  const { message, classes, color = "primary", size = 40, } = props;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "100%" }}>
      <CircularProgress
        className={classes.progress}
        color={color}
        size={size}
        variant="indeterminate"
      />
      {message && <strong style={{ position: "relative", top: "-10px" }}>{message}</strong>}
    </div >
  );
}

AppLoader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppLoader);