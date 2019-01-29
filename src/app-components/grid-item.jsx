import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

import cx from "classnames";

const style = {
  grid: {
    padding: "0 15px !important"
  },
  displayFlexType: {
    display: "flex"
  },
  alignItemCenter: {
    alignItems: "center"
  },
  alignItemCenterWithEnd: {
    alignItems: "center",
    justifyContent: "flex-end"

  }
};

function GridItem({ ...props }) {
  const { classes,
    alignItemCenter,
    alignItemCenterWithEnd,
    alignItemRight,
    children,
    className,
    displayFlexType = false,
    ...rest
  } = props;
  const classNames = classes.grid + " " + cx({
    [classes.displayFlexType]: displayFlexType,
    [classes.alignItemCenter]: alignItemCenter,
    [classes.alignItemRight]: alignItemRight,
    [classes.alignItemCenterWithEnd]: alignItemCenterWithEnd
  })
  return (
    <Grid item {...rest} className={classNames + " " + className}>
      {children}
    </Grid>
  );
}

export default withStyles(style)(GridItem);
