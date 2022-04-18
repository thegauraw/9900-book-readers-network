import { FC } from 'react';
import { Typography, Button, Grid, CardMedia, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BookThumbnail } from '../types/BookTypes';
import { bookImageSizes } from '../config/constants';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import noCoverImg from '../assets/no_cover_thumb.gif';
import { bookPath } from '../config/paths';
import BookThumbnailItem from './BookThumbnailItem';
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
          <Typography
            variant="subtitle2"
            component="div"
            sx={{ height: '100px', overflow: 'scroll' }}
          >
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
        {bookList.map((book) => (
          <BookThumbnailItem book={book} isOverview={isOverview} size={size} key={book.volume_id} />
        ))}
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexWrap: 'wrap',
          textAlign: 'center',
        }}
      >
        {bookList.map((book) => (
          <BookThumbnailItem book={book} isOverview={isOverview} size={size} key={book.volume_id} />
        ))}
      </Box>
    );
  };
  return <>{isOverview ? bookOverviewList() : bookFullList()}</>;
};

export default BookThumbnailList;
