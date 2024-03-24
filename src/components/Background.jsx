import React from "react";

const Background = (props) => {
  const { className } = props;

  return (
    <div className={className ? className : "w-screen h-screen"}>
      <img
        className="w-full h-full object-cover"
        src="/background.png"
        alt=""
      />
    </div>
  );
};

export default Background;
