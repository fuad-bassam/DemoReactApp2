import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

interface DialogContextType {
    openDialog: (message: string, onConfirm?: () => void) => void;
    closeDialog: () => void;
    message: string;
    handleConfirm: () => void;
    onConfirm: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const useDialog = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error('useDialog must be used within a DialogProvider');
    }
    return context;
};

export const DialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState<string>('');
    const [onConfirm, setOnConfirm] = useState<() => void>(() => () => { });

    const openDialog = (message: string, onConfirm?: () => void) => {
        setMessage(message);
        setOnConfirm(() => onConfirm || (() => { }));
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
        setMessage('');
        setOnConfirm(() => () => { });
    };

    const handleConfirm = () => {
        onConfirm();
        closeDialog();
    };

    return (
        <DialogContext.Provider value={{ openDialog, closeDialog, message, handleConfirm, onConfirm }}>
            {children}
            <Dialog open={open} onClose={closeDialog}>
                <DialogTitle>Notification</DialogTitle>
                <DialogContent>
                    <p>{message}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </DialogContext.Provider>
    );
};
