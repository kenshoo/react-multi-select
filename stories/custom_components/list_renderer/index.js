import React from "react";
import Slider from "react-slick";
import "!style-loader!css-loader!./style.scss";

const ListRenderer = ({ items, width, height, className, rowRenderer }) => {
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
        width,
        height,
        position: "absolute"
      }}
      className={`${className} rms-list_renderer`}
    >
      <Slider {...settings}>
        {items.map((item, key) => (
          <Item style={{ width }} key={key} index={key} />
        ))}
      </Slider>
    </div>
  );
};

export default ListRenderer;
