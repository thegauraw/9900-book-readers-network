import { FC, useContext, useState, useEffect } from 'react';
import { Appctx } from '../utils/LocalContext';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Typography,
  Divider,
} from '@mui/material';
import { addBookToCollections } from '../services/bookAPIs';
import { fetchCollectionListData } from '../services/collectionAPIs';
import { CollectionData } from '../types/collectionTypes';
import LoadingIndicator from './LoadingIndicator';

const CollectBookDialog: FC = () => {
  const context = useContext(Appctx);
  const { bookDetails, token } = context;
  const [checked, setChecked] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState('');
  const [collectionList, setCollectionList] = useState<CollectionData[]>();

  useEffect(() => {
    (async function () {
      try {
        const response = await fetchCollectionListData(token);
        setCollectionList(response);
      } catch (error) {
        setAlert(error as string);
      }
    })();
  }, []);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const onSubmit = () => {
    (async function () {
      try {
        setIsLoading(true);
        await addBookToCollections(token, checked, bookDetails?.settlement?.id ?? '');
      } catch (error) {
        setAlert(error as string);
      } finally {
        setIsLoading(false);
        setOpen(false);
      }
    })();
  };

  const onClose = () => {
    setOpen(false);
  };

  const customList = () => {
    return (
      <Box sx={{ width: 200, height: 230, overflow: 'auto' }}>
        <List dense component="div" role="list">
          {collectionList?.map((collection) => {
            return (
              <ListItem
                key={collection.id}
                role="listitem"
                button
                onClick={handleToggle(collection.id)}
              >
                <Checkbox
                  checked={checked.indexOf(collection.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText id={collection.id} primary={`${collection.title}`} />
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Box>
    );
  };

  const toCollect = () => (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{`Add the book to my collection(s)`}</DialogTitle>
      <DialogContent sx={{ mt: 3, mx: 2, px: 3 }}>
        <Typography variant="subtitle1">My Collections</Typography>
        <Divider />
        <DialogContentText>
          {isLoading ? (
            <LoadingIndicator />
          ) : alert ? (
            <Typography variant="subtitle1">{alert}</Typography>
          ) : (
            customList()
          )}
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
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onSubmit}
          autoFocus
          sx={{
            mr: 2,
            p: 1,
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      <Button
        variant="contained"
        sx={{ mr: 1, mt: 2, width: '200px' }}
        onClick={() => setOpen(true)}
      >
        Collect the book
      </Button>
      {toCollect()}
    </>
  );
};

export default CollectBookDialog;
