import * as React from 'react';
import { Box, CardContent, CardMedia, Typography, Chip } from '@mui/material';
import MarkReadButton from './MarkReadButton';
import noCoverImg from '../assets/no_cover_thumb.gif';
interface BookDetailsProps {
  bookCoverImg: string | undefined;
  title: string;
  authors: string[];
  categories: string[];
  publisher: string;
  publishedDate: string;
}

const BookDetails: React.FC<BookDetailsProps> = ({
  bookCoverImg,
  title,
  authors,
  categories,
  publisher,
  publishedDate,
}) => {
  const bookActions = () => {
    return (
      <Box sx={{ px: 4 }}>
        <MarkReadButton />
      </Box>
    );
  };

  const bookDetails = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          p: 2,
        }}
      >
        <Typography gutterBottom variant="h4" component="div">
          {title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Typography
            gutterBottom
            variant="subtitle2"
            component="div"
            sx={{
              mr: 1,
            }}
          >
            by
          </Typography>
          {authors?.map((author) => (
            <Typography gutterBottom variant="subtitle2" component="div">
              {author}
            </Typography>
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {categories?.map((category) => (
            <Typography gutterBottom variant="subtitle1" component="div">
              <Chip label={category} variant="outlined" size="small" />
            </Typography>
          ))}
        </Box>
        <Typography component="legend" variant="subtitle2">
          {`Published ${publishedDate} by ${publisher}`}
        </Typography>
      </Box>
    );
  };
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <CardContent>
          <CardMedia
            component="img"
            sx={{ mx: 1, width: '76px', height: '114px' }}
            image={bookCoverImg ?? noCoverImg}
          />
        </CardContent>
        {bookDetails()}
      </Box>
      {bookActions()}
    </Box>
  );
};

export default BookDetails;
