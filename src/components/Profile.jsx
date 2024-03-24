import React from "react";
import PropTypes from "prop-types";

import AccountMenu from "./AccountMenu";

const Profile = (props) => {

  const { imgSrc } = props;
  
  return (

      <div className="overflow-hidden mr-2 w-[50px] h-[50px] drop-shadow-[0_2px_2px_rgba(0,0,0)]">
        <img
          className="w-full h-full object-cover rounded-full"
          src={imgSrc}
          alt=""
        />
      </div>

  );
};

export default Profile;
