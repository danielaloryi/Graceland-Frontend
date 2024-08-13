import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import BASEURL from '../Connection/BASEURL';

const Graph = () => {

    const [chartData, setChartData] = useState({ options: {}, series: [] });



    useEffect(() => {
        axios.get(`${BASEURL}/c/deceased-data`)
            .then((response) => {
                const data = response.data;

                if (data && Array.isArray(data)) {
                    const years = data.map((item) => item.year);
                    const counts = data.map((item) => item.count);

                    const chartOptions = {
                        chart: {
                            id: 'deceased-bar',

                        },
                        xaxis: {
                            categories: years,
                        },
                        plotOptions: {
                            bar: {
                                horizontal: false, // Set to true for horizontal bar chart
                                columnWidth: '6%',
                                colors: {
                                    backgroundBarColors: ['#083050'], // Set the desired color here
                                }, // Adjust the width as needed (e.g., '40%')
                            },
                        }
                    };

                    const chartSeries = [
                        {
                            name: 'Number of Deceased',
                            data: counts,
                        },
                    ];

                    setChartData({ options: chartOptions, series: chartSeries });
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className=' shadow-md bg-white rounded-[10px] mt-12'>
            <div className='  px-3 py-3'>
                <h1 className=' text-center'> Graph of Deceased Burials Over the Years </h1>
            </div>
            {chartData.options && chartData.series && (
                <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={250} />
            )}
        </div>
    );
};

export default Graph;
