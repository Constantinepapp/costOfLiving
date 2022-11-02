import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState, FC } from 'react'
import { Button } from '@mui/material'
import { savedDataStore } from '../../stores/SavedDataStore';

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

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [data, setData] = useState({
        'Income': {
            '1': { id: '1', name: 'Sallary', timeUnit: 'Month', amount: 1400, type: 'Income', exlcude: false },
            '2': { id: '2', name: 'Additional sallaries', timeUnit: 'Year', amount: 2800, type: 'Income', exlcude: false },
            '3': { id: '3', name: 'Bonus', timeUnit: 'Year', amount: 0, type: 'Income', exlcude: false },
        },
        'Home': {
            '1': { id: '1', name: 'Rent', timeUnit: 'Month', amount: 400, type: 'Expense', exlcude: false },
            '3': { id: '3', name: 'Loan', timeUnit: 'Month', amount: 0, type: 'Expense', exlcude: false },
            '4': { id: '4', name: 'Tax', timeUnit: 'Year', amount: 0, type: 'Expense', exlcude: false }
        },
        'Bills': {
            '6': { id: '6', name: 'Utils', timeUnit: 'Month', amount: 15, type: 'Expense', exlcude: false },
            '1': { id: '1', name: 'Electricity', timeUnit: 'Month', amount: 100, type: 'Expense', exlcude: false },
            '2': { id: '2', name: 'Water', timeUnit: 'Month', amount: 20, type: 'Expense', exlcude: false },
            '3': { id: '3', name: 'Heat', timeUnit: 'Month', amount: 60, type: 'Expense', exlcude: false },
            '4': { id: '4', name: 'Internet', timeUnit: 'Month', amount: 27, type: 'Expense', exlcude: false },
            '5': { id: '5', name: 'Cell phone', timeUnit: 'Month', amount: 15, type: 'Expense', exlcude: false },
        },
        'Vital expenses': {
            '1': { id: '1', name: 'Groceries', timeUnit: 'Month', amount: 250, type: 'Expense', exlcude: false },
            '2': { id: '2', name: 'Commuting', timeUnit: 'Month', amount: 27, type: 'Expense', exlcude: false },
            '3': { id: '3', name: 'Haircut', timeUnit: 'Month', amount: 15, type: 'Expense', exlcude: false },
        },
        'Recurent': {
            '1': { id: '1', name: 'Clothes', timeUnit: 'Year', amount: 250, type: 'Expense', exlcude: false },
            '2': { id: '2', name: 'Cell phone', timeUnit: 'Year', amount: 60, type: 'Expense', exlcude: false },
            '3': { id: '3', name: 'PC', timeUnit: 'Year', amount: 120, type: 'Expense', exlcude: false },
            '4': { id: '4', name: 'Credit card payment', timeUnit: 'Month', amount: 119, type: 'Expense', exlcude: false },
            '5': { id: '5', name: 'Other monthly payments', timeUnit: 'Month', amount: 0, type: 'Expense', exlcude: false },
        },

        "Car": {
            '1': { id: '1', name: 'Tax', timeUnit: 'Year', amount: 135, type: 'Expense', exlcude: false },
            '2': { id: '2', name: 'Insurance', timeUnit: 'Year', amount: 240, type: 'Expense', exlcude: false },
            '3': { id: '3', name: 'Gas', timeUnit: 'Month', amount: 120, type: 'Expense', exlcude: false },
            '4': { id: '4', name: 'Service', timeUnit: 'Year', amount: 135, type: 'Expense', exlcude: false },
            '5': { id: '5', name: 'Tyres', timeUnit: 'Year', amount: 40, type: 'Expense', exlcude: false },
            '6': { id: '6', name: 'Unexpectide repairs', timeUnit: 'Year', amount: 20, type: 'Expense', exlcude: false },
        },
        "Leisures": {
            '1': { id: '1', name: 'Coffee/Restaurants', timeUnit: 'Month', amount: 100, type: 'Expense', exlcude: false },
            '2': { id: '2', name: 'Take away food and coffee', timeUnit: 'Month', amount: 50, type: 'Expense', exlcude: false },
            '3': { id: '3', name: 'Hobbies', timeUnit: 'Month', amount: 0, type: 'Expense', exlcude: false },
            '4': { id: '4', name: 'Smoking', timeUnit: 'Month', amount: 50, type: 'Expense', exlcude: false },
        },
        "Subscriptions": {
            '1': { id: '1', name: 'Streaming services', timeUnit: 'Month', amount: 0, type: 'Expense', exlcude: false },
            '2': { id: '2', name: 'Credit card subscription', timeUnit: 'Month', amount: 20, type: 'Expense', exlcude: false },
            '3': { id: '3', name: 'Other subscriptions', timeUnit: 'Month', amount: 0, type: 'Expense', exlcude: false },
        },
        "Vacation": {
            '1': { id: '1', name: 'Vacation', timeUnit: 'Month', amount: 400, type: 'Expense', exlcude: false },
        },

    })

    React.useEffect(() => {
        if (Object.values(savedDataStore.coi).length > 0) {
            //@ts-ignore
            setData(savedDataStore.coi)
        }
    }, [savedDataStore.coi])

    const handleDataChange = (tab: string, id: number, unit: string, value) => {
        console.log(tab, id, unit, value)
        try {
            console.log(typeof (value))
            if (!value) {
                value = ""
            }
            setData({
                ...data,
                [tab]: { ...data[tab], [id]: { ...data[tab][id], [unit]: value } }
            })
        }
        catch {
            console.log("err")
        }

    }

    const handleAddNewRow = (tab: string) => {
        const idArr = Object.keys(data[tab]).map(id => parseInt(id)).sort()
        const newId = idArr[idArr.length - 1] + 1
        setData({
            ...data,
            [tab]: { ...data[tab], [newId]: { id: newId.toString(), amount: '0', name: "", timeUnit: 'Month', type: tab == "Income" ? "Income" : 'Expense', exlcude: false } }
        })
    }

    const saveData = () => {
        console.log(data)
        savedDataStore.saveCoi("Master", data)
    }

    const tabsArr = Object.keys(data)

    const handleDeleteRow = (tab,id) =>{
        const newTab = {}

        for(let el of Object.values(data[tab])){
            if(el.id != id){
                newTab[el.id] = el
            }
           
        }
        setData({
            ...data,
            [tab] : newTab
        })
    }

    return (
        <Box sx={{ width: '100%', marginTop: '-0px' }}>
            <Button onClick={e => saveData()}>Save</Button>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Income" {...a11yProps(2)} />
                    <Tab label="Home" {...a11yProps(0)} />
                    <Tab label="Home bills" {...a11yProps(1)} />
                    <Tab label="Vital expenses" {...a11yProps(2)} />
                    <Tab label="Recurrent" {...a11yProps(2)} />
                    <Tab label="Car" {...a11yProps(2)} />
                    <Tab label="Leisures" {...a11yProps(2)} />
                    <Tab label="Subscriptions" {...a11yProps(2)} />
                    <Tab label="Vacation" {...a11yProps(2)} />
                    <Tab label="Savings" {...a11yProps(2)} />
                </Tabs>
            </Box>
            {Object.keys(data).map(tab => (

                tab != "id" && <TabPanel style={{ position: 'relative' }} value={value} index={tabsArr.indexOf(tab)}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <Button sx={{ backgroundColor: 'rgb(40,200,200)', marginLeft: '20px', position: 'absolute', right: '0', color: 'rgb(255,255,255)' }} onClick={e => handleAddNewRow(tab)}>Add</Button>
                    </div>
                    {Object.values(data[tab]).map(row => (

                        //@ts-ignore
                        row && <ExpenseRow tab={tab} row={row} handleDataChange={handleDataChange} handleDeleteRow={handleDeleteRow}/>
                    ))}

                </TabPanel>
            ))}

        </Box>
    );
}



const ExpenseRow: FC<{ tab: string, row: { id: string, amount: any, timeUnit: string, name: string, type: string }, handleDataChange: any,handleDeleteRow:any }> = ({ tab, row, handleDataChange,handleDeleteRow }) => {

    

    return (
        <div style={{ display: 'flex', gap: '5vw' }}>
            <TextField
                label="Name"
                value={row.name}
                onChange={e => handleDataChange(tab, row.id, 'name', e.target.value)}
                id="outlined-start-adornment"
                sx={{ m: 1, width: '15vw' }}
            />
            <TextField
                label="Amount"
                value={row.amount}
                id="outlined-start-adornment"
                onChange={e => handleDataChange(tab, row.id, 'amount', Number(e.target.value))}
                sx={{ m: 1, width: '15vw' }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
            />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select "
                    value={row.timeUnit}
                    label="Age"
                    onChange={e => handleDataChange(tab, row.id, 'timeUnit', e.target.value)}
                    sx={{ m: 1, width: '8vw' }}
                >
                    <MenuItem value={"Day"}>Day</MenuItem>
                    <MenuItem value={"Week"}>Week</MenuItem>
                    <MenuItem value={"Month"}>Month</MenuItem>
                    <MenuItem value={"Year"}>Year</MenuItem>
                </Select>


                <Button sx={{ backgroundColor: "", marginLeft: '20px', color: 'rgb(255,0,0)', height: '30px', fontWeight: '1000' }} onClick={e => handleDeleteRow(tab,row.id)}>X</Button>
            </div>





        </div>
    )
}

