import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import EditButton from "../../components/buttons/EditButton";
import RemoveButton from "../../components/buttons/RemoveBotton";
import { checkIfOwnUser, hasAnyRole } from '../../utils/Funtions';
import { deleteCanvas, getCanvasData } from "../../services/Api/CanvasService";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

export default function ListCanvas () {
  const [canvas, setCanvas] = useState([]);
  const [page, setPage] = useState({pageSize: 10, page: 0});
  const [totalRows, setTotalRows] = useState(0);
  const columns = [
    { field: "name", headerName: "Name", flex: 1  },
    { field: "userOwner", headerName: "Owner", width: 200 },
    { field: "isShared", headerName: "Shared", width: 100 },
    { field: "actions", headerName: "Actions", width: 200, sortable: false, renderCell: (params) => {
      return (
        <>
          <EditButton 
            disable={!hasAnyRole(['Admin-graph', 'Edit-graph'])}
            onClick={() => handleEditClick(params.row.canvasId)}
          />
          <RemoveButton 
            disable={!hasAnyRole(['Admin-graph', 'Delete-graph']) && !checkIfOwnUser(params.row.userOwner)}
            onClick={(e) => {
                e.stopPropagation();
                deleteCanvas(params.row.canvasId)
              }
            }
          />
        </>
      );
    }}
  ];

  useEffect(() => {
    getCanvasData(page.page)
      .then((data) => {
        setCanvas(data);
        setTotalRows(data?.totalElements);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [page]);

  const handleRowClick = (param) => {
    const url = `/dashboard/manage-charts/${param.row.canvasId}`;
    window.open(url, '_blank');
  }  

  const handleEditClick = (canvasId) => {
    const url = `/dashboard/manage-charts/${canvasId}?edit=true`;
    window.open(url, '_blank');
  }

  const handleAdd = () => {
    const url = `/dashboard/create-charts`;
    window.open(url, '_blank');
  }

  return (
    <Box m={4} maxWidth={1000} mx="auto">
      <DataGrid
        autoHeight
        disableRowSelectionOnClick
        pageSizeOptions={[10]}
        paginationModel={page}
        paginationMode="server"
        onPaginationModelChange={setPage}
        columns={columns}
        rows={canvas?.content || []}
        rowCount={totalRows}
        getRowId={(row) => row.canvasId}
        localeText={{
          noRowsLabel: 'No hay elementos disponibles'
        }}
        onRowClick={handleRowClick}
      />
      <Box mt={2}>
        <Button
          disabled={!hasAnyRole(['Admin-graph', 'Add-graph'])}
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAdd}
        >
          Add new canvas
        </Button>
      </Box>
    </Box>
  );
}