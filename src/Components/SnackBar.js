import React from "react";
import { Snackbar, Alert, AlertTitle } from "@mui/material";

const SnackBar = ({ message, action, open, onClose, autoHideDuration }) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
    >
      {/* <AlertTitle>{tileMessage}</AlertTitle> */}
      <Alert variant="filled" severity={action}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;