import React from "react";

import IconBase, { IconBaseProps } from "../IconBase";

export type GitTagIconProps = Omit<IconBaseProps, "viewBox" | "fill">;

const GitTagIcon: React.FC<GitTagIconProps> = (props) => {
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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.8274 14.2538V8.13197C7.8274 8.05119 7.85949 7.97372 7.9166 7.9166C7.97372 7.85949 8.05119 7.8274 8.13197 7.8274H14.2538C14.2938 7.82733 14.3334 7.83515 14.3704 7.8504C14.4074 7.86566 14.441 7.88807 14.4694 7.91633L22.0835 15.5305C22.1119 15.5588 22.1345 15.5924 22.1498 15.6294C22.1652 15.6664 22.173 15.7061 22.173 15.7461C22.173 15.7862 22.1652 15.8259 22.1498 15.8629C22.1345 15.8999 22.1119 15.9335 22.0835 15.9618L15.9618 22.0835C15.9335 22.1119 15.8999 22.1345 15.8629 22.1498C15.8259 22.1652 15.7862 22.173 15.7461 22.173C15.7061 22.173 15.6664 22.1652 15.6294 22.1498C15.5924 22.1345 15.5588 22.1119 15.5305 22.0835L7.91633 14.4694C7.88807 14.441 7.86566 14.4074 7.8504 14.3704C7.83515 14.3334 7.82733 14.2938 7.8274 14.2538ZM6 14.2538V8.13197C6 6.95512 6.95512 6 8.13197 6H14.2538C14.819 6 15.3624 6.22416 15.762 6.62497L23.3761 14.2391C23.7756 14.6389 24 15.181 24 15.7461C24 16.3113 23.7756 16.8533 23.3761 17.2531L17.2531 23.3761C16.8533 23.7756 16.3113 24 15.7461 24C15.181 24 14.6389 23.7756 14.2391 23.3761L6.62497 15.762C6.42682 15.564 6.26964 15.3288 6.16239 15.0701C6.05516 14.8113 5.99998 14.5339 6 14.2538ZM12.0913 10.8731C11.7682 10.8731 11.4584 11.0014 11.2299 11.2299C11.0014 11.4584 10.8731 11.7682 10.8731 12.0913C10.8731 12.4144 11.0014 12.7243 11.2299 12.9528C11.4584 13.1812 11.7682 13.3096 12.0913 13.3096C12.4144 13.3096 12.7243 13.1812 12.9528 12.9528C13.1812 12.7243 13.3096 12.4144 13.3096 12.0913C13.3096 11.7682 13.1812 11.4584 12.9528 11.2299C12.7243 11.0014 12.4144 10.8731 12.0913 10.8731Z"
      />
    </IconBase>
  );
};

export default GitTagIcon;
