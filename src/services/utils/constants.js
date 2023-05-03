import { generateRandomDarkColorsArray } from "./funtions"

export const DEFAULT_TIME_SERIES_OPTION = {
  color: generateRandomDarkColorsArray(100),
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  grid: {
    right: '0%',
    left: '30%'
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: true },
      saveAsImage: { show: true }
    }
  },
  legend: {
    data: []
  },
  dataZoom: [
    {
      id: 'dataZoomX',
      type: 'slider',
      xAxisIndex: [0]
    }
  ],
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      // prettier-ignore
      data: []
    }
  ],
  yAxis: [],
  series: []
}
export const DEFAULT_Y_AXIS_FORMAT = {
  type: 'value',
  name: '',
  position: 'left',
  alignTicks: true,
  offset: 0,
  axisLine: {
    show: true,
    lineStyle: {
      color: ''
    }
  },
  axisLabel: {
    formatter: '{value}'
  }
}
export const DEFAULT_SERIES_FORMAT = {
  name: '',
  type: 'line',
  data: []
}
