import React from "react";
import Slider from "react-slick";
import "!style-loader!css-loader!./style.scss";

const ListRenderer = props => {
  const { width, height, className, rowRenderer, ref } = props;
  const Item = rowRenderer;
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div
      style={{
        width: width,
        height: height,
        position: "absolute"
      }}
      className={className}
    >
      <Slider {...settings}>
        {props.items.map((item, key) => (
          <Item style={{ width }} key={key} index={key} />
        ))}
      </Slider>
    </div>
  );
};

export default ListRenderer;
