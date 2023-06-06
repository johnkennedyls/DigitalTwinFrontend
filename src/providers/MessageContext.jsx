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
            {open &&
                <Alert severity={type} style={{ width: '20%', margin: '1em auto' }}>
                    <AlertTitle>{type.charAt(0).toUpperCase() + type.slice(1)}</AlertTitle>
                    {message}
                </Alert>
            }
            {children}
        </MessageContext.Provider>
    );
}

MessageProvider.propTypes = {
    children: PropTypes.node.isRequired
};
