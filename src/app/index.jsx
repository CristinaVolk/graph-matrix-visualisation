import "keylines";
import React, { useState, useEffect, useCallback } from "react";
import { Chart } from "./react-keylines";
import { Grid, FormGroup } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

import { useComponent } from "./hook";
import { useFilterLinks } from "./useFilterLinks";
import { ChangeLayout } from "../components/ChangeLayout";
import { CustomCheckbox } from "../components/CustomCheckbox";
import { CustomSwitch } from "../components/CustomSwitch";
import { InformationBox } from "../components/InformationBox";
import { debounce } from "../utils/tools";

const App = () => {
  const { chart, loadedChart } = useComponent();

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

  const validateLayoutName = (layoutName) => {
    const allowedLayouts = [
      "organic",
      "lens",
      "sequential",
      "tweak",
      "radial",
      "structural",
    ];
    return allowedLayouts.find((item) => item === layoutName);
  };

  const doLayout = useCallback(
    (layoutName) => {
      return chart
        .layout(validateLayoutName(layoutName) ? layoutName : "organic", {
          consistent: true,
          packing: "adaptive",
          animate: true,
          time: 1000,
          tidy: true,
          spacing: "stretched",
          tightness: 1,
        })
        .then(() => {});
    },
    [chart],
  );

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
    title: "Show characters with MAX Frequency",
    boxName: "max",
    checked: checkMaxMinFrequency.max,
    handleChange: onChangeMaxFrequency,
    color: "primary",
  };

  const minFrequentSwitch = {
    title: "Show characters with MIN Frequency",
    boxName: "min",
    checked: checkMaxMinFrequency.min,
    handleChange: onChangeMinFrequency,
    color: "secondary",
  };

  useEffect(() => {
    if (chart !== null) {
      chart.filter((item) => item.d.checked === true, { type: "link" });
      doLayout("organic");
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
    maxFrequentSwitch.checked,
    minFrequentSwitch.checked,
    doLayout,
  ]);

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const clickNodeHandler = useCallback(
    ({ id }) => {
      if (chart.getItem(id)) {
        setSelectedItem(chart.getItem(id));
        handleClickOpen();
      }
    },
    [chart],
  );

  const handleClose = (value) => {
    setOpen(false);
    setSelectedItem(value);
  };

  return (
    !loading && (
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        wrap='wrap'
      >
        <Chart
          data={!loading && chartContent}
          ready={loadedChart}
          containerClassName={classes.root}
          click={clickNodeHandler}
        />

        <div>
          <InformationBox
            selectedItem={selectedItem}
            open={open}
            onClose={handleClose}
          />
        </div>

        <div className={classes.checkboxContainer}>
          <ChangeLayout changeLayout={doLayout} />

          <FormGroup component='fieldset' className={classes.formGroup}>
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
    width: "60vw",
  },
  checkboxContainer: {
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
    marginBottom: theme.spacing(6),
  },
  formGroup: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    marginLeft: theme.spacing(10),
  },
}));

export default App;
