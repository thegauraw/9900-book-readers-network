import * as React from 'react';
import { Box, Card, CardContent, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CollectionData } from '../types/collectionTypes';
import CollectionEdit from '../components/CollectionEdit';
import CollectionDelete from '../components/CollectionDelete';

interface CollectionCoverProps {
  collection: CollectionData;
  buttonName: string;
  buttonPath: string;
  dataLoader: () => Promise<void>;
}

const CollectionCover: React.FC<CollectionCoverProps> = ({
  collection,
  buttonName,
  buttonPath,
  dataLoader,
}) => {
  let navigate = useNavigate();
  return (
    <Card sx={{ width: '100%', height: '100%', minHeight: '300px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          bgcolor: 'primary.main',
          px: 2,
          py: 1,
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography gutterBottom variant="h4" component="div">
            {collection.title}
          </Typography>
        </Box>
        <CollectionEdit collectionId={collection.id} dataLoader={dataLoader} />
        <CollectionDelete collectionId={collection.id} dataLoader={dataLoader} />
        <Button
          size="medium"
          color="secondary"
          variant="contained"
          onClick={() => navigate(buttonPath)}
        >
          {buttonName}
        </Button>
      </Box>
      <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', py: 5 }}>
        {collection.description}
      </CardContent>
    </Card>
  );
};

export default CollectionCover;
