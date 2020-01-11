import { createSlice, PayloadAction } from 'redux-starter-kit';

export type getMultipleMeasurements = [{
    metric: '',
    measurements: [],
    __typename: '',
}];
export type getMultipleMeasurements2 = [
    {
        metric: '',
        measurements: [],
        __typename: '',
    },
    {
        metric: '',
        measurements: [],
        __typename: '',
    }
];
export type getMultipleMeasurements3 = [
    {
        metric: '',
        measurements: [],
        __typename: '',
    },
    {
        metric: '',
        measurements: [],
        __typename: '',
    },
    {
        metric: '',
        measurements: [],
        __typename: '',
    }
];

export type ApiErrorAction = {
    error: string;
};

let initialState = {
    measurements_o: [{
        at: 0,
        value: 0,
        metric: '',
        unit: '',
        __typename: ''
    }],
    measurements_w: [{
        at: 0,
        value: 0,
        metric: '',
        unit: '',
        __typename: ''
    }],
    measurements_c: [{
        at: 0,
        value: 0,
        metric: '',
        unit: '',
        __typename: ''
    }],
};
// let initialState = {};


const slice = createSlice({
    name: 'metric',
    initialState,
    reducers: {
        metricDataRecevied_o: (state, action: PayloadAction<getMultipleMeasurements>) => {
            state.measurements_o = action.payload[0].measurements;
        },
        metricDataRecevied_w: (state, action: PayloadAction<getMultipleMeasurements>) => {
            state.measurements_w = action.payload[0].measurements;
        },
        metricDataRecevied_c: (state, action: PayloadAction<getMultipleMeasurements>) => {
            state.measurements_c = action.payload[0].measurements;
        },
        metricDataRecevied_ow: (state, action: PayloadAction<getMultipleMeasurements2>) => {
            state.measurements_o = action.payload[0].measurements;
            state.measurements_w = action.payload[1].measurements;
        },
        metricDataRecevied_oc: (state, action: PayloadAction<getMultipleMeasurements2>) => {
            state.measurements_o = action.payload[0].measurements;
            state.measurements_c = action.payload[1].measurements;
        },
        metricDataRecevied_wc: (state, action: PayloadAction<getMultipleMeasurements2>) => {
            state.measurements_w = action.payload[0].measurements;
            state.measurements_c = action.payload[1].measurements;
        },
        metricDataRecevied_3: (state, action: PayloadAction<getMultipleMeasurements3>) => {
            state.measurements_o = action.payload[0].measurements;
            state.measurements_w = action.payload[1].measurements;
            state.measurements_c = action.payload[2].measurements;
        },
        metricApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,

    },
});

export const reducer = slice.reducer;
export const actions = slice.actions;

