import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { observer } from "mobx-react-lite";
import { savedDataStore } from '../stores/SavedDataStore';
import { toJS } from 'mobx';
import { Checkbox } from '@mui/material';
import {ChartPanel} from './ChartPanel';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';




export const Summary = observer(() => {

    const [totalByCategory, setTotalByCategory] = React.useState({

    })

    //console.log(toJS(savedDataStore.coi))
    const coi = savedDataStore.coi
    //console.log(toJS(coi))
    const rows = Object.entries(coi).map(row => createData(coi.id, row[0], row[1]))


    const amountByMonth = (subRow) => {
        if (subRow.timeUnit == "Month") {
            return subRow.amount
        }
        if (subRow.timeUnit == "Year") {
            return subRow.amount / 12
        }
        if (subRow.timeUnit == "Day") {
            return subRow.amount * 365 / 12
        }
    }

    const getBalance = () => {
        let total = 0
        console.log(rows)
        for (let row of rows) {
          
            let sum = 0
            for (let el of Object.values(row.obj)) {
                const amount = amountByMonth(el)
                if (!el.excluded) {
                    if (el.type == "Expense") {
                        sum = sum - amount
                    }
                    else if (el.type == "Income") {
                        sum = sum + amount
                    }
                }
            }
            total = total + sum
        }
        return total?.toFixed(2)
    }
    return (
        <div style={{width:'100%',height:'100%',padding:'0px',margin:'0px'}}>
            <ChartPanel/>
        
        <TableContainer component={Paper}>
            
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Match</TableCell>
                        <TableCell align="right">Total bet €</TableCell>
                        <TableCell align="right">House cut %</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row[0]} row={row} />
                    ))}
                    <TableRow sx={{ '& > *': { borderBottom: 'unset', fontWeight: '1000' } }}>
                        <TableCell>

                        </TableCell>
                        <TableCell component="th" scope="row">
                            Total Balance
                        </TableCell>
                        <TableCell align="right" sx={{ color: Number(getBalance()) > 0 ? "rgb(30,200,100)" : 'rgb(200,100,20)', fontWeight: '1000' }}>{getBalance()}</TableCell>
                        <TableCell align="right" style={{ color: 'rgb(240,30,0)', fontWeight: '1000', fontSize: '15px', cursor: 'pointer' }}></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    )
})




function createData(
    id: string,
    category: string,
    obj: Record<string, ExpenseIncome>,
) {
    return {
        id,
        category,
        obj,
    };
}

const Row = observer((props: { row: ReturnType<typeof createData> }) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    //console.log(toJS(row))
    const calculateBalance = (obj) => {
        let sum = 0
        //console.log(toJS(obj))
        for (let el of Object.values(obj)) {
            const amount = amountByMonth(el)
            if (!el.excluded) {
                if (el.type == "Expense") {
                    sum = sum - amount
                }
                else if (el.type == "Income") {
                    sum = sum + amount
                }
            }
        }
        return sum.toFixed(2)
    }

    const amountByMonth = (subRow) => {
        if (subRow.timeUnit == "Month") {
            return subRow.amount
        }
        if (subRow.timeUnit == "Year") {
            return subRow.amount / 12
        }
        if (subRow.timeUnit == "Day") {
            return subRow.amount * 365 / 12
        }
    }

    const setExcluded = (category, id) => {
        savedDataStore.coi[category][id] = { ...savedDataStore.coi[category][id], excluded: !savedDataStore.coi[category][id].excluded }
    }

    const setAllExcluded = (category) => {
        const getBool = Object.values(savedDataStore.coi[category]).filter(el => !el.excluded).length > 0
        const newCategory = {}
        for (let cat of Object.values(savedDataStore.coi[category])) {
            newCategory[cat.id] = { ...cat, excluded: getBool }
        }
        savedDataStore.coi[category] = newCategory
    }

    const getExcludedAllValue = (category) => {
        return Object.values(savedDataStore.coi[category]).filter(el => !el.excluded).length > 0
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? "Close" : "Open"}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.category}
                </TableCell>
                <TableCell align="right">{calculateBalance(row.obj)}€</TableCell>
                <TableCell align="right" ><Checkbox onClick={e => setAllExcluded(row.category)} checked={getExcludedAllValue(row.category)}></Checkbox></TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Amount </TableCell>
                                        <TableCell>By Month </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.values(row?.obj)?.map((subRow) => (
                                        <TableRow key={subRow.name}>
                                            <TableCell component="th" scope="row">
                                                {subRow.name}
                                            </TableCell>
                                            <TableCell style={{ color: subRow.type == "Expense" ? 'rgb(200,100,40)' : 'rgb(40,200,100)', fontWeight: '900' }}>{subRow.amount}/<span style={{color:'rgb(130,30,30)',fontSize:'10px'}}>{subRow.timeUnit}</span></TableCell>
                                            
                                            <TableCell style={{ color: subRow.type == "Expense" ? 'rgb(200,100,40)' : 'rgb(40,200,100)', fontWeight: '900' }}>{amountByMonth(subRow).toFixed(2)}</TableCell>
                                            <TableCell align="right" onClick={e => setExcluded(row.category, subRow.id)} ><Checkbox checked={!subRow.excluded}></Checkbox></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
})


type ExpenseIncome = {
    id: string
    timeUnit: "Day" | 'Month' | 'Year'
    amount: number
    type: 'Expense' | "Income"
    name: string,
    excluded:boolean
}

const getComboStyle = (row, combo) => {
    if (row.bestCombo.name == combo) {
        return { color: 'rgb(40,180,0)', fontWeight: '1000' }
    }
}

// {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}