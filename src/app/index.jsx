import "keylines";
import React, { useEffect, useCallback } from "react";
import { Chart } from "./react-keylines";
import { Grid } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

import { useComponent } from "./hook";
import { useFilterLinks } from "./useFilterLinks";
import { ChangeLayout } from "../components/ChangeLayout";
import { InformationBox } from "../components/InformationBox";
import { ArrangeNodesLayout } from "../components/ArrangeNodesLayout";
import { InformationSnack } from "../components/InfoSnack";
import { /*debounce,*/ validateLayoutName } from "../utils/tools";
import { chartOptions, zoomOptions, arrangeOptions } from "../utils/appData";
import { FrequencyComponentList } from "../components/FrequencyComponentList";

const App = () => {
  const {
    chartRef,
    open,
    selectedItem,
    clickNodeHandler,
    handleClose,
    nodeIdsToArrange,
  } = useComponent();

  const {
    loading,
    chartContent,
    frequencyCheckboxList,
    extremeSwitcherList,
    setDisabledCheckbox,
  } = useFilterLinks();

  const { maxFrequentSwitch, minFrequentSwitch } = extremeSwitcherList;

  const classes = useStyles();

  const doLayout = useCallback(
    async (layoutName) => {
      await chartRef.current.component.layout(
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
      await chartRef.current.component.zoom("fit", zoomOptions);
    },
    [chartRef],
  );

  useEffect(() => {
    if (chartRef.current.component) {
      chartRef.current.component.filter((item) => item.d.checked === true, {
        type: "link",
      });
    }
  }, [chartRef, chartContent, doLayout]);

  chartRef.current &&
    chartRef.current.component &&
    chartRef.current.component.on("progress", ({ progress }) => {
      progress < 1 || maxFrequentSwitch.checked || minFrequentSwitch.checked
        ? setDisabledCheckbox(true)
        : setDisabledCheckbox(false);
    });

  const arrangeNodesFromGroup = (groupNumber) => {
    chartRef.current &&
      chartRef.current.component.arrange(
        "circle",
        nodeIdsToArrange(groupNumber),
        arrangeOptions,
        chartRef.current.component.zoom("fit", zoomOptions),
      );
  };

  const loadedChart = () => {
    chartRef.current && doLayout("organic");
  };

  return (
    !loading && (
      <Grid container className={classes.mainGrid}>
        <Chart
          animateOnLoad={true}
          ready={loadedChart}
          ref={chartRef}
          options={chartOptions}
          data={!loading && chartContent}
          containerClassName={classes.chartRoot}
          click={clickNodeHandler}
        />

        <InformationBox
          selectedItem={selectedItem}
          open={open}
          onClose={handleClose}
        />

        <Grid
          container
          alignItems='center'
          className={classes.toolBarContainer}
        >
          <ChangeLayout changeLayout={doLayout} />

          <FrequencyComponentList
            checkboxList={frequencyCheckboxList}
            switcherList={extremeSwitcherList}
          />

          <ArrangeNodesLayout arrangeNodesFromGroup={arrangeNodesFromGroup} />

          <InformationSnack />
        </Grid>
      </Grid>
    )
  );
};

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    background: theme.palette.background.default,
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

    [theme.breakpoints.down("sm")]: {
      width: "85vw",
    },
  },
  toolBarContainer: {
    flexFlow: "column wrap",
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
      justifyContent: "center",
      height: "100vh",
    },

    [theme.breakpoints.down("sm")]: {
      width: "85vw",
    },
  },
  formGroupFrequrncy: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    marginLeft: theme.spacing(8),
    color: theme.palette.primary.contrastText,
    marginBottom: "2vw",
  },

  switchGrid: {
    marginTop: theme.spacing(3),
  },
}));

export default App;
