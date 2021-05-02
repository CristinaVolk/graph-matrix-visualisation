import "keylines";
import React, { useState, useEffect, useCallback } from "react";
import { Chart } from "./react-keylines";
import { Grid, FormGroup, Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

import { useComponent } from "./hook";
import { useFilterLinks } from "./useFilterLinks";
import { ChangeLayout } from "../components/ChangeLayout";
import { CustomCheckbox } from "../components/CustomCheckbox";
import { CustomSwitch } from "../components/CustomSwitch";
import { InformationBox } from "../components/InformationBox";
import { debounce, validateLayoutName } from "../utils/tools";

const App = () => {
  const {
    chart,
    open,
    selectedItem,
    loadedChart,
    clickNodeHandler,
    handleClose,
  } = useComponent();

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

      // chart.on("progress", ({ task, progress }) => {
      //     console.log(progress);
      //     if (task === "layout") {
      //       if (progress < 1) {
      //         setDisabledCheckbox(true);
      //       } else {
      //         setDisabledCheckbox(false);
      //       }
      //     }
      //   });
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

  const chartOptions = {
    drag: {
      links: true,
    },
    handMode: true,
    minZoom: 0.01,
    selectionColour: "orange",
    linkEnds: { avoidLabels: false },
    backColour: "#2d383f",
    watermark: {
      a: "top",
      fb: false,
      fs: 48,
      fc: "white",
    },
  };

  return (
    !loading && (
      <Grid container className={classes.mainGrid}>
        <Chart
          options={chartOptions}
          data={!loading && chartContent}
          ready={loadedChart}
          containerClassName={classes.chartRoot}
          click={clickNodeHandler}
        />

        <div>
          <InformationBox
            selectedItem={selectedItem}
            open={open}
            onClose={handleClose}
          />
        </div>

        <Grid container className={classes.checkboxContainer}>
          <ChangeLayout changeLayout={doLayout} />

          <Typography
            className={classes.checkboxLabel}
            gutterBottom
            color='secondary'
            variant='subtitle1'
            align='center'
          >
            Filter chapter characters data by frequency
          </Typography>
          <FormGroup
            component='fieldset'
            className={classes.formGroupFrequrncy}
          >
            <CustomCheckbox checkbox={lowFrequentCheckBox} />
            <CustomCheckbox checkbox={middleFrequentCheckBox} />
            <CustomCheckbox checkbox={highFrequentCheckBox} />
            <Grid container className={classes.switchGrid}>
              <CustomSwitch toogler={maxFrequentSwitch} />
              <CustomSwitch toogler={minFrequentSwitch} />
            </Grid>
          </FormGroup>
        </Grid>
      </Grid>
    )
  );
};

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    background: "#000000e3",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  chartRoot: {
    height: "92vh",
    width: "65vw",
    margin: `${theme.spacing(4)}px 0`,
  },
  checkboxContainer: {
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
    width: "30vw",
    height: "92vh",
    background: "rgb(0 0 0 / 40%)",
    "& > h6": {
      width: "90%",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      width: "85vw",
      marginBottom: theme.spacing(4),
    },
  },
  formGroupFrequrncy: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    marginLeft: theme.spacing(8),
    color: "rosybrown",
  },
  checkboxLabel: {
    fontSize: "1.1rem",
  },
  switchGrid: {
    marginTop: theme.spacing(3),
  },
}));

export default App;
