// Description: component for iframe and loading

import React from "react";

const IFrame = ({ src, width, height }) => (
  <iframe src={src} width={width} height={height}></iframe>
);

export default IFrame;