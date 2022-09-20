import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
   props,
   ref,
) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const CustomizedSnackbars: React.FC<CustomizedSnackbarsPropsType> = ({ message, isOpen, isError, onClose }) => {
   const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
         return;
      }
      onClose();
   };
   return (
      <div>
         <Stack spacing={2} sx={{ minWidth: '100%' }} >
            <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose} style={{ left: '50%', transform: 'translateX(-50%)' }}>
               <Alert
                  onClose={handleClose}
                  severity={!isError ? "success" : "error"}
                  sx={{ width: '100%' }}>
                  {message}
               </Alert>
            </Snackbar>
         </Stack>
      </div>
   );
}
type CustomizedSnackbarsPropsType = {
   message: string
   isOpen: boolean
   isError?: boolean
   onClose: () => void
}