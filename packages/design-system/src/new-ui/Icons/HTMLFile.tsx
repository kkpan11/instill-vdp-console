"use client";

import * as React from "react";

import { IconBase, IconBaseProps } from "./IconBase";

export const HTMLFile = React.forwardRef<
  SVGSVGElement,
  Omit<IconBaseProps, "viewBox" | "children">
>((props, ref) => {
  const { className, ...passThrough } = props;
  return (
    <IconBase
      {...passThrough}
      ref={ref}
      viewBox="0 0 41 41"
      className={className}
    >
      <path
        d="M4.04443 4C4.04443 1.79086 5.83529 0 8.04443 0H24.2667L36.4 12.1216V36.4054C36.4 38.6145 34.6091 40.4054 32.4 40.4054H8.04443C5.8353 40.4054 4.04443 38.6145 4.04443 36.4054V4Z"
        fill="#8B55F7"
      />
      <path
        opacity="0.3"
        d="M24.2666 0L36.3999 12.1216H28.2666C26.0575 12.1216 24.2666 10.3308 24.2666 8.12162V0Z"
        fill="white"
      />
      <path
        d="M12.7197 29.6591H10.3257V32.2331H8.95769V25.9511H10.3257V28.4531H12.7197V25.9511H14.0877V32.2331H12.7197V29.6591ZM18.0894 27.1661V32.2331H16.7214V27.1661H15.0204V25.9511H19.7904V27.1661H18.0894ZM25.4242 28.1111H25.3972L24.9382 29.0291L23.7142 31.2521L22.5172 29.0381L22.0402 28.0481H22.0132V32.2331H20.7262V25.9511H22.1752L23.7142 28.8941H23.7322L25.2532 25.9511H26.7112V32.2331H25.4242V28.1111ZM28.1003 32.2331V25.9511H29.4683V31.0181H31.8623V32.2331H28.1003Z"
        fill="white"
      />
    </IconBase>
  );
});
HTMLFile.displayName = "IconHTMLFile";
