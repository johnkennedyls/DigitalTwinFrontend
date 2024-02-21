import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import TimeSeries from '../../components/charts/TimeSeries'
import IconButton from '@mui/material/IconButton';

export default function ListTimeSeries() {

    const [charts, setCharts] = useState([]);

    const handleAddChart = () => {
        setCharts([...charts, <TimeSeries key={charts.length} />]);
    };

    const handleDeleteChart = (index) => {
        setCharts(charts.filter((_, i) => i !== index));
        console.log('Eliminar gráfica:', index);
    };

    return (
        <Box>
            {charts.map((chart, index) => (
                <Box
                    key={chart.key}
                    sx={{
                        position: 'relative',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        padding: 2,
                        marginTop: 2,
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 5,
                            right: 10,
                        }}
                    >
                        <IconButton
                            edge="end"
                            color="gray"
                            onClick={() => handleDeleteChart(index)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                    {chart}
                </Box>
            ))}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100%',
                    minWidth: '100%',
                    marginTop: 2,
                    maginBottom: 5,
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAddChart}
                >
                    Agregar nuevo Lienzo
                </Button>
            </Box>
        </Box>
    );
}
