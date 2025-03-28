import { applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import { create } from 'zustand';
import SQLSvg from "../assets/sql.svg";
import CSVSvg from "../assets/csv.svg";

// Sample
const data = {
    "_id": {
        "$oid": "678b7ee4fb684ab6cecabc50"
    },
    "question": "provide returns of microsoft corp",
    "query": "SELECT asset_return \nFROM tbl_asset_returns \nWHERE asset_name = 'Microsoft Corp';",
    "df": {
        "asset_return": {}
    },
    "summ": "The table \"tbl_asset_returns\" contains no data for the returns of Microsoft Corp, as the DataFrame is empty.",
    "graph": "{\"data\":[{\"mode\":\"lines+markers\",\"name\":\"Microsoft Corp Return\",\"x\":[],\"y\":[],\"type\":\"scatter\"}],\"layout\":{\"template\":{\"data\":{\"barpolar\":[{\"marker\":{\"line\":{\"color\":\"rgb(17,17,17)\",\"width\":0.5},\"pattern\":{\"fillmode\":\"overlay\",\"size\":10,\"solidity\":0.2}},\"type\":\"barpolar\"}],\"bar\":[{\"error_x\":{\"color\":\"#f2f5fa\"},\"error_y\":{\"color\":\"#f2f5fa\"},\"marker\":{\"line\":{\"color\":\"rgb(17,17,17)\",\"width\":0.5},\"pattern\":{\"fillmode\":\"overlay\",\"size\":10,\"solidity\":0.2}},\"type\":\"bar\"}],\"carpet\":[{\"aaxis\":{\"endlinecolor\":\"#A2B1C6\",\"gridcolor\":\"#506784\",\"linecolor\":\"#506784\",\"minorgridcolor\":\"#506784\",\"startlinecolor\":\"#A2B1C6\"},\"baxis\":{\"endlinecolor\":\"#A2B1C6\",\"gridcolor\":\"#506784\",\"linecolor\":\"#506784\",\"minorgridcolor\":\"#506784\",\"startlinecolor\":\"#A2B1C6\"},\"type\":\"carpet\"}],\"choropleth\":[{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"},\"type\":\"choropleth\"}],\"contourcarpet\":[{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"},\"type\":\"contourcarpet\"}],\"contour\":[{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"},\"colorscale\":[[0.0,\"#0d0887\"],[0.1111111111111111,\"#46039f\"],[0.2222222222222222,\"#7201a8\"],[0.3333333333333333,\"#9c179e\"],[0.4444444444444444,\"#bd3786\"],[0.5555555555555556,\"#d8576b\"],[0.6666666666666666,\"#ed7953\"],[0.7777777777777778,\"#fb9f3a\"],[0.8888888888888888,\"#fdca26\"],[1.0,\"#f0f921\"]],\"type\":\"contour\"}],\"heatmapgl\":[{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"},\"colorscale\":[[0.0,\"#0d0887\"],[0.1111111111111111,\"#46039f\"],[0.2222222222222222,\"#7201a8\"],[0.3333333333333333,\"#9c179e\"],[0.4444444444444444,\"#bd3786\"],[0.5555555555555556,\"#d8576b\"],[0.6666666666666666,\"#ed7953\"],[0.7777777777777778,\"#fb9f3a\"],[0.8888888888888888,\"#fdca26\"],[1.0,\"#f0f921\"]],\"type\":\"heatmapgl\"}],\"heatmap\":[{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"},\"colorscale\":[[0.0,\"#0d0887\"],[0.1111111111111111,\"#46039f\"],[0.2222222222222222,\"#7201a8\"],[0.3333333333333333,\"#9c179e\"],[0.4444444444444444,\"#bd3786\"],[0.5555555555555556,\"#d8576b\"],[0.6666666666666666,\"#ed7953\"],[0.7777777777777778,\"#fb9f3a\"],[0.8888888888888888,\"#fdca26\"],[1.0,\"#f0f921\"]],\"type\":\"heatmap\"}],\"histogram2dcontour\":[{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"},\"colorscale\":[[0.0,\"#0d0887\"],[0.1111111111111111,\"#46039f\"],[0.2222222222222222,\"#7201a8\"],[0.3333333333333333,\"#9c179e\"],[0.4444444444444444,\"#bd3786\"],[0.5555555555555556,\"#d8576b\"],[0.6666666666666666,\"#ed7953\"],[0.7777777777777778,\"#fb9f3a\"],[0.8888888888888888,\"#fdca26\"],[1.0,\"#f0f921\"]],\"type\":\"histogram2dcontour\"}],\"histogram2d\":[{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"},\"colorscale\":[[0.0,\"#0d0887\"],[0.1111111111111111,\"#46039f\"],[0.2222222222222222,\"#7201a8\"],[0.3333333333333333,\"#9c179e\"],[0.4444444444444444,\"#bd3786\"],[0.5555555555555556,\"#d8576b\"],[0.6666666666666666,\"#ed7953\"],[0.7777777777777778,\"#fb9f3a\"],[0.8888888888888888,\"#fdca26\"],[1.0,\"#f0f921\"]],\"type\":\"histogram2d\"}],\"histogram\":[{\"marker\":{\"pattern\":{\"fillmode\":\"overlay\",\"size\":10,\"solidity\":0.2}},\"type\":\"histogram\"}],\"mesh3d\":[{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"},\"type\":\"mesh3d\"}],\"parcoords\":[{\"line\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}},\"type\":\"parcoords\"}],\"pie\":[{\"automargin\":true,\"type\":\"pie\"}],\"scatter3d\":[{\"line\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}},\"marker\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}},\"type\":\"scatter3d\"}],\"scattercarpet\":[{\"marker\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}},\"type\":\"scattercarpet\"}],\"scattergeo\":[{\"marker\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}},\"type\":\"scattergeo\"}],\"scattergl\":[{\"marker\":{\"line\":{\"color\":\"#283442\"}},\"type\":\"scattergl\"}],\"scattermapbox\":[{\"marker\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}},\"type\":\"scattermapbox\"}],\"scatterpolargl\":[{\"marker\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}},\"type\":\"scatterpolargl\"}],\"scatterpolar\":[{\"marker\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}},\"type\":\"scatterpolar\"}],\"scatter\":[{\"marker\":{\"line\":{\"color\":\"#283442\"}},\"type\":\"scatter\"}],\"scatterternary\":[{\"marker\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}},\"type\":\"scatterternary\"}],\"surface\":[{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"},\"colorscale\":[[0.0,\"#0d0887\"],[0.1111111111111111,\"#46039f\"],[0.2222222222222222,\"#7201a8\"],[0.3333333333333333,\"#9c179e\"],[0.4444444444444444,\"#bd3786\"],[0.5555555555555556,\"#d8576b\"],[0.6666666666666666,\"#ed7953\"],[0.7777777777777778,\"#fb9f3a\"],[0.8888888888888888,\"#fdca26\"],[1.0,\"#f0f921\"]],\"type\":\"surface\"}],\"table\":[{\"cells\":{\"fill\":{\"color\":\"#506784\"},\"line\":{\"color\":\"rgb(17,17,17)\"}},\"header\":{\"fill\":{\"color\":\"#2a3f5f\"},\"line\":{\"color\":\"rgb(17,17,17)\"}},\"type\":\"table\"}]},\"layout\":{\"annotationdefaults\":{\"arrowcolor\":\"#f2f5fa\",\"arrowhead\":0,\"arrowwidth\":1},\"autotypenumbers\":\"strict\",\"coloraxis\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}},\"colorscale\":{\"diverging\":[[0,\"#8e0152\"],[0.1,\"#c51b7d\"],[0.2,\"#de77ae\"],[0.3,\"#f1b6da\"],[0.4,\"#fde0ef\"],[0.5,\"#f7f7f7\"],[0.6,\"#e6f5d0\"],[0.7,\"#b8e186\"],[0.8,\"#7fbc41\"],[0.9,\"#4d9221\"],[1,\"#276419\"]],\"sequential\":[[0.0,\"#0d0887\"],[0.1111111111111111,\"#46039f\"],[0.2222222222222222,\"#7201a8\"],[0.3333333333333333,\"#9c179e\"],[0.4444444444444444,\"#bd3786\"],[0.5555555555555556,\"#d8576b\"],[0.6666666666666666,\"#ed7953\"],[0.7777777777777778,\"#fb9f3a\"],[0.8888888888888888,\"#fdca26\"],[1.0,\"#f0f921\"]],\"sequentialminus\":[[0.0,\"#0d0887\"],[0.1111111111111111,\"#46039f\"],[0.2222222222222222,\"#7201a8\"],[0.3333333333333333,\"#9c179e\"],[0.4444444444444444,\"#bd3786\"],[0.5555555555555556,\"#d8576b\"],[0.6666666666666666,\"#ed7953\"],[0.7777777777777778,\"#fb9f3a\"],[0.8888888888888888,\"#fdca26\"],[1.0,\"#f0f921\"]]},\"colorway\":[\"#636efa\",\"#EF553B\",\"#00cc96\",\"#ab63fa\",\"#FFA15A\",\"#19d3f3\",\"#FF6692\",\"#B6E880\",\"#FF97FF\",\"#FECB52\"],\"font\":{\"color\":\"#f2f5fa\"},\"geo\":{\"bgcolor\":\"rgb(17,17,17)\",\"lakecolor\":\"rgb(17,17,17)\",\"landcolor\":\"rgb(17,17,17)\",\"showlakes\":true,\"showland\":true,\"subunitcolor\":\"#506784\"},\"hoverlabel\":{\"align\":\"left\"},\"hovermode\":\"closest\",\"mapbox\":{\"style\":\"dark\"},\"paper_bgcolor\":\"rgb(17,17,17)\",\"plot_bgcolor\":\"rgb(17,17,17)\",\"polar\":{\"angularaxis\":{\"gridcolor\":\"#506784\",\"linecolor\":\"#506784\",\"ticks\":\"\"},\"bgcolor\":\"rgb(17,17,17)\",\"radialaxis\":{\"gridcolor\":\"#506784\",\"linecolor\":\"#506784\",\"ticks\":\"\"}},\"scene\":{\"xaxis\":{\"backgroundcolor\":\"rgb(17,17,17)\",\"gridcolor\":\"#506784\",\"gridwidth\":2,\"linecolor\":\"#506784\",\"showbackground\":true,\"ticks\":\"\",\"zerolinecolor\":\"#C8D4E3\"},\"yaxis\":{\"backgroundcolor\":\"rgb(17,17,17)\",\"gridcolor\":\"#506784\",\"gridwidth\":2,\"linecolor\":\"#506784\",\"showbackground\":true,\"ticks\":\"\",\"zerolinecolor\":\"#C8D4E3\"},\"zaxis\":{\"backgroundcolor\":\"rgb(17,17,17)\",\"gridcolor\":\"#506784\",\"gridwidth\":2,\"linecolor\":\"#506784\",\"showbackground\":true,\"ticks\":\"\",\"zerolinecolor\":\"#C8D4E3\"}},\"shapedefaults\":{\"line\":{\"color\":\"#f2f5fa\"}},\"sliderdefaults\":{\"bgcolor\":\"#C8D4E3\",\"bordercolor\":\"rgb(17,17,17)\",\"borderwidth\":1,\"tickwidth\":0},\"ternary\":{\"aaxis\":{\"gridcolor\":\"#506784\",\"linecolor\":\"#506784\",\"ticks\":\"\"},\"baxis\":{\"gridcolor\":\"#506784\",\"linecolor\":\"#506784\",\"ticks\":\"\"},\"bgcolor\":\"rgb(17,17,17)\",\"caxis\":{\"gridcolor\":\"#506784\",\"linecolor\":\"#506784\",\"ticks\":\"\"}},\"title\":{\"x\":0.05},\"updatemenudefaults\":{\"bgcolor\":\"#506784\",\"borderwidth\":0},\"xaxis\":{\"automargin\":true,\"gridcolor\":\"#283442\",\"linecolor\":\"#506784\",\"ticks\":\"\",\"title\":{\"standoff\":15},\"zerolinecolor\":\"#283442\",\"zerolinewidth\":2},\"yaxis\":{\"automargin\":true,\"gridcolor\":\"#283442\",\"linecolor\":\"#506784\",\"ticks\":\"\",\"title\":{\"standoff\":15},\"zerolinecolor\":\"#283442\",\"zerolinewidth\":2}}},\"title\":{\"text\":\"Microsoft Corp Returns Over Time\"},\"xaxis\":{\"title\":{\"text\":\"Time\"}},\"yaxis\":{\"title\":{\"text\":\"Return\"}}}}",
    "flow_id": "6773dca11fedc7239c286b2b",
    "component_id": "678b7582ed04eaed3d861009",
    "type": "sql",
    "created_at": {
        "$date": {
            "$numberLong": "1737195236275"
        }
    }
};


const data2 = {
    "_id": {
        "$oid": "678b8ed7d8849f371a49f979"
    },
    "question": "provide returns of microsoft corp.",
    "query": "SELECT asset_return \nFROM tbl_asset_returns \nWHERE asset_name = 'Microsoft Corp.';",
    "df": [
        [
            { "asset_return": "0.0255" },
            { "asset_return": "-0.0163" },
            { "asset_return": "-0.0184" },
            { "asset_return": "-0.0003" },
            { "asset_return": "0.0176" },
            { "asset_return": "0.0253" },
            { "asset_return": "0.0182" },
            { "asset_return": "0.0287" },
            { "asset_return": "-0.0282" },
            { "asset_return": "-0.0019" },
            { "asset_return": "0.0152" },
            { "asset_return": "-0.02" },
            { "asset_return": "-0.006" },
            { "asset_return": "0.0058" },
            { "asset_return": "0.0189" },
            { "asset_return": "-0.0181" },
            { "asset_return": "-0.0164" },
            { "asset_return": "0.0055" },
            { "asset_return": "0.0012" },
            { "asset_return": "-0.0125" },
            { "asset_return": "0.0204" },
            { "asset_return": "0.0191" },
            { "asset_return": "-0.0289" },
            { "asset_return": "0.005" },
            { "asset_return": "-0.0087" },
            { "asset_return": "0.0293" },
            { "asset_return": "-0.0094" },
            { "asset_return": "0.0216" },
            { "asset_return": "0.0064" },
            { "asset_return": "-0.0209" },
            { "asset_return": "0.0056" },
            { "asset_return": "0.0035" },
            { "asset_return": "-0.022" },
            { "asset_return": "-0.0209" },
            { "asset_return": "-0.0128" },
            { "asset_return": "-0.0024" },
            { "asset_return": "0.002" },
            { "asset_return": "0.0209" },
            { "asset_return": "0.0265" },
            { "asset_return": "-0.0295" },
            { "asset_return": "0.0271" },
            { "asset_return": "0.014" },
            { "asset_return": "0.0219" },
            { "asset_return": "0.0276" },
            { "asset_return": "0.013" },
            { "asset_return": "0.0299" },
            { "asset_return": "-0.0015" },
            { "asset_return": "0.0251" },
            { "asset_return": "-0.0013" },
            { "asset_return": "0.0073" },
            { "asset_return": "0.0153" },
            { "asset_return": "0.0271" },
            { "asset_return": "0.0078" },
            { "asset_return": "-0.0151" },
            { "asset_return": "-0.0175" },
            { "asset_return": "-0.0239" },
            { "asset_return": "-0.0101" },
            { "asset_return": "-0.0067" },
            { "asset_return": "-0.0069" },
            { "asset_return": "0.0213" },
            { "asset_return": "0.0065" },
            { "asset_return": "-0.014" },
            { "asset_return": "-0.0269" },
            { "asset_return": "0.009" },
            { "asset_return": "-0.0115" },
            { "asset_return": "-0.0235" },
            { "asset_return": "0.0211" },
            { "asset_return": "0.0086" },
            { "asset_return": "-0.0185" },
            { "asset_return": "-0.0178" },
            { "asset_return": "-0.0148" },
            { "asset_return": "0.0252" },
            { "asset_return": "-0.0023" },
            { "asset_return": "-0.0269" },
            { "asset_return": "-0.0224" },
            { "asset_return": "-0.017" },
            { "asset_return": "-0.0275" },
            { "asset_return": "-0.0296" },
            { "asset_return": "0.0299" },
            { "asset_return": "0.0114" },
            { "asset_return": "-0.0003" },
            { "asset_return": "-0.003" },
            { "asset_return": "-0.0129" },
            { "asset_return": "-0.0262" },
            { "asset_return": "-0.028" },
            { "asset_return": "0.0168" },
            { "asset_return": "0.0086" },
            { "asset_return": "0.0067" },
            { "asset_return": "0.0193" },
            { "asset_return": "0.0031" },
            { "asset_return": "0.0054" },
            { "asset_return": "0.0208" },
            { "asset_return": "0.0249" },
            { "asset_return": "0.0134" },
            { "asset_return": "-0.0217" },
            { "asset_return": "0.0274" },
            { "asset_return": "-0.0142" },
            { "asset_return": "0.0069" },
            { "asset_return": "0.0162" },
            { "asset_return": "0.0169" }
        ]

    ],
    "summ": "The data provides the asset returns of Microsoft Corp. from the table \"tbl_asset_returns,\" with values ranging from -0.0296 to 0.0299.",
    "graph": "{\"data\":[{\"mode\":\"lines+markers\",\"name\":\"Microsoft Corp. Return\",\"y\":[0.0255,-0.0163,-0.0184,-0.0003,0.0176,0.0253,0.0182,0.0287,-0.0282,-0.0019,0.0152,-0.02,-0.006,0.0058,0.0189,-0.0181,-0.0164,0.0055,0.0012,-0.0125,0.0204,0.0191,-0.0289,0.005,-0.0087,0.0293,-0.0094,0.0216,0.0064,-0.0209,0.0056,0.0035,-0.022,-0.0209,-0.0128,-0.0024,0.002,0.0209,0.0265,-0.0295,0.0271,0.014,0.0219,0.0276,0.013,0.0299,-0.0015,0.0251,-0.0013,0.0073,0.0153,0.0271,0.0078,-0.0151,-0.0175,-0.0239,-0.0101,-0.0067,-0.0069,0.0213,0.0065,-0.014,-0.0269,0.009,-0.0115,-0.0235,0.0211,0.0086,-0.0185,-0.0178,-0.0148,0.0252,-0.0023,-0.0269,-0.0224,-0.017,-0.0275,-0.0296,0.0299,0.0114,-0.0003,-0.003,-0.0129,-0.0262,-0.028,0.0168,0.0086,0.0067,0.0193,0.0031,0.0054,0.0208,0.0249,0.0134,-0.0217,0.0274,-0.0142,0.0069,0.0162,0.0169],\"type\":\"scatter\"}],\"layout\":{\"template\":{\"data\":{\"barpolar\":[{\"marker\":{\"line\":{\"color\":\"rgb(17,17,17)\",\"width\":0.5},\"pattern\":{\"fillmode\":\"overlay\",\"size\":10,\"solidity\":0.2}},\"type\":\"barpolar\"}],\"bar\":[{\"error_x\":{\"color\":\"#f2f5fa\"},\"error_y\":{\"color\":\"#f2f5fa\"},\"marker\":{\"line\":{\"color\":\"rgb(17,17,17)\",\"width\":0.5},\"pattern\":{\"fillmode\":\"overlay\",\"size\":10,\"solidity\":0.2}},\"type\":\"bar\"}],\"carpet\":[{\"aaxis\":{\"endlinecolor\":\"#A2B1C6\",\"gridcolor\":\"#506784\",\"linecolor\":\"#506784\",\"minorgridcolor\":\"#506784\",\"startlinecolor\":\"#A2B1C6\"},\"baxis\":{\"endlinecolor\":\"#A2B1C6\",\"gridcolor\":\"#506784\",\"linecolor\":\"#506784\",\"minorgridcolor\":\"#506784\",\"startlinecolor\":\"#A2B1C6\"},\"type\":\"carpet\"}],\"choropleth\":[{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"},\"type\":\"choropleth\"}],\"contourcarpet\":[{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"},\"type\":\"contourcarpet\"}],\"contour\":[{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"},\"colorscale\":[[0.0,\"#0d0887\"],[0.1111111111111111,\"#46039f\"],[0.2222222222222222,\"#7201a8\"],[0.3333333333333333,\"#9c179e\"],[0.4444444444444444,\"#bd3786\"],[0.5555555555555556,\"#d8576b\"],[0.6666666666666666,\"#ed7953\"],[0.7777777777777778,\"#fb9f3a\"],[0.8888888888888888,\"#fdca26\"],[1.0,\"#f0f921\"]],\"type\":\"contour\"}],\"heatmapgl\":[{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"},\"colorscale\":[[0.0,\"#0d0887\"],[0.1111111111111111,\"#46039f\"],[0.2222222222222222,\"#7201a8\"],[0.3333333333333333,\"#9c179e\"],[0.4444444444444444,\"#bd3786\"],[0.5555555555555556,\"#d8576b\"],[0.6666666666666666,\"#ed7953\"],[0.7777777777777778,\"#fb9f3a\"],[0.8888888888888888,\"#fdca26\"],[1.0,\"#f0f921\"]],\"type\":\"heatmapgl\"}],\"heatmap\":[{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"},\"colorscale\":[[0.0,\"#0d0887\"],[0.1111111111111111,\"#46039f\"],[0.2222222222222222,\"#7201a8\"],[0.3333333333333333,\"#9c179e\"],[0.4444444444444444,\"#bd3786\"],[0.5555555555555556,\"#d8576b\"],[0.6666666666666666,\"#ed7953\"],[0.7777777777777778,\"#fb9f3a\"],[0.8888888888888888,\"#fdca26\"],[1.0,\"#f0f921\"]],\"type\":\"heatmap\"}],\"indicator\":[{\"mode\":\"number+delta\",\"number\":{\"font\":{\"color\":\"#4e77b0\",\"size\":40},\"valueformat\":\",.0f\"},\"type\":\"indicator\"}],\"layout\":{\"title\":{\"text\":\"Returns of Microsoft Corp.\",\"xanchor\":\"center\",\"yanchor\":\"top\"},\"xaxis\":{\"title\":\"Time Period\",\"showgrid\":true,\"showline\":true,\"zeroline\":false},\"yaxis\":{\"title\":\"Asset Return (%)\",\"showgrid\":true,\"showline\":true}}}}",
    "flow_id": "6773dca11fedc7239c286b2b",
    "component_id": "678b7582ed04eaed3d861009",
    "type": "sql",
    "created_at": {
        "$date": {
            "$numberLong": "1737195236275"
        }
    }
};

const useStore = create((set, get) => ({
    trigger: undefined,
    setTrigger: (change) => {
        set({
            trigger: change
        })
    },
    nodes: [
        // {
        //     id: '1',
        //     type: 'fileUpload',
        //     position: { x: 0, y: 100 },
        //     data: { file: undefined }
        // },
        // {
        //     id: '2',
        //     type: 'dataSource',
        //     position: { x: 0, y: 0 }
        // },
        // {
        //     id: "3",
        //     type: "promptSelector",
        //     position: { x: 0, y: 100 }
        // }
        // {
        //     id: '3',
        //     type: 'dataSource',
        //     position: { x: 0, y: 100 },
        //     data: { img: SQLSvg, content: "Connect SQL" }
        // },
        // {
        //     id: '4',
        //     type: 'dataSource',
        //     position: { x: 0, y: 200 },
        //     data: { img: CSVSvg, content: "CSV" }
        // },
        // {
        //     id: '3',
        //     type: 'followUp',
        //     position: { x: 700, y: 0 },
        //     data: { question: "hi HOw are you" }
        // },
        // {
        //     id: '4',
        //     type: 'question',
        //     position: { x: 700, y: 100 },
        // }

    ],
    edges: [],
    viewport: {},
    onNodesChange: (change) => {
        console.log("Test");
        set({
            nodes: applyNodeChanges(change, get().nodes)
        });
    },
    onEdgesChange: (change) => {
        set({
            edges: applyEdgeChanges(change, get().edges)
        });
    },
    setNodes: (nodes) => {
        set({ nodes });
    },
    setEdges: (edges) => {
        set({ edges });
    },
    uploadFile: (id, file) => {
        set({
            nodes: get().nodes.map((node) => {
                if (node.id === id) {
                    console.log(file);
                    return { ...node, data: { ...node.data, file } };
                }
                return node;
            })
        });
    },
    setViewPort: (vp) => {
        set({ vp })
    }
}));

export default useStore;
