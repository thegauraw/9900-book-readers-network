import { FC, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Appctx } from '../utils/LocalContext';
import { deleteCollectedBook } from '../services/bookAPIs';
import { NotFoundPath } from '../config/paths';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
interface CollectedBookDeleteProps {
  volumeId: string;
  setIsLoading: Function;
  title: string;
  reload: boolean;
  setReload: Function;
}
const CollectedBookDelete: FC<CollectedBookDeleteProps> = ({
  volumeId,
  setIsLoading,
  title,
  reload,
  setReload,
}) => {
  const context = useContext(Appctx);
  const { token } = context;
  const { collectionId } = useParams();
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onDelete = () => {
    (async function () {
      try {
        setIsLoading(true);
        await deleteCollectedBook(token, collectionId ?? '', volumeId);
      } catch (error) {
        navigate(NotFoundPath, { state: { error: error } });
      } finally {
        setIsLoading(false);
        setOpen(false);
        setReload(!reload);
      }
    })();
  };
  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <>
        <Button variant="outlined" onClick={handleClickOpen}>
          Remove this book
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{'Remove a book from the collection'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`Are you sure you want to remove book <<${title}>> from this collection? You will not be
              able to undo it.`}
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
    </Box>
  );
};

export default CollectedBookDelete;
