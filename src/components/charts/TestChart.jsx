import { Button } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import { useSelector, useDispatch } from 'react-redux';
import { updateDummy } from '../../features/plant/plantSlice';
import { DEFAULT_Y_AXIS_FORMAT, DEFAULT_SERIES_FORMAT, DEFAULT_TIME_SERIES_OPTION, DEFAULT_MARK_LINE_FORMAT } from '../../services/utils/constants';
import { deepCopy } from '../../services/utils/funtions';

export default function TestChart() {

    const plantState = useSelector(state => state.plants)
    const dispatch = useDispatch()

    const getOption = () => {
        const colors = ['#003366']
        const option = deepCopy(DEFAULT_TIME_SERIES_OPTION)
        option.color = colors
        option.legend.data = ['test1']

        option['xAxis'][0]['data'] = plantState['Planta Bioreactor 40LA']['Date']

        const yAxis1 = deepCopy(DEFAULT_Y_AXIS_FORMAT)
        yAxis1.name = 'test1'
        yAxis1.axisLine.lineStyle.color = colors[0] 
        option.yAxis.push(yAxis1)
        
        const series1 = deepCopy(DEFAULT_SERIES_FORMAT)
        series1.name = 'test1'
        series1['data'] = plantState['Planta Bioreactor 40LA']['Temperatura']

        const markLine1 = deepCopy(DEFAULT_MARK_LINE_FORMAT)
        markLine1.data[0].name = 'test1Max'
        markLine1.data[0].yAxis = 37
        markLine1.data[0].lineStyle.color = colors[0]
        series1['markLine'] = markLine1

        option.series.push(series1)

       

        return option;
    }

    const handleB = () => {
        dispatch(updateDummy(Math.random() * 100))
    }

    return (
        <>
            <Button onClick={handleB}>
                Click Here
            </Button>
            <ReactECharts option={getOption()} style={{ width: 1200 }}>TestChart</ReactECharts>
        </>

    )
}
