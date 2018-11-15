import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ReactHeight from "react-height";
import MultiSelect from "./multi_select";

const DEFAULT_HEIGHT = 400;

class MultiSelectHeightResponsive extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      height: props.height
    };
  }

  static propTypes = {
    responsiveHeight: PropTypes.string,
    height: PropTypes.number
  };

  static defaultProps = {
    responsiveHeight: `${DEFAULT_HEIGHT}px`,
    height: DEFAULT_HEIGHT
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
