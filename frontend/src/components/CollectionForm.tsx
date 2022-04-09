import * as React from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { CollectionFormData } from '../types/collectionTypes';

interface CollectionFormProps {
  title: string | null;
  description: string | null;
  submitHandler: ({ title, description }: CollectionFormData) => void | null;
  closeHandler: () => void | null;
}

const style = {
  actionButtons: {
    float: 'right',
  },
  spacedButton: {
    m: '5px',
  }
};

const CollectionForm: React.FC<CollectionFormProps> = ({ title, description, submitHandler, closeHandler }) => {
  const [titleValue, setTitleValue] = React.useState(title);
  const [descriptionValue, setDescriptionValue] = React.useState(description);

  const handleSubmit = () => {
    setTitleValue(titleValue);
    setDescriptionValue(descriptionValue);
    submitHandler({ title: titleValue, description: descriptionValue });
  };

  return (
    <Box component="form" noValidate sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Collection
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            id="title"
            label="Title"
            value={titleValue}
            onChange={(event) => {
              setTitleValue(event.target.value);
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            id="description"
            label="Description"
            placeholder="Write something about the collection"
            value={descriptionValue}
            onChange={(event) => {
              setDescriptionValue(event.target.value);
            }}
            multiline
            rows={6}
            defaultValue=""
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={style.actionButtons}>
            <Button variant="contained" color="success" onClick={handleSubmit} sx={style.spacedButton}>
              Create
            </Button>
            <Button variant="outlined" color="secondary" onClick={closeHandler} sx={style.spacedButton}>
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CollectionForm;
