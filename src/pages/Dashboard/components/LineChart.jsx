import React from 'react'
import { Box } from '@mui/material'
import { ResponsiveLine } from '@nivo/line'


const sampleData = [
    {
        "id": "japan",
        "color": "hsl(190, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 179
            },
            {
                "x": "helicopter",
                "y": 28
            },
            {
                "x": "boat",
                "y": 134
            },
            {
                "x": "train",
                "y": 198
            },
            {
                "x": "subway",
                "y": 285
            },
            {
                "x": "bus",
                "y": 105
            },
            {
                "x": "car",
                "y": 72
            },
            {
                "x": "moto",
                "y": 102
            },
            {
                "x": "bicycle",
                "y": 34
            },
            {
                "x": "horse",
                "y": 151
            },
            {
                "x": "skateboard",
                "y": 252
            },
            {
                "x": "others",
                "y": 155
            }
        ]
    },
    {
        "id": "france",
        "color": "hsl(192, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 290
            },
            {
                "x": "helicopter",
                "y": 288
            },
            {
                "x": "boat",
                "y": 283
            },
            {
                "x": "train",
                "y": 238
            },
            {
                "x": "subway",
                "y": 145
            },
            {
                "x": "bus",
                "y": 115
            },
            {
                "x": "car",
                "y": 98
            },
            {
                "x": "moto",
                "y": 259
            },
            {
                "x": "bicycle",
                "y": 221
            },
            {
                "x": "horse",
                "y": 81
            },
            {
                "x": "skateboard",
                "y": 68
            },
            {
                "x": "others",
                "y": 25
            }
        ]
    },
    {
        "id": "us",
        "color": "hsl(225, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 24
            },
            {
                "x": "helicopter",
                "y": 180
            },
            {
                "x": "boat",
                "y": 289
            },
            {
                "x": "train",
                "y": 74
            },
            {
                "x": "subway",
                "y": 188
            },
            {
                "x": "bus",
                "y": 95
            },
            {
                "x": "car",
                "y": 129
            },
            {
                "x": "moto",
                "y": 56
            },
            {
                "x": "bicycle",
                "y": 176
            },
            {
                "x": "horse",
                "y": 296
            },
            {
                "x": "skateboard",
                "y": 214
            },
            {
                "x": "others",
                "y": 53
            }
        ]
    },
    {
        "id": "germany",
        "color": "hsl(350, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 232
            },
            {
                "x": "helicopter",
                "y": 257
            },
            {
                "x": "boat",
                "y": 51
            },
            {
                "x": "train",
                "y": 202
            },
            {
                "x": "subway",
                "y": 125
            },
            {
                "x": "bus",
                "y": 291
            },
            {
                "x": "car",
                "y": 211
            },
            {
                "x": "moto",
                "y": 172
            },
            {
                "x": "bicycle",
                "y": 86
            },
            {
                "x": "horse",
                "y": 106
            },
            {
                "x": "skateboard",
                "y": 186
            },
            {
                "x": "others",
                "y": 78
            }
        ]
    },
    {
        "id": "norway",
        "color": "hsl(247, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 38
            },
            {
                "x": "helicopter",
                "y": 212
            },
            {
                "x": "boat",
                "y": 288
            },
            {
                "x": "train",
                "y": 105
            },
            {
                "x": "subway",
                "y": 238
            },
            {
                "x": "bus",
                "y": 285
            },
            {
                "x": "car",
                "y": 283
            },
            {
                "x": "moto",
                "y": 114
            },
            {
                "x": "bicycle",
                "y": 199
            },
            {
                "x": "horse",
                "y": 232
            },
            {
                "x": "skateboard",
                "y": 267
            },
            {
                "x": "others",
                "y": 166
            }
        ]
    }
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
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'transportation',
                    legendOffset: 36,
                    legendPosition: 'middle',
                    truncateTickAt: 0
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
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
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