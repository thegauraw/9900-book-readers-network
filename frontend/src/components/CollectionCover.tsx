import * as React from 'react';
import { Box, Card, CardContent, CardMedia, Button, Typography } from '@mui/material';
import img1 from '../assets/img1.jpeg';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';

const CollectionCover: React.FC = () => {
  return (
    <Card sx={{ width: '100%' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', py: 5 }}>
        <CardMedia component="img" sx={{ mx: 1, width: '76px', height: '114px' }} image={img1} />
        <CardMedia component="img" sx={{ mx: 1, width: '76px', height: '114px' }} image={img2} />
        <CardMedia component="img" sx={{ mx: 1, width: '76px', height: '114px' }} image={img3} />
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
            Main
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="div">
            4 Collections
          </Typography>
        </Box>
        <Button size="medium" color="secondary" variant="contained">
          All Collections
        </Button>
      </Box>
    </Card>
  );
};

export default CollectionCover;
