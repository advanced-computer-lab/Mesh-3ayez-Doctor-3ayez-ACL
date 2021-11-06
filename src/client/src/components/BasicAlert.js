import * as React from 'react';
import Alert from '@mui/material/Alert';

export default function BasicAlert(props) {
  return (
      <Alert severity={props.severity}>This is an error alert — check it out!</Alert>

  );
}
