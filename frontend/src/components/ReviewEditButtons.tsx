import { FC, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
interface ReviewEditButtonsProps {
  inEditing: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  onDelete: () => void;
  onEdit: () => void;
}
const ReviewEditButtons: FC<ReviewEditButtonsProps> = ({
  inEditing,
  onCancel,
  onSubmit,
  onDelete,
  onEdit,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        mt: 2,
      }}
    >
      {inEditing ? (
        <>
          <Button
            variant="outlined"
            sx={{
              mr: 2,
            }}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={onSubmit}>
            Submit
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="outlined"
            sx={{
              mr: 2,
            }}
            onClick={handleClickOpen}
          >
            Delete
          </Button>
          <Button variant="contained" onClick={onEdit}>
            Edit
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="alert-dialog-title">{'Delete this rating and review'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this rating and review? You will not be able to
                recover it.
              </DialogContentText>
            </DialogContent>
            <DialogActions
              sx={{
                pb: 2,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  mr: 2,
                  p: 1,
                }}
                onClick={onDelete}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                onClick={handleClose}
                autoFocus
                sx={{
                  mr: 2,
                  p: 1,
                }}
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
};

export default ReviewEditButtons;
