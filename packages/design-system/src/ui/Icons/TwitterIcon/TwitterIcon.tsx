import React from "react";

import IconBase, { IconBaseProps } from "../IconBase";

export type TwitterIconProps = Omit<IconBaseProps, "viewBox" | "fill">;

const TwitterIcon: React.FC<TwitterIconProps> = (props) => {
  const { width, height, position, style, color } = props;
  return (
    <IconBase
      viewBox="0 0 30 30"
      width={width}
      height={height}
      color={color}
      position={position}
      style={style}
    >
      <path d="M10.539 24C19.5954 24 24.551 16.688 24.551 10.3578C24.551 10.1521 24.551 9.94636 24.5414 9.74065C25.5018 9.06742 26.3373 8.21654 27 7.25344C26.1164 7.63681 25.1657 7.88927 24.1669 8.01083C25.1849 7.42175 25.9628 6.47736 26.3373 5.35531C25.3866 5.90699 24.3301 6.2997 23.2065 6.51476C22.3037 5.57972 21.0264 5 19.6146 5C16.8968 5 14.6879 7.15059 14.6879 9.79675C14.6879 10.1708 14.7359 10.5354 14.8127 10.8907C10.7215 10.6944 7.09124 8.77756 4.66146 5.87894C4.2389 6.58957 3.9988 7.4124 3.9988 8.29134C3.9988 9.95571 4.87275 11.4237 6.18848 12.284C5.38175 12.2559 4.62305 12.0408 3.96038 11.6855C3.96038 11.7042 3.96038 11.7229 3.96038 11.751C3.96038 14.0699 5.66026 16.0148 7.90756 16.4542C7.4946 16.5664 7.06242 16.6225 6.61104 16.6225C6.29412 16.6225 5.98679 16.5945 5.68908 16.5384C6.31333 18.4459 8.13806 19.8297 10.2893 19.8671C8.59904 21.1575 6.47659 21.9242 4.17167 21.9242C3.77791 21.9242 3.38415 21.9055 3 21.8588C5.17047 23.2052 7.76351 24 10.539 24Z" />
    </IconBase>
  );
};

export default TwitterIcon;
