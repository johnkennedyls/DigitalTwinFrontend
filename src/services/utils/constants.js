import { generateRandomDarkColorsArray } from "./funtions"
import moment from 'moment'

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
      show: true,
      realtime: true,
    },
    {
      type: 'inside',
      realtime: true,
    }
  ],
  xAxis: [
    {
      type: 'category',
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