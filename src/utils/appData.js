export const data = {
  type: "LinkChart",
  items: [],
};

export const layouts = ["organic", "lens", "sequential", "tweak", "structural"];

export const chartOptions = {
  drag: {
    links: true,
  },
  handMode: true,
  minZoom: 0.01,
  linkEnds: { avoidLabels: false },
  backColour: "#2d383f",
  selectionColour: "#010e16",
};

export const zoomOptions = {
  animate: true,
  time: 300,
};
