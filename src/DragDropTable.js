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
    const [showAddRow, setShowAddRow] = useState(false);   //
    const [newColumn, setNewColumn] = useState('');
    const [showColumnInputs, setShowColumnInputs] = useState(false);

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