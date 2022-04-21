import * as React from 'react';
import { Appctx } from '../utils/LocalContext';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Card, CardContent, Grid, Modal } from '@mui/material';
import { createCollection } from '../services/collectionAPIs';
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
  actionButton: {
    float: 'right',
  },
};

interface CollectionNewProps {
  dataLoader: () => Promise<void>;
}

const CollectionNew: React.FC<CollectionNewProps> = ({ dataLoader }) => {
  const context = React.useContext(Appctx);
  const { collection, setCollection, token } = context;
  const { settlement, isLoading, error } = collection;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmitData = React.useCallback(
    ({ title, description }: CollectionFormData) => {
      setCollection({ isLoading: true });
      createCollection({ title, description }, token)
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
    [createCollection]
  );

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card sx={{ width: '100%', height: '300px' }}>
        <CardContent
          sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', p: 12 }}
        >
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
            Add New Collection
          </Button>
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-new-collection"
        aria-describedby="modal-new-collection"
      >
        <Box sx={style.modal}>
          <CollectionForm
            title=""
            description=""
            submitHandler={handleSubmitData}
            closeHandler={handleClose}
            mode="add"
          />
        </Box>
      </Modal>
    </Grid>
  );
};

export default CollectionNew;
