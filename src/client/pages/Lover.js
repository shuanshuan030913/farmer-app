
import React from 'react';
import PropTypes from 'prop-types';
import {map} from 'lodash';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {COUNTRIES} from '../constants';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {map(COUNTRIES, (c, idx) => <Tab {...{
                            key: idx,
                            label: `${c.zh}(${c.jp})`,
                            ...a11yProps(idx),
                        }} />)}
                </Tabs>
            </Box>
            {map(COUNTRIES, (c, idx) => <TabPanel {...{
                    value: value,
                    index: idx,
            }}>
                <div>{c.zh}({c.jp})</div>
            </TabPanel>)}
        </Box>
    );
}

function Lover() {
    return <div>
        <h2>戀愛對象簡介</h2>
        <BasicTabs />
    </div>;
}

export default Lover;