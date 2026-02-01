import * as React from "react";

const Logo = (props: any) => (
  <svg
    viewBox="0 0 100 100" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="size-12" 
    {...props}
  >
    <rect width="100" height="100" rx="20" fill="white" />
    <g transform="translate(26, 26) scale(1)"> 
      <path
        d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
        fill="black"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </g>
  </svg>
);

export default Logo;