import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function ChartComponent({ data, size }) {
    data = data.slice(0, size);
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const chartCanvas = chartRef.current.getContext('2d');
            if (!chartCanvas.chart) {
                chartCanvas.chart = new Chart(chartCanvas, {
                    type: 'line',
                    data: {
                        labels: data.map(item => item.createdDate),
                        datasets: [
                            {
                                label: 'Body-Mass-Index',
                                data: data.map(item => item.bodyMassIndex),
                                backgroundColor: 'black',
                                borderColor: 'black',
                                borderWidth: 1
                            },
                            {
                                label: 'Fat-Rate',
                                data: data.map(item => item.fatRate),
                                backgroundColor: 'red',
                                borderColor: 'red',
                                borderWidth: 1
                            },
                            {
                                label: 'Musculo-Skeletal-Mass',
                                data: data.map(item => item.musculoskeletalMass),
                                backgroundColor: 'blue',
                                borderColor: 'blue',
                                borderWidth: 1
                            },
                        ]
                    },
                    options: {}
                });
            } else {
                chartCanvas.chart.data.labels = data.map(items => items.createdDate);
                chartCanvas.chart.data.datasets[0].data = data.map(items => items.bodyMassIndex);
                chartCanvas.chart.data.datasets[1].data = data.map(items => items.fatRate);
                chartCanvas.chart.data.datasets[2].data = data.map(items => items.musculoskeletalMass);
                chartCanvas.chart.update();
            }
        }
    }, [data]);

    return <canvas id="chart" ref={chartRef} width="100%" height="30%" />;
};
