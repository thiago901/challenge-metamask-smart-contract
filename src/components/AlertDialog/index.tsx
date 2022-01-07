import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertDialog {
  isOpen: boolean;
  title: string;
  subTitle?: string;
  setIsOpen(value: boolean): void;
}
export default function AlertDialog({
  isOpen,
  title,
  subTitle,
  setIsOpen,
}: AlertDialog) {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        {subTitle && (
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {subTitle}
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose}>Got it</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
AlertDialog.defaultProps = {
  subTitle: '',
};
