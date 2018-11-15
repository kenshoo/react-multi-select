import React, { PureComponent } from "react";
import ReactHeight from "react-height";
import MultiSelect from "./multi_select";

class MultiSelectHeightResponsive extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      height: props.height
    };
  }

  static defaultProps = {
    responsiveHeight: "400px",
    height: 400
  };

  changeHeight = height => {
    this.setState({ height: height - 2 });
  };

  render() {
    const { responsiveHeight } = this.props;

    return (
      <ReactHeight
        style={{ height: responsiveHeight }}
        onHeightReady={this.changeHeight}
      >
        <MultiSelect {...this.props} height={this.state.height} />
      </ReactHeight>
    );
  }
}

export default MultiSelectHeightResponsive;
