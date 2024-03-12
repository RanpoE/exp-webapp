import { useEffect, useState } from "react";
import { userDataExpenses } from "../../../constants";

import { ResponsivePie } from "@nivo/pie";
import { Box } from "@mui/material";


const sample = [
    {
      "id": "stylus",
      "label": "stylus",
      "value": 68,
      "color": "hsl(230, 70%, 50%)"
    },
    {
      "id": "css",
      "label": "css",
      "value": 359,
      "color": "hsl(15, 70%, 50%)"
    },
    {
      "id": "javascript",
      "label": "javascript",
      "value": 236,
      "color": "hsl(213, 70%, 50%)"
    },
    {
      "id": "rust",
      "label": "rust",
      "value": 488,
      "color": "hsl(261, 70%, 50%)"
    },
    {
      "id": "erlang",
      "label": "erlang",
      "value": 297,
      "color": "hsl(163, 70%, 50%)"
    }
  ]

const RadialPie = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const dateExpenses = userDataExpenses['2023-01-10'] || []
        
        setData(dateExpenses)
    }, []);

    return (
        <Box width={400} height={400}>
            <ResponsivePie
                data={data}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.8}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.2
                        ]
                    ]
                }}
                colors={{scheme: "blues"}}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            2
                        ]
                    ]
                }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 1)',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 1)',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 56,
                        itemsSpacing: 0,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#fff'
                                }
                            }
                        ]
                    }
                ]}
            />
        </Box>
    )
}
export default RadialPie