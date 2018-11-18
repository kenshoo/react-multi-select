import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ReactHeight from "react-height";

const DEFAULT_HEIGHT = 400;

const withResponsiveHeight = WrappedComponent =>
  class extends PureComponent {
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
      const { responsiveHeight, ...props } = this.props;
      const { height } = this.state;
      return (
        <ReactHeight
          style={{ height: responsiveHeight }}
          onHeightReady={this.changeHeight}
        >
          <WrappedComponent {...props} height={height} />
        </ReactHeight>
      );
    }
  };

export default withResponsiveHeight;
