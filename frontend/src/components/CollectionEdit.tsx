import * as React from 'react';
import { Appctx } from '../utils/LocalContext';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Grid, Modal } from '@mui/material';
import { getCollectionById, updateCollection } from '../services/collectionAPIs';
import { CollectionFormData } from '../types/collectionTypes';
import CollectionForm from './CollectionForm';

const style = {
  modal: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
};

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
    console.log('editing');
    console.log(collectionId);
    (async function () {
      try {
        setCollection({ isLoading: true, settlement: null });
        const response = await getCollectionById(collectionId, token);
        setCollection({ settlement: response, error: null });
      } catch (error) {
        setCollection({ error: null });
      } finally {
        setCollection({ isLoading: false });
        setOpen(true);
      }
    })();
  };
  const handleClose = () => setOpen(false);

  const handleSubmitData = React.useCallback(
    ({ title, description }: CollectionFormData) => {
      setCollection({ isLoading: true });
      updateCollection({ title, description }, collectionId, token)
        .then((data) => setCollection({ settlement: data }))
        .catch((error) => {
          setCollection({ error: error });
        })
        .finally(() => {
          setCollection({ isLoading: false });
          handleClose();
          dataLoader();
        });
    },
    [updateCollection]
  );

  return (
    <Box>
      <Button variant="contained" startIcon={<EditIcon />} onClick={handleOpen}></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-edit-collection"
        aria-describedby="modal-edit-collection"
      >
        <Box sx={style.modal}>
          <CollectionForm
            title={settlement?.title || ''}
            description={settlement?.description || ''}
            submitHandler={handleSubmitData}
            closeHandler={handleClose}
            mode="edit"
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default CollectionEdit;
