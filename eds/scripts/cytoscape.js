// Access a CSS variable
const getCSSVariable = (variableName) => getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();

// Function to map types to colors using CSS variables
const getColourForType = (type) => getCSSVariable(`--${type}`);

// Backend API to development server
// const url = 'http://172.24.30.169:5559/get_subgraph';
// Backend API to deployment server
const url = 'http://172.24.63.87:5559/get_subgraph';

// Sample query
// NB the backend expects to receive a dictionary with a single value, key being 'data_dict'
const requestData = {
  data_dict: {
    Gene: ['CXCR6'],
    Disease: [],
    Tissue: [],
    Product: [],
    string_choice: 'Combined_Score',
    path_min: 0.1,
    path_max: 1,
    target_target_total: 5,
    opentargets_choice: 'Overall_Score',
    disease_min: 0.1,
    disease_max: 1,
    disease_parents: 1,
    target_disease_total: 5,
    disease_target_total: 5,
    tissue_min: 10,
    tissue_max: null, // JavaScript's `null` corresponds to Python's `None`
    tissue_target_total: 5,
    target_tissue_total: 5,
    target_product_total: 5,
    product_product_total: 5,
    Applications: [],
    Reactivity: [],
    Publication_Status: ['Published'],
    'Product Link Type': ['Relatedness'],
    'Product Relation Type': [],
    'Is_In-House': [],
    Tier_1: [],
    options: [],
  },
};

// Get subgraph by sending query to backend
async function getSubgraph() {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData),
  });
  return await response.json();
}

// Call async function and ensure completion
let testDataFromAPI;
function fetchData(callback) {
  getSubgraph()
    .then((data) => {
      testDataFromAPI = data;
      console.log('Test Data from API:', testDataFromAPI);
      callback(); // Notify that the data is ready
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

fetchData(() => {
  // This runs after testDataFromAPI is set
  populateCytoscape(testDataFromAPI);
});

// Populates the cytoscape container
function populateCytoscape(inputData) {
  // Reformat edges
  const edges = inputData
    .filter((edge) => edge.data && edge.data.source)
    .map((edge) => ({
      ...edge.data, // Spread the properties from edge.data directly into the new object
    }));

  // Reformat nodes
  const nodes = inputData
    .filter((node) => node.data && node.data.name)
    .map((node) => ({
      id: node.data.id,
      name: node.data.name,
      label: node.data.label,
      x: node.position.x,
      y: node.position.y,
      selected: node.classes && node.classes.includes('selected'),
    }));

  console.log(edges);

  // Set up the SVG container
  const width = document.getElementById('cytoscape-container').offsetWidth;
  const height = document.getElementById('cytoscape-container').offsetHeight;
  const svg = d3.select('#cytoscape-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background-color', 'black');

  // Rescale the nodes
  const minX = d3.min(nodes, (d) => d.x);
  const maxX = d3.max(nodes, (d) => d.x);
  const minY = d3.min(nodes, (d) => d.y);
  const maxY = d3.max(nodes, (d) => d.y);
  const scaleX = d3.scaleLinear().domain([minX, maxX]).range([0.1 * width, 0.9 * width]);
  const scaleY = d3.scaleLinear().domain([minY, maxY]).range([0.1 * height, 0.9 * height]);
  nodes.forEach((d) => {
    d.x = scaleX(d.x);
    d.y = scaleY(d.y);
  });

  // Add links (edges) to the graph
  const link = svg.append('g')
    .selectAll('.link')
    .data(edges)
    .enter()
    .append('line')
    .attr('class', 'link')
    .attr('stroke', (d) => getColourForType(d.label))
    .attr('stroke-width', (d) => 2 * d.weight || 2);

  // Add nodes (elements)
  const node = svg.append('g')
    .selectAll('.node')
    .data(nodes)
    .enter()
    .append('circle')
    .attr('class', 'node')
    .attr('r', (d) => (d.selected ? 30 : 20))
    .attr('fill', (d) => getColourForType(d.label))
    .attr('cx', (d) => d.x) // Use initial x position
    .attr('cy', (d) => d.y) // Use initial y position
    .call(d3.drag()
      .on('start', dragStart)
      .on('drag', dragging)
      .on('end', dragEnd));

  // Add node labels underneath the nodes
  svg.append('g')
    .selectAll('.node-label')
    .data(nodes)
    .enter()
    .append('text')
    .attr('class', 'node-label')
    .attr('x', (d) => d.x) // Position the text at the x of the node
    .attr('y', (d) => (d.selected ? d.y + 50 : d.y + 40)) // Position the text below the node
    .attr('text-anchor', 'middle') // Align text horizontally to the center of the node
    .attr('fill', 'white') // Set the text color
    .attr('font-size', '20px') // Set font size
    .text((d) => d.name); // Set the text to the node's name

  // Initial tick function call to position links and nodes
  ticked();

  // Update the graph on drag
  function ticked() {
    link
      .attr('x1', (d) => {
        const sourceNode = nodes.find((node) => node.id === d.source);
        return sourceNode.x;
      })
      .attr('y1', (d) => {
        const sourceNode = nodes.find((node) => node.id === d.source);
        return sourceNode.y;
      })
      .attr('x2', (d) => {
        const targetNode = nodes.find((node) => node.id === d.target);
        return targetNode.x;
      })
      .attr('y2', (d) => {
        const targetNode = nodes.find((node) => node.id === d.target);
        return targetNode.y;
      });

    node
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y);

    // Update the text position as well
    svg.selectAll('.node-label')
      .attr('x', (d) => d.x)
      .attr('y', (d) => (d.selected ? d.y + 50 : d.y + 40)); // Position the text below the node
  }

  // Dragging functions
  function dragStart(event, d) {
    d3.select(this).classed('dragging', true);
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragging(event, d) {
    d.fx = event.x;
    d.fy = event.y;
    d.x = event.x;
    d.y = event.y;
    ticked();
  }

  function dragEnd(event, d) {
    d3.select(this).classed('dragging', false);
    d.fx = null;
    d.fy = null;
  }
}
