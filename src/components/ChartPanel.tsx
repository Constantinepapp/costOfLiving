





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
import { useState, FC, useRef } from 'react'
import { Button } from '@mui/material'
import { savedDataStore } from '../stores/SavedDataStore';
import { Doughnut, Line } from "react-chartjs-2";
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js';
import { themeStore } from '../stores/ThemeStore';
import { timeStamp } from 'console';
import { toJS } from 'mobx';

Chart.register(CategoryScale)

export function ChartPanel() {



    const hrChartRef = useRef(null)

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
        const byCategory = {}
        let total = 0
        console.log(rows)
        for (let row of rows) {
            const bySubCategory = {}
     
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
                bySubCategory[el.name] = amount
            }
            byCategory[row.category] = {total : sum, sub : bySubCategory}
            total = total + sum
        }
        byCategory['Remaining'] = {total:total,sub:{}}
        console.log(byCategory)
        return [byCategory,total]
    }


    const [balance,total] = getBalance()

    delete balance['Income']


    const createGradient = (colorArr:string[]) =>{
        let gradient
        if (hrChartRef.current) {
            const ctx = hrChartRef.current.ctx
            gradient = ctx.createLinearGradient(0, 0, 0, 200);
            gradient.addColorStop(0, colorArr[0]);
            gradient.addColorStop(1, colorArr[1])
        }
        return gradient
    }

    const colorsArr = []
    for(let i = 0; i<=Object.values(balance).length;i++){
        colorsArr.push(createGradient(getBackgroundColor(Object.keys(balance)[i])))
    }

    const dataHr = () => {
               
      
        return {
            labels: Object.keys(balance),
            datasets: [
                {
                    label: "By Category",
                    data: Object.values(balance).map(cat => cat.total),
                    pointRadius: 3,
                    fill: true,
                    // pointBorderColor:'rgb(255,255,255)',
                    // pointBackgroundColor:'rgb(255,255,255)',
                    backgroundColor: colorsArr,
                    borderColor: colorsArr,
                },
                


            ]
        }

    };



    var chartOptions: any = {
        maintainAspectRatio: false,
        animation: true,
        elements: {
            line: {
                tension: 0.3
            }
        },
        showScale: false,
        pointDot: true,
        showLines: false,
        plugins: {
            legend: {
                display: true,
            },
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            },
            yAxes: [{
                gridLines: {
                    display: false,
                    drawBorder: false,
                },
                // ticks: {
                //   min: minArr.length > range ? maxMin(minArr.slice(minArr.length - 10, minArr.length - 1))[1] : 0.3,
                //   max: maxArr.length > range ? maxMin(minArr.slice(minArr.length - 10, minArr.length - 1))[0] : 0.7
                // }
            }]
        },
        chartArea: {
            backgroundColor: 'rgba(30, 35, 35, 0.99)'
        }
    }
    

    return (
        <div style={{ width: '100%', marginTop: '-0px',height:'30vh',backgroundColor:'rgba(0,0,0,0)' }}>

            <div style={{ width: '100%', height: '100%' }}>
                <Doughnut ref={hrChartRef} data={dataHr()} options={chartOptions} />
            </div>
        </div>
    );
}




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



const getBackgroundColor = (key:string) =>{

    const colorpalette = {'Home':'rgb(40,160,240)','Vital expenses':'rgb(40,60,40)','Recurent':'rgb(140,120,40)','Car':'rgb(40,260,140)','Vacation':'rgb(20,255,255)','Subscriptions':'rgb(250,250,20)','Leisures':'rgb(40,40,100)','Remaining':'rgb(200,255,255)'}
    
    

    let color
    if(colorpalette[key]){
        const red = colorpalette[key].split("(")[1].split(",")[0]
        const green = colorpalette[key].split("(")[1].split(",")[1]
        const blue = colorpalette[key].split("(")[1].split(",")[2].split(")")[0]
        color = [`rgb(${red},${green},${blue})`,`rgb(${red},${Number(green) -50},${blue})`]
    }
    
    return color ?? ['rgb(100,100,100)','rgb(150,150,150)']
}