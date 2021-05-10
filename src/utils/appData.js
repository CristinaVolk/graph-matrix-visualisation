export const URL = "https://bost.ocks.org/mike/miserables/miserables.json";

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
  backColour: "#0c2531",
  selectionColour: "#040d11",
};

export const zoomOptions = {
  animate: true,
  time: 700,
};

export const arrangeOptions = {
  fit: true,
  animate: true,
  time: 1000,
  tightness: 4,
  position: "average",
};

export const snackContent = {
  message:
    "The graph represents the character co-occurrences in Victor Hugo’s Les Misérables. Each colloured node represents two names of the characters who appeared in the same chapter.       The width of the links indicate the frequency of the characters. The colour of the nodes define the chapter of the book. Analysing the network using the switchers to show the maximum co-occurrence allows the users to conclude who is the main character of the book. Filtering by freqency checkboxes let the users realize who are less/more important figures in the novel. Surreally to understand how the life penetrates new links in the huge mankind network developing the application sitting in the cafe named Victor Hugo.",
};
