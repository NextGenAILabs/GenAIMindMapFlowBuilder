import Plot from 'react-plotly.js';

const Graph = ({ data }) => {
    const graph = data;
    const jsonGraph = JSON.parse(graph);
    console.log('This is a json', jsonGraph);
    return (
        <>
            <Plot
                data={jsonGraph.data}
                layout={jsonGraph.layout}
            />
        </>
    );
};

export default Graph;
