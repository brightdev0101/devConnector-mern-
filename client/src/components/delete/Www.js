import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';

import { Bar } from '@ant-design/plots';
import DomePie from './DomePie';

const Www = () => {
    
    const marks = [
        {
            value: 0,
            label: '0°C',
        },
        {
            value: 20,
            label: '20°C',
        },
        {
            value: 37,
            label: '37°C',
        },
        {
            value: 100,
            label: '100°C',
        },
    ];

    // Chart
    const [data, setData] = useState([]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/be63e0a2-d2be-4c45-97fd-c00f752a66d4.json')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => {
            console.log('fetch data failed', error);
        });
    };
    const config = {
        data,
        yField: '城市',
        xField: '销售额',
        yAxis: {
        label: {
            autoRotate: false,
        },
        },
        scrollbar: {
        type: 'vertical',
        },
    };

    
    // Tab Contents
    const blue = {
        50: '#F0F7FF',
        100: '#C2E0FF',
        200: '#80BFFF',
        300: '#66B2FF',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        700: '#0059B2',
        800: '#004C99',
        900: '#003A75',
      };
      
    const Tab = styled(TabUnstyled)`
        font-family: IBM Plex Sans, sans-serif;
        color: white;
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: bold;
        background-color: transparent;
        width: 100%;
        padding: 12px 16px;
        margin: 6px 6px;
        border: none;
        border-radius: 5px;
        display: flex;
        justify-content: center;
      
        &:hover {
          background-color: ${blue[400]};
        }
      
        &:focus {
          color: #fff;
          border-radius: 3px;
          outline: 2px solid ${blue[200]};
          outline-offset: 2px;
        }
      
        &.${tabUnstyledClasses.selected} {
          background-color: ${blue[50]};
          color: ${blue[600]};
        }
      
        &.${buttonUnstyledClasses.disabled} {
          opacity: 0.5;
          cursor: not-allowed;
        }
    `;
      
    const TabPanel = styled(TabPanelUnstyled)`
        width: 100%;
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
    `;
      
    const TabsList = styled(TabsListUnstyled)`
        min-width: 320px;
        background-color: ${blue[500]};
        border-radius: 8px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        align-content: space-between;
    `;


    return (
        <>
            <div style={{'marginBottom': '100px'}} />
            <div className="col-md-3">
                <TabsUnstyled defaultValue={0}>
                    <TabsList>
                        <Tab>Slider</Tab>
                        <Tab>Pie</Tab>
                        <Tab>Chart</Tab>
                    </TabsList>
                    <TabPanel value={0}>
                        First content
                        <Stack sx={{ height: 300 }} spacing={1} direction="row">
                            <Slider
                                aria-label="Temperature"
                                orientation="vertical"
                                // getAriaValueText={valuetext}
                                defaultValue={30}
                            />
                        </Stack>
                    </TabPanel>
                    <TabPanel value={1}>
                        Second content
                        <DomePie />
                    </TabPanel>
                    <TabPanel value={2}>
                      Third content
                      <Bar {...config} />
                      
                    </TabPanel>
                </TabsUnstyled>
            </div>
            <div className="col-md-9">
                This is material UI.
            </div>
        </>
    );
};

export default Www;
