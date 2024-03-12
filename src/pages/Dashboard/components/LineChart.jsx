import React from 'react'
import { Box } from '@mui/material'
import { nivoColors } from '../../../constants'
import { ResponsiveLine } from '@nivo/line'


const sampleData = [
    {
        id: "food",
        data: [{
            x: "2023-01-01",
            y: 120,
        },
        {
            x: "2023-01-02",
            y: 30,
        }, {
            x: "2023-01-03",
            y: 190,
        }, {
            x: "2023-01-04",
            y: 290,
        }, {
            x: "2023-01-05",
            y: 390,
        },
        ]
    },
    {
        id: "allowance",
        data: [{
            x: "2023-01-01",
            y: 210,
        },
        {
            x: "2023-01-02",
            y: 140,
        }, {
            x: "2023-01-03",
            y: 400,
        }, {
            x: "2023-01-04",
            y: 200,
        }, {
            x: "2023-01-05",
            y: 120,
        },
        ]
    },
]

const LineChart = () => {
    return (
        <Box width={600} height={400}>
            <ResponsiveLine
                data={sampleData}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false
                }}
                colors={nivoColors}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'dates',
                    legendOffset: 36,
                    legendPosition: 'middle',
                    truncateTickAt: 0,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'count',
                    legendOffset: -40,
                    legendPosition: 'middle',
                    truncateTickAt: 0
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 40,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(255, 255, 255, 1)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(255, 255, 255, 1)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </Box>
    )
}

export default LineChart