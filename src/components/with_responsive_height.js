import React, { PureComponent } from "react";
import PropTypes from "prop-types";

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

    getClientHeight() {
      return this.divRef.clientHeight;
    }

    componentDidMount() {
      const clientHeight = this.getClientHeight();
      this.changeHeight(clientHeight);
    }

    componentDidUpdate() {
      const { height } = this.state;
      const clientHeight = this.getClientHeight();
      if (clientHeight && height !== clientHeight) {
        this.changeHeight(clientHeight);
      }
    }

    changeHeight(height) {
      this.setState({ height: height - 2 });
    }

    render() {
      const { responsiveHeight, ...props } = this.props;
      const { height } = this.state;
      return (
        <div
          style={{ height: responsiveHeight }}
          ref={element => (this.divRef = element)}
        >
          <WrappedComponent {...props} height={height} />
        </div>
      );
    }
  };

export default withResponsiveHeight;
