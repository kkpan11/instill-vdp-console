"use client";

import * as React from "react";

import { LogoBase, LogoBaseProps } from "./LogoBase";

export const VDPExpand = React.forwardRef<
  SVGSVGElement,
  Omit<LogoBaseProps, "viewBox" | "children">
>((props, ref) => {
  const { className, ...passThrough } = props;
  return (
    <LogoBase
      {...passThrough}
      ref={ref}
      viewBox="0 0 75 26"
      className={className}
    >
      <g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.59958 15.3983V2.20023H2.20023V15.3983H6.59958ZM10.9989 19.7977V15.3983H6.59951V19.7977H10.9989ZM15.3983 19.7977V24.197H10.9989V19.7976H15.3982V15.3983H19.7976V19.7977H15.3983ZM24.197 2.20023V15.3983H19.7976V2.20023H24.197Z"
          fill="#F7F7F7"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0H8.79871V13.1981H17.5974V0H26.3961V17.5974H21.9968V21.9968H17.5974V26.3961H8.79871V21.9968H4.39936V17.5974H0V0ZM6.59958 2.20023V15.3983H2.20023V2.20023H6.59958ZM10.9989 15.3983V19.7977H6.59952V15.3983H10.9989ZM15.3983 24.197V19.7977H19.7976V15.3983H15.3982V19.7976H10.9989V24.197H15.3983ZM24.197 15.3983V2.20023H19.7976V15.3983H24.197Z"
          fill="#2B2B2B"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M30.7959 2.20023V24.197H26.3965V2.20023H30.7959ZM43.994 6.59956V2.20023H30.7959V6.59958H43.9939V19.7976H48.3933V6.59956H43.994ZM43.994 24.197V19.7977H30.7959V24.197H43.994Z"
          fill="#F7F7F7"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M28.5957 24.1965L30.7953 24.1965V2.19968H26.396V24.1965L28.5957 24.1965ZM24.1963 0V26.3961L46.1931 26.3962V21.9968H50.5924V4.39933H46.1931V0H24.1963ZM30.7953 2.19968V6.59903H43.9934V19.7971H48.3928V6.59901L43.9934 6.59903L43.9934 2.19968H30.7953ZM41.7937 17.5974V8.79871H32.995V17.5974H41.7937ZM43.9934 19.7971L30.7953 19.7971V24.1965L43.9934 24.1965L43.9934 19.7971Z"
          fill="#2B2B2B"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M54.9921 2.20023V24.197H50.5928V2.20023H54.9921ZM68.1902 6.59956V2.20023H54.9921L54.9922 6.59958L68.1902 6.59956L68.1902 15.3983H72.5896V6.59956H68.1902ZM68.1902 19.7977L68.1902 15.3983L54.9922 15.3983V19.7977H68.1902Z"
          fill="#F7F7F7"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M57.1913 26.3961H48.3925V0H70.3894V4.39933H74.7887V17.5974H70.3894V21.9968H57.1913V26.3961ZM68.1897 19.7971V15.3978H54.9916V19.7971H68.1897ZM54.9916 2.19968H50.5922V24.1965H54.9916V2.19968ZM57.1913 13.1981H65.99V8.79871H57.1913V13.1981ZM68.1897 6.59903L68.1897 15.3978L72.589 15.3977V6.59901L68.1897 6.59903L68.1897 2.19968H54.9916V6.59903H68.1897Z"
          fill="#2B2B2B"
        />
        <path
          d="M6.5986 6.59958V2.20023L2.19925 2.20023V6.59958H6.5986Z"
          fill="#28F77E"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.79883 0V8.79871H0.000116348V0L8.79883 0ZM6.59915 6.59903H2.19979V2.19968L6.59915 2.19968V6.59903Z"
          fill="#2B2B2B"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M30.7959 15.3974V24.1962H26.3965V15.3974H30.7959ZM30.7959 19.7968H35.1952V24.1962H30.7959V19.7968Z"
          fill="#FFDF3A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24.1963 26.3953V13.1972H32.995V17.5966H37.3944V26.3953H24.1963ZM30.7953 19.7963L30.7953 15.3969H26.396V24.1956H30.7953H35.1947V19.7963H30.7953Z"
          fill="#2B2B2B"
        />
        <path
          d="M54.9911 24.1951V10.997H50.5918V24.1951H54.9911Z"
          fill="#40A8F5"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M57.1914 8.8009V26.3983H48.3927V8.8009H57.1914ZM54.9917 24.1987H50.5924V11.0006H54.9917V24.1987Z"
          fill="#2B2B2B"
        />
      </g>
    </LogoBase>
  );
});
VDPExpand.displayName = "VDPExpand";
