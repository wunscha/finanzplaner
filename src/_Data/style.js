import { reactive } from "vue"

export default reactive({
  colors: {
    // Allgemein
    primary: '#461220',
    primaryText: 'white',
    secondary: '#FED0BB',
    secondaryText: 'black',
    // Items
    primaryItem: '#461220',
    primaryTextItem: 'white',
    secondaryItem: '#FED0BB',
    secondaryTextItem: 'black',
    // Sonstige
    accent: '#9c27b0',
    accentText: 'white',
    positive: '#21ba45',
    positiveText: 'white',
    negative: '#c10015',
    negativeText: 'white',
  },
  fontSizes: {
    titelSeite: 3,
    titelElement: 2,
    ueberschrift: 1.5,
    text: 1
  },
  widths: {
    item: 80,
    itemMax: 500,
    // dialog: 80,
    // dialogMax: 500,
    diagramm: 100,
    diagrammMax: 100,
  }
});

