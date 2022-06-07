const treeGraph = () =>
  cytoscape({
    container: document.getElementById('tree'),
    style: [
      {
        selector: 'node',
        style: {
          width: 60,
          height: 60,
          opacity: 0,
          'background-color': '#ffab33',
          'font-size': 24,
          'text-valign': 'center',
          'text-halign': 'center',
          label: 'data(label)',
        },
      },
      {
        selector: 'edge',
        style: {
          width: 3,
          opacity: 0,
          'line-color': '#fff',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'none',
          'curve-style': 'bezier',
        },
      },
    ],
    layout: {
      name: 'breadthfirst',
    },
    autoungrabify: true,
    userPanningEnabled: false,
    userZoomingEnabled: false,
  });

const stackGraph = () =>
  cytoscape({
    container: document.getElementById('stack'),
    style: [
      {
        selector: 'node',
        style: {
          width: 0,
          height: 0,
          backgroundColor: '#2CB0D0',
          'font-size': 18,
          'text-valign': 'center',
          'text-halign': 'center',
          'font-weight': 700,
          shape: 'round-rectangle',
          label: 'data(label)',
        },
      },
      {
        selector: 'edge',
        style: {
          width: 3,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier',
        },
      },
    ],
    layout: {
      name: 'breadthfirst',
    },
    autoungrabify: true,
  });

// const = { treeGraph, stackGraph };
