import { FC } from 'react';
import { Typography, CardMedia, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BookThumbnail } from '../types/BookTypes';
import { bookImageSizes } from '../config/constants';
import noCoverImg from '../assets/no_cover_thumb.gif';
import { bookPath } from '../config/paths';
interface BookThumbnailProps {
  book: BookThumbnail;
  isOverview: boolean;
  size?: keyof typeof bookImageSizes;
}

const BookThumbnailItem: FC<BookThumbnailProps> = ({ book, isOverview, size }) => {
  let navigate = useNavigate();
  const bookImageSize = size ? bookImageSizes[size] : bookImageSizes.medium;

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
          sx={{
            height: '100px',
            overflow: 'hidden',
            width: bookImageSize.width,
            textOverflow: 'ellipsis',
          }}
        >
          {book.title || book.volume_id}
        </Typography>
      )}
    </Box>
  );
};

export default BookThumbnailItem;
