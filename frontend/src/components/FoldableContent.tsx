import { FC, useState } from 'react';
import { Typography } from '@mui/material';
import ShowMoreText from 'react-show-more-text';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
interface FoldableContentProps {
  content: string | null;
}

const useStyles = makeStyles((theme: Theme) => ({
  reviewContent: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(1),
  },
}));

const FoldableContent: FC<FoldableContentProps> = ({ content }) => {
  const classes = useStyles();
  const [showFullRows, setShowFullRows] = useState<boolean>(false);
  return (
    <ShowMoreText
      lines={3}
      more={
        <Typography variant="subtitle2" component="span">
          Show more
        </Typography>
      }
      less={
        <Typography variant="subtitle2" component="span">
          Show less
        </Typography>
      }
      className={classes.reviewContent}
      onClick={setShowFullRows}
      expanded={showFullRows}
      truncatedEndingComponent={'... '}
    >
      {content}
    </ShowMoreText>
  );
};

export default FoldableContent;
