import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { SnackbarSeverityEnum } from '../store/CommonEnums';

interface SnackbarContextProps {
    showSnackbar: (message: string, severity?: SnackbarSeverityEnum, hideDuration?: number) => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<SnackbarSeverityEnum>(SnackbarSeverityEnum.Success);
    const [hideDuration, setHideDuration] = useState(3000);

    const showSnackbar = (msg: string, sev: SnackbarSeverityEnum = SnackbarSeverityEnum.Success, hideDuration: number = 3000) => {
        setMessage(msg);
        setSeverity(sev);
        setHideDuration(hideDuration);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar open={open} autoHideDuration={hideDuration} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};
