/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ScriptableChartContext,
  ScriptableContext,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CHART_COLORS } from '../../constants/chart-line-color';
import { createGradient } from './utils/create-gradient';
import { MeasureUnit } from '@/shared/types/measure-unit';
import { z } from 'zod';

ChartJS.defaults.font.size = 14;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  // ChartDataLabels
);

export const ChartData = z.object({
  time: z.string(),
  valueUnit: MeasureUnit
})
export type ChartData = z.infer<typeof ChartData>

export function LineChart({
  className,
  title,
  legend,
  lineColor,
  data
} : {
  className?: string;
  title?: string;
  legend?: string
  lineColor?: 'red' | 'blue' | 'green';
  data?: ChartData[];
}) {
  const currentColor = {
    red: CHART_COLORS.RED,
    blue: CHART_COLORS.BLUE,
    green: CHART_COLORS.GREEN,
    '': CHART_COLORS.RED
  }[lineColor ?? ''];
  const currentColorOpacity = {
    red: CHART_COLORS.RED_OPACITY,
    blue: CHART_COLORS.BLUE_OPACITY,
    green: CHART_COLORS.GREEN_OPACITY,
    '': CHART_COLORS.RED_OPACITY
  }[lineColor ?? ''];
  const options = {
    responsive: true,
    parsing: {
      xAxisKey: 'time',
      yAxisKey: 'valueUnit.value'
    },
    plugins: {
      legend: {
        align: 'end' as const,
        position: 'top' as const,
        labels: {
          boxWidth: 0,
          color: CHART_COLORS.BLUE,
          font: {
            size: 16,
          },
        }
      },
      title: {
        display: Boolean(title),
        text: title,
      },
    },
    scales: {
      x: {
        grid: {
          color: CHART_COLORS.WHITE,
          lineWidth: 0.2,
          tickColor: CHART_COLORS.BLUE,
          tickWidth: 2,
        },
        ticks: {
          color: CHART_COLORS.WHITE_OPACITY,
        },
        border: {
          color: CHART_COLORS.BLUE,
          width: 2
        }
      },
      y: {
        grid: {
          color: CHART_COLORS.WHITE,
          lineWidth: 0.2,
          tickColor: CHART_COLORS.OPACITY
        },
        ticks: {
          color: CHART_COLORS.WHITE_OPACITY,  
        },
        border: {
          color: CHART_COLORS.BLUE,
          width: 2
        },
        min: 0
      }, 
    }
  }
  const dataset: any = {
    datasets: [{
      label: legend,
      data: data,
      borderColor: currentColor,
      tension: 0.4,
      backgroundColor: 'rgba(33, 37, 47, 1)',
      pointStyle: 'rect',
      pointHtRadius: 0,
      pointRadius: (ctx: ScriptableContext<'line'>) => {
        return ctx.dataIndex + 1 === data?.length ? 8 : 5
      },
      fill: (ctx: ScriptableChartContext) => {
        return {
          target: 'origin', 
          above: createGradient(ctx.chart.ctx, currentColorOpacity, CHART_COLORS.OPACITY)
        }
      },
      // datalabels: {
      //   display: (ctx: Context) => {
      //     return ctx.dataIndex + 1 === data?.length
      //   },
      //   anchor: 'end',
      //   clamping: true,
      //   color: currentColor,
      //   formatter: (ctx: ChartData) => ctx.value
      // },
    }]
  }
  return (
    <Line className={className} options={options} data={dataset} updateMode='resize'/>
  )
}