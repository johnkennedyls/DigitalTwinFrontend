import { ListAlt } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemText, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function ListOperationDialog ({ logs }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Tooltip title="View Logs">
                <IconButton onClick={() => setOpen(true)}>
                    <ListAlt />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
                <DialogTitle>Logs</DialogTitle>
                <DialogContent>
                    <DataGrid 
                        rows={logs} 
                        columns={[
                            { field: 'operationName', headerName: 'Operation', width: 150 },
                            { field: 'operator', headerName: 'Operator', width: 150 },
                            { field: 'time', headerName: 'Time', width: 150, type: 'dateTime', valueFormatter: (params) => new Date(params.value).toLocaleString()},
                            { field: 'operationResult', headerName: 'Result', flex: 550 }
                        ]}
                        initialState={{
                          pagination: {
                            paginationModel: {
                              pageSize: 5,
                            },
                          },
                        }}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                    />
                </DialogContent>
            </Dialog>
        </>
    )    
}

ListOperationDialog.propTypes = {
    logs: PropTypes.array.isRequired
};