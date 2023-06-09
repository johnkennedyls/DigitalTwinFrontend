import { generateRandomDarkColorsArray } from "./funtions"

export const DEFAULT_TIME_SERIES_OPTION = {
  color: [
  "#FF5733", // Rojo brillante
  "#FFC300", // Amarillo brillante
  "#28A745", // Verde brillante
  "#007BFF", // Azul brillante
  "#FFC0CB", // Rosa claro
  "#6C757D", // Gris oscuro
  "#17A2B8", // Turquesa brillante
  "#E83E8C", // Rosa oscuro
  "#FFD700", // Oro
  "#8A2BE2", // Violeta
  "#7FFF00", // Chartreuse
  "#D2691E", // Chocolate
  "#DC143C", // Rojo carmesí
  "#FF4500", // Rojo naranja
  "#2E8B57", // Verde marino
  "#ADFF2F", // Verde amarillo
  "#FFA07A", // Salmón claro
  "#20B2AA", // Verde claro
  "#BA55D3", // Orquídea medio
  "#F08080", // Coral claro
  ...generateRandomDarkColorsArray(100)],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  grid: {
    bottom: '20%',
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
      type: 'slider',
      xAxisIndex: 0,
      filterMode: 'none'
    },
    {
      type: 'slider',
      yAxisIndex: 0,
      filterMode: 'none'
    },
    {
      type: 'inside',
      yAxisIndex: 0,
      filterMode: 'none'
    }
  ],
  xAxis: [
    {
      type: 'time',
      axisLabel: {
        rotate: 45,
        align: 'right',
        formatter: '{yyyy}-{MM}-{dd}  \n{hh}:{mm}:{ss}  '
      },
      axisTick: {
        alignWithLabel: true
      },
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
  Symbol: 'circle',
  data: []
}
export const DEFAULT_MARK_LINE_FORMAT = {
  data: [
    {
      name: '',
      yAxis: 0, 
      label: {
        position: 'middle',
        formatter: ''
      },
      lineStyle: {
        color: '',
        type: 'dashed',
        opacity: 0.5
      }
    }
  ]
}
export const SYMBOLS = ['emptyCircle', 'rect', 'triangle', 'diamond', 'circle', 'roundRect', 'pin', 'arrow']