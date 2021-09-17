 # General

The graph represents the character co-occurrences in Victor Hugo’s Les Misérables. Each coloured node represents two characters that appeared in the same chapter; The width of the links indicates the frequency of the characters. The colour of the nodes defines the chapter of the book.

### Filter:

1. Filtering by low frequency gives the results of the characters appearing less than 5 times (not included)
2. Filtering by middle frequency gives the results of the characters appearing more than 5 (included) and less than 9 (not included)
3. Filtering by high frequency gives the results of the characters appearing less more than 9 times (included).

### Show Max and Min values:

1. Toggling the Max switcher presents the results in red circles. Important to notice that it circles all the nodes that has at least one link of the highest value in the set selected of low/middle/high frequency.

2. Toggling the Min switcher presents the results in light-blue circles. Important to notice that it circles all the nodes that has at least one link of the smallest value in the set selected of low/middle/high frequency.

### Arranging nodes:

The function applies to the chapters that have more than 2 nodes, based on this assumption, the chapters № 6 and 9 have not been included in the toolbar.

Analysing the network using the switchers to show the maximum co-occurrence allows the users to conclude who is the main character of the book. Filtering by frequency checkboxes let the users realize who are less/more important figures in the novel. Surreally to understand now developing the application sitting in the cafe named Victor Hugo.

## Tecnhology:

CssBaseline component fixes some inconsistencies across browsers and devices while providing slightly more opinionated resets to common HTML elements.

Material-UI is developed mobile-first, the responsive viewport meta tag ensures proper rendering and touch zooming for all devices using CSS media queries.
