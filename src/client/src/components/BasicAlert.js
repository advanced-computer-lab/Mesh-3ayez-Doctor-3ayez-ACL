import * as React from 'react';
import Alert from '@mui/material/Alert';

export default function BasicAlert(props) {
  return (
      <Alert style={{textAlign:"center"}} severity={props.severity}>{props.msg}</Alert>

  );
}
