import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { IState } from '../store';
import {useSelector} from "react-redux";

const getMetric = (state: IState) => {
    const {measurements_o, measurements_w, measurements_c} = state.metric;
    return {
        measurements_o,
        measurements_w,
        measurements_c,
    };
};


export default () => {

    const {measurements_o, measurements_w, measurements_c} = useSelector(getMetric);
    let data2: any[] = [];
    for (let i = 0; i < measurements_o.length; i++) {
        //console.log(measurements_o[i].value);
        data2.push({oilTemp: measurements_o[i].value});
    }
    for (let i = 0; i < measurements_w.length; i++) {
        data2[i] = {... data2[i], ...{waterTemp: measurements_w[i].value}}
    }
    for (let i = 0; i < measurements_c.length; i++) {
        data2[i] = {... data2[i], ...{casingPressure: measurements_c[i].value}}
    }
    //console.log(data2);

    return (
        <LineChart
            width={1600}
            height={500}
            data={data2}
            margin={{
                top: 5, right: 30, left: 30, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/*{data2}*/}
            <Line type="monotone" dataKey="oilTemp" dot={false} stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="waterTemp" dot={false} stroke="#82ca9d" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="casingPressure" dot={false} stroke="#9e0000" activeDot={{ r: 8 }} />
        </LineChart>
    );
}

