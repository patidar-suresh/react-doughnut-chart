import "./styles.css";
import { MouseEvent, useRef } from "react";
import { Chart as ChartJS, InteractionItem, ArcElement, Tooltip, Legend, DoughnutControllerChartOptions, Align, LayoutPosition } from "chart.js";
import { Doughnut, getDatasetAtEvent, getElementAtEvent } from "react-chartjs-2";
import faker from 'faker';
import { Interaction } from "chart.js/dist";

ChartJS.register(ArcElement, Tooltip, Legend);

const labels = ["Option 1 asdf asdf asdf", "Option 2", "Option 3", "Option 4"];
const labels1 = ["Option 1.1", "Option 1.2", "Option 1.3"];
const labels2 = ["Option 2.1", "Option 2.20"];
const labels3 = ["Option 3.1", "Option 3.2", "Option 3.3"];
const labels4 = ["Option 4.1", "Option 4.2", "Option 4.3", "Option 4.4"];
export const data = {
  labels,
  datasets: [
    {
      label: "# of features",
      data: labels.map(() => faker.datatype.number({ min: 10, max: 50 })),
      backgroundColor: [
        "rgb(214, 28, 78)",
        "rgb(247, 126, 33)",
        "rgb(250, 194, 19)",
        "rgb(254, 249, 167)",
        "rgb(176, 139, 187)",
        "rgb(181, 213, 197)"
      ]
      ,borderWidth: 0
    }
    ,{data:[1], backgroundColor:["rgb(247, 126, 33, 0.5)"], borderWidth:0, spacing:0, cutout:0, animation:{duration:0}}

  ]
};

const plugins = [{
  id:"custom-text-in-middle",
  beforeDraw: function(chart:any) {
   var width = chart.width,
       height = chart.height,
       ctx = chart.ctx;
       ctx.restore();
       var fontSize = (height / 160).toFixed(2);
       ctx.font = fontSize + "em sans-serif";
       ctx.textBaseline = "middle";
       ctx.textAlign = 'center';
       var text = "C100/2",
       centerX = ((chart.chartArea.left + chart.chartArea.right) / 2),
       centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
       ctx.fillText(text, centerX, centerY);
       ctx.save();
  } 
}];

const bottom: LayoutPosition = 'left';
const alignEnd: Align = 'end';
const options = {
  circumference: 360,
  cutout: '25%',
  spacing:5,
  response:true,
  animation: {
    animateScale: true,
    animateRotate: true
  },
  plugins: {
    legend: {
        display: true,
        position:bottom,
        align: alignEnd,
        labels: {
          usePointStyle: true
        },
        title: {
          display: true,
          text: "CES",
          font: {
            size: 18
        }
        }
    }
  }
}

export default function App() {
  const chartRef = useRef<ChartJS>(null);
  const onClick = (event:MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef;
    if (!chart) {
      return;
    }
    let interaction :InteractionItem[] = getElementAtEvent(chart, event);
    chart.data.datasets = structuredClone(chart.data.datasets);
    if (!interaction.length) {
      chart.data.labels = labels;
      chart.data.datasets[0].data = labels.map(() => faker.datatype.number({ min: 10, max: 50 }))
    } else if (interaction[0].index === 0) {
      chart.data.labels = labels1;
      chart.data.datasets[0].data = labels1.map(() => faker.datatype.number({ min: 10, max: 50 }))
    } else if (interaction[0].index === 1) {
      chart.data.labels = labels2;
      chart.data.datasets[0].data = labels2.map(() => faker.datatype.number({ min: 10, max: 100 }))
    } else if(interaction[0].index === 2) {
      chart.data.labels = labels3;
      chart.data.datasets[0].data = labels3.map(() => faker.datatype.number({ min: 10, max: 150 }))
    } else {
      chart.data.labels = labels4;
      chart.data.datasets[0].data = labels4.map(() => faker.datatype.number({ min: 10, max: 200 }))
    }
    // chart.destroy();
    // chart.an = new Chart(ctx, config);
    chart.update();
    console.log(getDatasetAtEvent(chart, event));
    console.log(getElementAtEvent(chart, event));
  }
  return <Doughnut 
            ref={chartRef}
            data={data}
            plugins={plugins}
            options={options}
            onClick={onClick} />;
}
