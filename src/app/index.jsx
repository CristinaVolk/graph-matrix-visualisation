import "keylines";
import React, { useState, useEffect, useCallback } from "react";
import { Chart } from "../react-keylines";
import { Grid, FormGroup } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

import { useComponent } from "./hook";
import { useFilterLinks } from "./useFilterLinks";
import { CustomCheckbox } from "../checkbox";
import { CustomSwitch } from "../switch";
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

  const [disabledCheckbox, setDisabledCheckbox] = useState(false);

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

  const lowFrequentCheckBox = {
    title: "Low: less than 5",
    boxName: "low",
    checked: checkboxState.low,
    handleChange: checkFrequency,
    disabled: disabledCheckbox,
  };

  const middleFrequentCheckBox = {
    title: "Middle: between 5 & 9",
    boxName: "middle",
    checked: checkboxState.middle,
    handleChange: checkFrequency,
    disabled: disabledCheckbox,
  };

  const highFrequentCheckBox = {
    title: "High: more than 9",
    boxName: "high",
    checked: checkboxState.high,
    handleChange: checkFrequency,
    disabled: disabledCheckbox,
  };

  const maxFrequentSwitch = {
    title: "Show nodes with maX Frequency",
    boxName: "max",
    checked: checkMaxMinFrequency.max,
    handleChange: onChangeMaxFrequency,
  };

  const minFrequentSwitch = {
    title: "Show nodes with miN Frequency",
    boxName: "min",
    checked: checkMaxMinFrequency.min,
    handleChange: onChangeMinFrequency,
  };

  useEffect(() => {
    if (chart !== null) {
      chart.filter((item) => item.d.checked === true, { type: "link" });
      doLayout();
    }

    if (maxFrequentSwitch.checked || minFrequentSwitch.checked) {
      setDisabledCheckbox(true);
    }

    return () => {
      debounce(setDisabledCheckbox(false));
    };
  }, [
    chart,
    chartContent,
    doLayout,
    maxFrequentSwitch.checked,
    minFrequentSwitch.checked,
  ]);

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
          <FormGroup component='fieldset'>
            <CustomCheckbox checkbox={lowFrequentCheckBox} />

            <CustomCheckbox checkbox={middleFrequentCheckBox} />

            <CustomCheckbox checkbox={highFrequentCheckBox} />

            <CustomSwitch toogler={maxFrequentSwitch} />

            <CustomSwitch toogler={minFrequentSwitch} />
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
