import { FC } from 'react';
import { Typography, Button, Grid, CardMedia, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BookThumbnail } from '../types/BookTypes';
import { bookImageSizes } from '../config/constants';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import noCoverImg from '../assets/no_cover_thumb.gif';
import { bookPath } from '../config/paths';
interface BookThumbnailListProps {
  bookList: BookThumbnail[];
  isOverview: boolean;
  detailPath?: string;
  size?: keyof typeof bookImageSizes;
}

const BookThumbnailList: FC<BookThumbnailListProps> = ({
  bookList,
  isOverview,
  detailPath,
  size,
}) => {
  let navigate = useNavigate();
  const bookImageSize = size ? bookImageSizes[size] : bookImageSizes.medium;
  const bookOverview = (book: BookThumbnail) => {
    return (
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}
        key={book.volume_id}
      >
        <CardMedia
          component="img"
          sx={{ mx: 1, ...bookImageSize, cursor: 'pointer' }}
          image={book.smallThumbnail || noCoverImg}
          onClick={() => navigate(`${bookPath}/${book.volume_id}`)}
        />
        {!isOverview && (
          <Typography variant="subtitle2" component="div">
            {book.title || book.volume_id}
          </Typography>
        )}
      </Box>
    );
  };

  const bookOverviewList = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {bookList.map((book) => bookOverview(book))}
        {typeof detailPath === 'string' && detailPath && (
          <Button sx={{ ...bookImageSizes.small }} onClick={() => navigate(detailPath)}>
            <MoreHorizIcon />
          </Button>
        )}
      </Box>
    );
  };

  const bookFullList = () => {
    const spacingValue = size && size === 'large' ? 5 : 1;
    return (
      <Grid container spacing={spacingValue} sx={{ p: 2 }}>
        {bookList.map((book) => (
          <Grid
            item
            xs={4}
            sm={3}
            md={2}
            lg={1}
            xl={1}
            key={book.volume_id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {bookOverview(book)}
          </Grid>
        ))}
      </Grid>
    );
  };
  return <>{isOverview ? bookOverviewList() : bookFullList()}</>;
};

export default BookThumbnailList;
