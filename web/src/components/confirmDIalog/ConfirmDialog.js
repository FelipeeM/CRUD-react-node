import React, {  useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';

const ConfirmDialog = ({ open, onOpen, title, message, onAction }) => {

    const [loadingSave, setLoadingSave] = useState(false);
    const runAction = async () => {
        setLoadingSave(true)
        await onAction()
        setLoadingSave(false)
        onOpen(false)
    }
    const StyledDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialog-paper': {
            minWidth: '300px',
            maxWidth: '400px',
        },
    }));

    return (
        <StyledDialog
            open={open}
        >
            <DialogTitle >{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onOpen(false)} color="primary" disabled={loadingSave}>
                    Não
                </Button>
                <LoadingButton onClick={runAction} color="primary" autoFocus loading={loadingSave}>
                    Sim
                </LoadingButton>
            </DialogActions>
        </StyledDialog>
    );
};

export default ConfirmDialog;
