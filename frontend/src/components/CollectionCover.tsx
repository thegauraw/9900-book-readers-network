import * as React from 'react';
import { Box, Card, CardContent, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
interface CollectionCoverProps {
  collectionTitle: string;
  collectionDescription: string;
  buttonName: string;
  buttonPath: string;
}

const CollectionCover: React.FC<CollectionCoverProps> = ({
  collectionTitle,
  collectionDescription,
  buttonName,
  buttonPath,
}) => {
  let navigate = useNavigate();
  return (
    <Card sx={{ width: '100%' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', py: 5 }}>
        {collectionDescription}
      </CardContent>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          bgcolor: 'primary.main',
          px: 2,
          py: 1,
        }}
      >
        <Box>
          <Typography gutterBottom variant="h4" component="div">
            {collectionTitle}
          </Typography>
        </Box>
        <Button
          size="medium"
          color="secondary"
          variant="contained"
          onClick={() => navigate(buttonPath)}
        >
          {buttonName}
        </Button>
      </Box>
    </Card>
  );
};

export default CollectionCover;
