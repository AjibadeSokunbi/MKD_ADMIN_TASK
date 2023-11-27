import React from "react";

const Stack = ({
  children,
  flexDirection,
  justifyContent,
  alignItems,
  alignContent,
  gap,
  margin,
  padding,
  width,
  sx,
  background,
  onClick,
  height,
  style,
}) => {
  const containerStyle = `${margin || ""} ${width || ""} ${height || ""} ${
    padding || ""
  } flex flex-${flexDirection || ""} ${
    justifyContent ? `justify-${justifyContent}` : ""
  } ${alignItems ? `items-${alignItems}` : ""} ${
    alignContent ? `content-${alignContent} ` : ""
  } ${gap ? `gap-${gap}` : ""} ${background ? `bg-${background}` : ""} ${sx || ""}`;

  return (
    <div style={style} onClick={onClick} className={containerStyle}>
      {children}
    </div>
  );
};

export default Stack;
