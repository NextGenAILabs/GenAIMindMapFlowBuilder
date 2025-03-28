import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { alignProperty } from '@mui/material/styles/cssUtils';

ModuleRegistry.registerModules([AllCommunityModule]);

const TableComponent = ({ df }) => {
    console.log('This is table component', df);
    // 	const columns = [
    //   { field: 'id', headerName: 'ID', width: 70 },
    //   { field: 'firstName', headerName: 'First name', width: 130 },
    //   { field: 'lastName', headerName: 'Last name', width: 130 },
    // 	]

    const [rows, setRows] = useState({});
    const [cols, setCols] = useState({});

    const row = [];
    df.forEach((element, index) => {
        row.push({
            ...element
        });
    });

    const col = [];
    const firstRow = df[0];
    const keys = Object.keys(firstRow);

    for (let i = 0; i < keys.length; i++) {
        col.push({
            field: keys[i],
            cellStyle: { textAlign: 'center', color: 'white' },
            flex: 1
        });
    }

    // useEffect(() => {
    // 	if (df.length === 0) {
    // 		return
    // 	}
    // 	parseCols();
    // 	parseRows();
    // 	console.log(rows)
    // 	console.log(cols)
    // }, df)
    return (
        <div className="table-block">
            <div
                className="ag-table"
                style={{ height: '392px', width: '100%' }}
            >
                <AgGridReact
                    rowData={row}
                    columnDefs={col}
                    rowClass={'ag-row'}
                    rowHeight={56}
                    rowStyle={{ alignItems: 'center !important' }}
                    headerHeight={56}
                />
            </div>
        </div>
    );
};

export default TableComponent;
