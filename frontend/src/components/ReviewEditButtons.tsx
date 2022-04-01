import { FC } from 'react';
import { Box, Button } from '@mui/material';
interface ReviewEditButtonsProps {
  inEditing: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  onDelete: () => void;
  onEdit: () => void;
}
const ReviewEditButtons: FC<ReviewEditButtonsProps> = ({
  inEditing,
  onCancel,
  onSubmit,
  onDelete,
  onEdit,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        mt: 2,
      }}
    >
      {inEditing ? (
        <>
          <Button
            variant="outlined"
            sx={{
              mr: 2,
            }}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={onSubmit}>
            Submit
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="outlined"
            sx={{
              mr: 2,
            }}
            onClick={onDelete}
          >
            Delete
          </Button>
          <Button variant="contained" onClick={onEdit}>
            Edit
          </Button>
        </>
      )}
    </Box>
  );
};

export default ReviewEditButtons;
