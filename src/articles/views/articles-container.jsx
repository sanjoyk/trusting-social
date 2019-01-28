import React, { PureComponent } from "react";
import { connect } from "react-redux";


class AriclesContainer extends PureComponent {
  render() {
    return (
      <div>Articles container</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AriclesContainer);