// import React, {useState} from 'react';
// import {
//     Button,
//     Checkbox,
//     FormControlLabel,
//     Table,
//     TableBody,
//     TableContainer,
//     TableHead,
//     TableRow,
//     TextField
// } from "@mui/material";
// import DraggableRow from "./DraggableRow";
//
// const DragDropTable = () => {
//
//     const initialColumns = ['Row Name', 'Data'];
//     const initialData = [
//         {'Row Name': 'Row 1', Data: 'Data 1', editable: false},
//         {'Row Name': 'Row 2', Data: 'Data 2', editable: false},
//         {'Row Name': 'Row 3', Data: 'Data 3', editable: false},
//     ]
//
//     const [columns, setColumns] = useState(initialColumns);
//     const [tableData, setTableData] = useState(initialData);
//     const [newRow, setNewRow] = useState({});
//     const [showAddRowForms, setShowAddRowForms] = useState(false);   //
//     const [newColumn, setNewColumn] = useState('');
//     const [showColumnInputs, setShowColumnInputs] = useState(false);
//
//     //чекбокс
//
//     const handleCheckboxChange = (event) => {
//         const columnName = event.target.name;
//         if (event.target.checked) {
//             setColumns([...columns, columnName])
//         } else {
//             setColumns(columns.filter((col) => col !== columnName))
//         }
//     }
//
//     const handleNewColumnChange = (event) => {
//         setNewColumn(event.target.value);
//     }
//
//     const handleAddColumn = () => {
//         if (newColumn.trim() !== '') {
//             setColumns([...columns, newColumn])
//             setNewColumn('')
//         }
//     }
//
//     //строки
//
//     const handleNewRowChange = (event) => {
//         setNewRow({...newRow, [event.target.name]: event.target.value});
//     }
//
//     const handleAddRow = () => {
//         setTableData([...tableData, {...newRow, editable: false}]);
//         setNewRow({});
//         setShowAddRowForms(false)
//     }
//
//     const handleEditRow = (index, col, value) => {
//         const newData = [...tableData];
//         newData[index][col] = value;
//         setTableData(newData);
//     }
//
//     //перетаскивание строк (замена строк местами)
//
//     const handleMoveRow = (fromIndex, toIndex) => {
//         const newData = [...tableData];
//         newData.splice(toIndex, 0, newData.splice(fromIndex, 1)[0])
//     }
//
//     return (
//         <>
//             <div>
//                 {/*add columns*/}
//                 <Button>Add Column</Button>
//
//                 {/*циклом map колонки по индексу*/}
//
//                 <TextField
//                     label="New Column"
//                 />
//
//                 <Button>Add</Button>
//
//                 <div>
//                     <FormControlLabel
//
//                         control={
//                             <Checkbox
//
//                             />
//                         }
//
//                         // label column
//
//                     />
//                 </div>
//
//
//                 <div>
//                     {/*add Row*/}
//                     <Button>Add Row</Button>
//
//                     <TextField
//                         label="New Row"
//                     />
//
//                     <Button>Add Row</Button>
//
//                 </div>
//             </div>
//
//             <TableContainer>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             {/*Cells*/}
//                         </TableRow>
//                     </TableHead>
//
//                     <TableBody>
//
//                         <DraggableRow/>
//
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//
//         </>
//     );
// };
//
// export default DragDropTable;


import React, {useState} from 'react';
import {
    Button,
    Checkbox,
    FormControlLabel, Paper,
    Table,
    TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import DraggableRow from "./DraggableRow";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

const DragDropTable = () => {

    const initialColumns = ['Row Name', 'Data'];
    const initialData = [
        {'Row Name': 'Row 1', Data: 'Data 1', editable: false},
        {'Row Name': 'Row 2', Data: 'Data 2', editable: false},
        {'Row Name': 'Row 3', Data: 'Data 3', editable: false},
    ];

    const [columns, setColumns] = useState(initialColumns);
    const [tableData, setTableData] = useState(initialData);
    const [newRow, setNewRow] = useState({});
    const [showAddRowForm, setShowAddRowForm] = useState(false);
    const [newColumn, setNewColumn] = useState('');
    const [showColumnInput, setShowColumnInput] = useState(false);

    // checkbox

    const handleCheckBoxChange = (event) => {
        const columnName = event.target.name;
        if (event.target.checked) {
            setColumns([...columns, columnName])
        } else {
            setColumns(columns.filter(col => col !== columnName))
        }
    }

    const handleNewColumnChange = (event) => {
        setNewColumn(event.target.value)
    }

    const handleAddColumn = () => {
        if (newColumn.trim() !== '') {
            setColumns([...columns, newColumn])
            setNewColumn('');
        }
    }

    //строки

    const handleNewRowChange = (event) => {
        setNewRow({...newRow, [event.target.name]: event.target.value})
    }

    const handleAddRow = () => {
        setTableData([...tableData, {...newRow, editable: false}])
        setNewRow({});
        setShowAddRowForm(false)
    }

    const handleEditRow = (index, col, value) => {
        const newData = [...tableData];
        newData[index][col] = value;
        setTableData(newData)
    }

    //замена строк местами

    const handleMoveRow = (fromIndex, toIndex) => {
        const newData = [...tableData];
        newData.splice(toIndex, 0, newData.splice(fromIndex, 1)[0])
        setTableData(newData)
    }

    // const handleToggleEditRow = (index) => {
    //     const newData = [...tableData];
    //     newData[index].editable = !newData[index].editable;
    //     setTableData(newData)
    // }

    const handleToggleEditRow = (index) => {
        if (tableData[index].editable) {
            const newData = [...tableData];
            newData[index].editable = false;
            setTableData(newData)
        } else {
            const newData = tableData.map((row, i) =>
                i === index ? {...row, editable: true} : row
            );
            setTableData(newData)
        }
    }


    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <Button onClick={() => setShowColumnInput(!showColumnInput)}>Add Column</Button>
                {/*map по колонкам*/}

                {showColumnInput && (
                    <div>
                        <TextField
                            label='New Column'
                            value={newColumn}
                            onChange={handleNewColumnChange}
                        />

                        <Button onClick={handleAddColumn}>Add</Button>

                        <div>

                            {columns.map((col, index) => (
                                <FormControlLabel
                                    key={index}
                                    control={
                                        <Checkbox
                                            checked={columns.includes(col)}
                                            onChange={handleCheckBoxChange}
                                            name={col}
                                        />
                                    }
                                    // label колонки
                                    label={col}
                                />
                            ))}
                        </div>
                    </div>
                )}


                <Button onClick={() => setShowAddRowForm(!showAddRowForm)}>Add Row</Button>

                {showAddRowForm && (
                    <div>
                        {columns.map((col, index) => (
                            <TextField
                                key={index}
                                label={col}
                                name={col}
                                value={newRow[col] || ''}
                                onChange={handleNewRowChange}
                            />
                        ))}
                        <Button onClick={handleAddRow}>Add Row</Button>
                    </div>
                )}
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {/*ячейки*/}
                            {columns.map((col, ind) => (
                                <TableCell key={ind}>{col}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {tableData.map((row, index) => (
                            <DraggableRow
                                key={index}
                                row={row}
                                index={index}
                                columns={columns}
                                handleEditRow={handleEditRow}
                                handleMoveRow={handleMoveRow}
                                handleToggleEditRow={handleToggleEditRow}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </DndProvider>
    );
};

export default DragDropTable;



























