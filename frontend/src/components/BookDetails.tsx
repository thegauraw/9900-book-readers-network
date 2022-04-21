import * as React from 'react';
import { Box, CardContent, CardMedia, Typography, Chip, Rating } from '@mui/material';
import noCoverImg from '../assets/no_cover_thumb.gif';
interface BookDetailsProps {
  bookCoverImg: string | undefined;
  title: string;
  authors: string[];
  categories: string[];
  publisher: string;
  publishedDate: string;
  averageRatings: number;
}

const BookDetails: React.FC<BookDetailsProps> = ({
  bookCoverImg,
  title,
  authors,
  categories,
  publisher,
  publishedDate,
  averageRatings,
}) => {
  const rating = averageRatings > 0 ? `Average rating: ${averageRatings}` : 'No rating';
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
            alignItems: 'center',
          }}
        >
          <Rating name="rating" readOnly={true} precision={0.1} value={averageRatings} />
          <Typography
            gutterBottom
            variant="subtitle2"
            component="div"
            sx={{ display: 'inline-flex', m: 0, pl: 1 }}
          >
            {rating}
          </Typography>
        </Box>
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
            <Typography gutterBottom variant="subtitle2" component="div" key={author + title}>
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
            <Typography gutterBottom variant="subtitle1" component="div" key={category + title}>
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
            image={bookCoverImg || noCoverImg}
          />
        </CardContent>
        {bookDetails()}
      </Box>
    </Box>
  );
};

export default BookDetails;
