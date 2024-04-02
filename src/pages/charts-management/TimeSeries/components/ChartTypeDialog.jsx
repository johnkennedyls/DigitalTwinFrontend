import { useEffect, useState } from "react";
import { getChartTypes } from "../../../../services/Api/CanvasService";
import { Dialog, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { PieChart } from "@mui/icons-material";

function ChartTypeDialog ({ selectedChartType, handleSetChartType }) {
  const [open, setOpen] = useState(selectedChartType === '');
  const [chartTypes, setChartTypes] = useState([]);

  useEffect(() => {
    getChartTypes().then((chartTypes) => {
      setChartTypes(chartTypes);
    });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') return;
    setOpen(false);
  };

  const handleSelectChartType = (event) => {
    handleSetChartType(event.target.value);
    handleClose();
  };

  return (
    <>
      <Tooltip title="Select Chart Type">
        <IconButton onClick={() => setOpen(true)}>
          <PieChart />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} onBack disableEscapeKeyDown>
        <DialogTitle>Choose a chart type</DialogTitle>
        <DialogContent>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Select Chart Type</InputLabel>
            <Select
              labelId="chart-type-select"
              id="chart-type-select"
              value={selectedChartType}
              onChange={handleSelectChartType}
              label="Select Chart Type"
            >
              {chartTypes.map((chartType) => (
                <MenuItem key={chartType.typeId} value={chartType}>
                  {chartType.name}
                </MenuItem>
              ))}
            </Select>
        </FormControl>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ChartTypeDialog;