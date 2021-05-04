import "keylines";
import React, { useEffect, useCallback } from "react";
import { Chart } from "./react-keylines";
import { Grid, FormGroup, Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

import { useComponent } from "./hook";
import { useFilterLinks } from "./useFilterLinks";
import { ChangeLayout } from "../components/ChangeLayout";
import { CustomCheckbox } from "../components/CustomCheckbox";
import { CustomSwitch } from "../components/CustomSwitch";
import { InformationBox } from "../components/InformationBox";
import { ArrangeNodesLayout } from "../components/ArrangeNodesLayout";
import { InformationSnack } from "../components/InfoSnack/InforSnack";
import { /*debounce,*/ validateLayoutName } from "../utils/tools";
import { chartOptions, zoomOptions, arrangeOptions } from "../utils/appData";

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
    lowFrequentCheckBox,
    middleFrequentCheckBox,
    highFrequentCheckBox,
    maxFrequentSwitch,
    minFrequentSwitch,
    setDisabledCheckbox,
  } = useFilterLinks();

  const classes = useStyles();

  const doLayout = useCallback(
    async (layoutName) => {
      await chart.layout(
        validateLayoutName(layoutName) ? layoutName : "organic",
        {
          consistent: true,
          packing: "adaptive",
          animate: true,
          time: 1000,
          tidy: true,
          spacing: "stretched",
          tightness: 1,
        },
      );
      await chart.zoom("fit", zoomOptions);
    },
    [chart],
  );

  useEffect(() => {
    if (chart !== null) {
      chart.filter((item) => item.d.checked === true, { type: "link" });
      doLayout("organic");
    }
  }, [chart, chartContent, doLayout]);

  chart &&
    chart.on("progress", ({ progress }) => {
      progress < 1 || maxFrequentSwitch.checked || minFrequentSwitch.checked
        ? setDisabledCheckbox(true)
        : setDisabledCheckbox(false);
    });

  // exctract to the hook
  const nodeIdsToGroup = (groupNo) => {
    return chartContent.items
      .filter(
        (item) => item.type === "node" && item.d.group === Number(groupNo),
      )
      .map((node) => node.id);
  };

  const arrangeNodesFromGroup = (groupNumber) => {
    chart &&
      chart.arrange(
        "circle",
        nodeIdsToGroup(groupNumber),
        arrangeOptions,
        chart.zoom("fit", zoomOptions),
      );
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
          // selection={chartContent.items.map((item) =>
          //   item.type === "node" ? item.id : null,
          // )}
        />
        <Grid item>
          <InformationBox
            selectedItem={selectedItem}
            open={open}
            onClose={handleClose}
          />
        </Grid>
        <Grid container className={classes.toolBarContainer}>
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
              <CustomSwitch toogler={maxFrequentSwitch && maxFrequentSwitch} />
              <CustomSwitch toogler={minFrequentSwitch && minFrequentSwitch} />
            </Grid>
          </FormGroup>

          <ArrangeNodesLayout arrangeNodesFromGroup={arrangeNodesFromGroup} />
          <InformationSnack />
        </Grid>
      </Grid>
    )
  );
};

//update all the colours in the palette

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    background: "#000000e3",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "center",

    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  chartRoot: {
    height: "92vh",
    width: "65vw",
    margin: `${theme.spacing(4)}px 0`,
  },
  toolBarContainer: {
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
    width: "30vw",
    height: "92vh",
    background: "rgb(0 0 0 / 40%)",
    "& > h6": {
      width: "90%",
    },
    [theme.breakpoints.down("md")]: {
      flexDirection: "row",
      width: "65vw",
      marginBottom: theme.spacing(4),
    },
  },
  formGroupFrequrncy: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    marginLeft: theme.spacing(8),
    color: "rosybrown",
    marginBottom: "2vw",
  },
  checkboxLabel: {
    fontSize: "1.1rem",
  },
  switchGrid: {
    marginTop: theme.spacing(3),
  },
}));

export default App;
