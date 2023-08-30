import React, {useState} from 'react';
import {
    Button,
    Checkbox,
    FormControlLabel,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import DraggableRow from "./DraggableRow";

const DragDropTable = () => {

    const initialColumns = ['Row Name', 'Data'];
    const initialData = [
        {'Row Name': 'Row 1', Data: 'Data 1', editable: false},
        {'Row Name': 'Row 2', Data: 'Data 2', editable: false},
        {'Row Name': 'Row 3', Data: 'Data 3', editable: false},
    ]

    const [columns, setColumns] = useState(initialColumns);
    const [tableData, setTableData] = useState(initialData);
    const [newRow, setNewRow] = useState({});
    const [showAddRowForms, setShowAddRowForms] = useState(false);   //
    const [newColumn, setNewColumn] = useState('');
    const [showColumnInputs, setShowColumnInputs] = useState(false);

    //чекбокс

    const handleCheckboxChange = (event) => {
        const columnName = event.target.name;
        if (event.target.checked) {
            setColumns([...columns, columnName])
        } else {
            setColumns(columns.filter((col) => col !== columnName))
        }
    }

    const handleNewColumnChange = (event) => {
        setNewColumn(event.target.value);
    }

    const handleAddColumn = () => {
        if (newColumn.trim() !== '') {
            setColumns([...columns, newColumn])
            setNewColumn('')
        }
    }

    //строки

    const handleNewRowChange = (event) => {
        setNewRow({...newRow, [event.target.name]: event.target.value});
    }

    const handleAddRow = () => {
        setTableData([...tableData, {...newRow, editable: false}]);
        setNewRow({});
        setShowAddRowForms(false)
    }

    const handleEditRow = (index, col, value) => {
        const newData = [...tableData];
        newData[index][col] = value;
        setTableData(newData);
    }

    //перетаскивание строк (замена строк местами)

    const handleMoveRow = (fromIndex, toIndex) => {
        const newData = [...tableData];
        newData.splice(toIndex, 0, newData.splice(fromIndex, 1)[0])
    }

    return (
        <>
            <div>
                {/*add columns*/}
                <Button>Add Column</Button>

                {/*циклом map колонки по индексу*/}

                <TextField
                    label="New Column"
                />

                <Button>Add</Button>

                <div>
                    <FormControlLabel

                        control={
                            <Checkbox

                            />
                        }

                        // label column

                    />
                </div>


                <div>
                    {/*add Row*/}
                    <Button>Add Row</Button>

                    <TextField
                        label="New Row"
                    />

                    <Button>Add Row</Button>

                </div>
            </div>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {/*Cells*/}
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        <DraggableRow/>

                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
};

export default DragDropTable;