import * as React from 'react';
// import FlyEmailModuleMessage from '../../../src/components/fly-email-module-message';
import FlyEmailModuleMessage from './FlyEmailModuleMessage';

// import React = require('_@types_react-dom@16.9.4@@types/react-dom/node_modules/@types/react');

// import React = require('_@types_react@16.9.13@@types/react');

function getAsps(content) {
  return (
    <FlyEmailModuleMessage content={content} />
  )
}
export default getAsps;