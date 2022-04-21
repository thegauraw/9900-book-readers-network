import * as React from 'react';
import { Appctx } from '../utils/LocalContext';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
} from '@mui/material';
import { deleteCollection } from '../services/collectionAPIs';

interface CollectionEditProps {
  dataLoader: () => Promise<void>;
  collectionId: string;
}

const CollectionEdit: React.FC<CollectionEditProps> = ({ collectionId, dataLoader }) => {
  const context = React.useContext(Appctx);
  const { collection, setCollection, token } = context;
  const { settlement, isLoading, error } = collection;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleDelete = React.useCallback(() => {
    setCollection({ isLoading: true });
    deleteCollection(collectionId, token)
      .then((data) => setCollection({ settlement: data }))
      .catch((error) => {
        setCollection({ error: error });
      })
      .finally(() => {
        setCollection({ isLoading: false });
        handleClose();
        dataLoader();
      });
  }, [deleteCollection]);

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Button variant="contained" startIcon={<DeleteIcon />} onClick={handleOpen}></Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{'Delete this collection'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this collection? You will not be able to recover it.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: 2 }}>
          <Button variant="outlined" sx={{ mr: 2, p: 1 }} onClick={handleDelete}>
            Yes
          </Button>
          <Button variant="contained" onClick={handleClose} autoFocus sx={{ mr: 2, p: 1 }}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default CollectionEdit;
