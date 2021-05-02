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

    // chart &&
    //   chart.on("progress", ({ task, progress }) => {
    //     console.log(progress);
    //     if (task === "layout") {
    //       if (progress < 1) {
    //         setDisabledCheckbox(true);
    //       } else {
    //         setDisabledCheckbox(false);
    //       }
    //     }
    //   });

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

        <div className={classes.checkboxContainer}>
          <ChangeLayout changeLayout={doLayout} />

          <FormGroup
            component='fieldset'
            className={classes.formGroupFrequrncy}
          >
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
  mainGrid: {
    background: "#000000e3",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  chartRoot: {
    height: "100vh",
    width: "65vw",
    margin: `${theme.spacing(4)}px 0`,
    "& > canvas": {
      background: "black",
    },
  },
  checkboxContainer: {
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
    paddingBottom: theme.spacing(9),
    width: "30vw",
    background: "rgb(0 0 0 / 40%)",
  },
  formGroupFrequrncy: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    marginLeft: theme.spacing(10),
    color: "rosybrown",
  },
}));

export default App;
