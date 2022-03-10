import * as React from 'react';
import { Box, Card, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
interface CollectionCoverProps {
  bookCovers: string[];
  collectionName: string;
  totalCaption: string;
  buttonName: string;
  buttonPath: string;
}

const CollectionCover: React.FC<CollectionCoverProps> = ({
  bookCovers,
  collectionName,
  totalCaption,
  buttonName,
  buttonPath,
}) => {
  let navigate = useNavigate();
  return (
    <Card sx={{ width: '100%' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', py: 5 }}>
        {bookCovers.map((bookCoverPath) => (
          <CardMedia
            component="img"
            sx={{ mx: 1, width: '76px', height: '114px' }}
            image={bookCoverPath}
          />
        ))}
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
            {collectionName}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="div">
            {totalCaption}
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
