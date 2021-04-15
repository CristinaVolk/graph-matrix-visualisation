import "keylines";
import React, { useEffect, useCallback } from "react";
import { Chart } from "../react-keylines";
import { Grid, Switch, FormGroup, FormControlLabel } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

import { useComponent } from "./hook";
import { useFilterLinks } from "./useFilterLinks";
import { Checkbox } from "../checkbox";
import { debounce } from "../utils/tools";

const App = () => {
  const { chart, loadedChart, clickNodeHandler } = useComponent();

  const {
    loading,
    chartContent,
    checkboxState,
    checkMaxMinFrequency,
    checkFrequency,
    onChangeMaxFrequency,
    onChangeMinFrequency,
  } = useFilterLinks();

  const classes = useStyles();

  const doLayout = useCallback(() => {
    return chart
      .layout("organic", {
        consistent: true,
        packing: "adaptive",
        animate: true,
        time: 900,
        tidy: true,
        spacing: "stretched",
        tightness: 2,
      })
      .then(() => {});
  }, [chart]);

  useEffect(() => {
    if (chart !== null) {
      chart.filter((item) => item.d.checked === true, { type: "link" });
      doLayout();
    }

    return () => {
      debounce(console.log("end"));
    };
  }, [chart, chartContent, doLayout]);

  const lowFrequentCheckBox = {
    title: "Low: less than 5",
    boxName: "low",
    checked: checkboxState.low,
    handleChange: checkFrequency,
  };

  const middleFrequentCheckBox = {
    title: "Middle: between 5 & 9",
    boxName: "middle",
    checked: checkboxState.middle,
    handleChange: checkFrequency,
  };

  const highFrequentCheckBox = {
    title: "High: more than 9",
    boxName: "high",
    checked: checkboxState.high,
    handleChange: checkFrequency,
  };

  const maxFrequentCheckBox = {
    title: "Show nodes with maX Frequency",
    boxName: "max",
    checked: checkMaxMinFrequency.max,
    handleChange: onChangeMaxFrequency,
  };

  const minFrequentCheckBox = {
    title: "Show nodes with miN Frequency",
    boxName: "min",
    checked: checkMaxMinFrequency.min,
    handleChange: onChangeMinFrequency,
  };

  return (
    !loading && (
      <Grid container direction='row' justify='center' alignItems='center'>
        <Chart
          data={!loading && chartContent}
          ready={loadedChart}
          containerClassName={classes.root}
          click={clickNodeHandler}
        />
        <div className={classes.checkboxContainer}>
          <Checkbox checkbox={lowFrequentCheckBox} />
          <Checkbox checkbox={middleFrequentCheckBox} />
          <Checkbox checkbox={highFrequentCheckBox} />

          <FormGroup>
            <FormControlLabel
              label={maxFrequentCheckBox.title}
              labelPlacement='start'
              control={
                <Switch
                  checked={maxFrequentCheckBox.checked}
                  onChange={maxFrequentCheckBox.handleChange}
                  name={maxFrequentCheckBox.boxName}
                  inputProps={{ "aria-label": "secondary checkbox" }}
                  color={"secondary"}
                />
              }
            />
            <FormControlLabel
              labelPlacement='start'
              label={minFrequentCheckBox.title}
              control={
                <Switch
                  checked={minFrequentCheckBox.checked}
                  onChange={minFrequentCheckBox.handleChange}
                  name={minFrequentCheckBox.boxName}
                  inputProps={{ "aria-label": "primary checkbox" }}
                  color={"primary"}
                />
              }
            />
          </FormGroup>
        </div>
      </Grid>
    )
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "70vw",
  },
  checkboxContainer: {
    display: "flex",
    flexFlow: "column wrap",
  },
}));

export default App;
