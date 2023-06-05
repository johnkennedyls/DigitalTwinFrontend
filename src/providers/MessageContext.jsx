import { createContext, useContext, useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import PropTypes from 'prop-types';

const MessageContext = createContext();

export const useMessage = () => {
    return useContext(MessageContext);
}

export const MessageProvider = ({ children }) => {
    const [message, setMessage] = useState(null);
    const [type, setType] = useState('success');
    const [open, setOpen] = useState(false);

    const showMessage = (msg, msgType = 'success', duration = 6000) => {
        setMessage(msg);
        setType(msgType);
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, duration);
    };

    const contextValue = {
        showMessage
    };

    return (
        <MessageContext.Provider value={contextValue}>
            {children}
            {open && 
                <Alert severity={type}>
                    <AlertTitle>{type}</AlertTitle>
                    {message}
                </Alert>
            }
        </MessageContext.Provider>
    );
}

MessageProvider.propTypes = {
    children: PropTypes.node.isRequired
};
