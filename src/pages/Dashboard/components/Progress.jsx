import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

export const Progress = (props) => {
    const { value } = props;
    return (
        <Box width={200}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    value
                )}%`}</Typography>
            </Box>
        </Box>
    )
}