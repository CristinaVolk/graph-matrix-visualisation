import "keylines";
import React, { useState, useEffect, useCallback } from "react";
import { Chart } from "./react-keylines";
import { Grid, FormGroup, Button } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

import { useComponent } from "./hook";
import { useFilterLinks } from "./useFilterLinks";
import { ChangeLayout } from "../components/ChangeLayout";
import { CustomCheckbox } from "../components/CustomCheckbox";
import { CustomSwitch } from "../components/CustomSwitch";
import { SimpleDialog } from "../components/Dialog";

import { debounce } from "../utils/tools";

const emails = ["username@gmail.com", "user02@gmail.com"];

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

  const doLayout = useCallback(
    (layoutName) => {
      return chart
        .layout(layoutName, {
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

  const clickNodeHandler = useCallback(
    ({ id }) => {
      if (chart.getItem(id)) {
        const clickedItem = chart.getItem(id);

        console.log(clickedItem);
        handleClickOpen();
        const neighbours = chart.graph().neighbours(id).nodes;
        chart.foreground(
          (node) => node.id === id || neighbours.includes(node.id),
        );

        chart.foreground(() => true);
      }
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
    doLayout,
    maxFrequentSwitch.checked,
    minFrequentSwitch.checked,
  ]);

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
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
          <Button variant='outlined' color='primary' onClick={handleClickOpen}>
            Open simple dialog
          </Button>
          <SimpleDialog
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
          />
        </div>

        <div className={classes.checkboxContainer}>
          <ChangeLayout changeLayout={doLayout} />

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
