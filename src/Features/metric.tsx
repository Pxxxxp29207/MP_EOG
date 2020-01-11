import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { actions } from './metric_reducer';
import Metric_chart from './metric_chart'

const client = createClient({
    url: 'https://react.eogresources.com/graphql',
});

const query = `
query ($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      at
      value
      metric
      unit
      __typename
    }
    __typename
  }
  __typename
}
`;
type Props = {
    select: any[];
}

export default ({select} :Props) =>{
    return (
        <Provider value={client}>
            <Metric select = {select}/>
        </Provider>
    );

};

const Metric = ({select} :Props) => {
    //console.log(select);
    let input = [];
    for (let j = 0; j < select.length; j++){
        if (select[j] == 'OilTemp') {
            input.push({
                "metricName": "oilTemp",
                "after": 1578763132712
            })
        }else if (select[j] == 'WaterTemp'){
            input.push({
                "metricName": "waterTemp",
                "after": 1578763132712
            })
        }else if (select[j] == 'CasingPressure') {
            input.push({
                "metricName": "casingPressure",
                "after": 1578763132712
            })
        }
    }
    // const input = [
    //     {
    //         "metricName": "oilTemp",
    //         "after": 1578757787163
    //     },
    //     {
    //         "metricName": "waterTemp",
    //         "after": 1578757787163
    //     },
    //     {
    //         "metricName": "casingPressure",
    //         "after": 1578757787163
    //     }
    // ];
    const dispatch = useDispatch();

    const [result] = useQuery({
        query,
        variables: {
            input,
        },
    });
    const { fetching, data, error } = result;
    useEffect(() => {
        if (error) {
            dispatch(actions.metricApiErrorReceived({ error: error.message }));
            return;
        }
        if (!data) return;
        const { getMultipleMeasurements } = data;
        //console.log(data);
        if (getMultipleMeasurements.length === 1) {
            if (select.includes('OilTemp')) {dispatch(actions.metricDataRecevied_o(getMultipleMeasurements));}
            if (select.includes('WaterTemp')) {dispatch(actions.metricDataRecevied_w(getMultipleMeasurements));}
            if (select.includes('CasingPressure')) {dispatch(actions.metricDataRecevied_c(getMultipleMeasurements));}
        }else if (getMultipleMeasurements.length === 2) {
            if (select.includes('OilTemp') && select.includes('WaterTemp')) {dispatch(actions.metricDataRecevied_ow(getMultipleMeasurements));}
            if (select.includes('OilTemp') && select.includes('CasingPressure')) {dispatch(actions.metricDataRecevied_oc(getMultipleMeasurements));}
            if (select.includes('WaterTemp') && select.includes('CasingPressure')) {dispatch(actions.metricDataRecevied_wc(getMultipleMeasurements));}
        }else if (getMultipleMeasurements.length === 3) {
            dispatch(actions.metricDataRecevied_3(getMultipleMeasurements));
        }

    }, [dispatch, data, error]);

    if (fetching) return <LinearProgress />;

    return (
        <div>
            <h1>Metric Chart</h1>
            <Metric_chart />
        </div>
    );
};
