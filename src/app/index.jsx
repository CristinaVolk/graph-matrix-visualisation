import "keylines";
import React, { useEffect } from "react";
import { Chart } from "./react-keylines";
import { Grid } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

import { Loading } from "../components/Loading";
import { useComponent } from "./hook";
import { useFilterLinks } from "./useFilterLinks";
import { ChangeLayout } from "../components/ChangeLayout";
import { InformationBox } from "../components/InformationBox";
import { ArrangeNodesLayout } from "../components/ArrangeNodesLayout";
import { InformationSnack } from "../components/InfoSnack";
import { chartOptions } from "../utils/appData";
import { FrequencyComponentList } from "../components/FrequencyComponentList";

const App = () => {
  const {
    chartRef,
    open,
    selectedItem,
    doLayout,
    loadedChart,
    clickNodeHandler,
    handleClose,
    arrangeNodesFromGroup,
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

  useEffect(() => {
    if (chartRef.current && chartRef.current.component) {
      chartRef.current.component.filter((item) => item.d.checked === true, {
        type: "link",
      });
    }
  }, [chartRef, chartContent, doLayout]);

  chartRef.current?.component &&
    chartRef.current.component.on("progress", ({ progress }) => {
      progress < 1 || maxFrequentSwitch.checked || minFrequentSwitch.checked
        ? setDisabledCheckbox(true)
        : setDisabledCheckbox(false);
    });

  return loading ? (
    <Loading />
  ) : (
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

      <Grid container alignItems='center' className={classes.toolBarContainer}>
        <ChangeLayout changeLayout={doLayout} />

        <FrequencyComponentList
          checkboxList={frequencyCheckboxList}
          switcherList={extremeSwitcherList}
        />

        <ArrangeNodesLayout arrangeNodesFromGroup={arrangeNodesFromGroup} />

        <InformationSnack />
      </Grid>
    </Grid>
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
      height: "fit-content",
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
