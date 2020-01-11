import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
//import OilTemp from "../Features/OilTemp/OilTemp";
// import WaterTemp from "../Features/WaterTemp/WaterTemp";
// import CasingPressure from "../Features/CasingPressure/CasingPressure";
import Metric_ from '../Features/metric'


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
        minHeight: 200,
    }
}));

type Props = {
    select: any[];
}

export default () => {
    const classes = useStyles();
    const [temp, setTemp] = React.useState(['']);
    //const [title, setTitle] = React.useState('');
    const [open, setOpen] = React.useState(false);


    const handleChange = (event: any) => {
        if (temp.includes(event.target.value)) {
            console.log("delete");
            let index = temp.indexOf(event.target.value);
            let t = [...temp.splice(index,1)];
            setTemp(t);
            console.log(temp);
        }
        let t: any[] = [...temp, event.target.value];
        setTemp(t);
        // let title_ = '';
        // for (let z = 0; z<temp.length; z++){
        //     title_ = title_ + temp[z] + ' ';
        // }
        // setTitle(title_);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    // const Show = ({select} :Props) => {
    //
    //     switch (select) {
    //         case ["oilTemp"]:
    //             return <div>oiltemp</div>;
    //         default:
    //             return <div>
    //                 <h1>Please Select A Metric Above</h1>
    //             </div>;
    //     }
    // };


    return (
      <div>
          <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">Select Metric</InputLabel>
              <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={temp}
                  onChange={handleChange}
              >
                  <MenuItem value="">
                      <em>None</em>
                  </MenuItem>
                  <MenuItem value={'OilTemp'}>OilTemp</MenuItem>
                  <MenuItem value={'WaterTemp'}>WaterTemp</MenuItem>
                  <MenuItem value={'CasingPressure'}>CasingPressure</MenuItem>
              </Select>
          </FormControl>
          <div>
              {/*<Show select = {temp} />*/}
              <Metric_ select = {temp}/>
          </div>
      </div>
  );
};
