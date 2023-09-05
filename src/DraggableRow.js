import React from 'react';
import {useDrag, useDrop} from "react-dnd";
import {Button, IconButton, TableCell, TableRow, TextField} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

const ItemType = 'Table_Row';

const DraggableRow = ({row, index, handleEditRow, handleMoveRow, columns, handleToggleEditRow}) => {

    const [, ref] = useDrag({
        type: ItemType,
        item: {index}
    })

    const [, drop] = useDrop({
        accept: ItemType,
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                handleMoveRow(draggedItem.index, index);
                draggedItem.index = index
            }
        }
    })

    const handleToggleEdit = () => {
        handleToggleEditRow(index)
    }

    const handleSaveRow = () => {
        handleToggleEditRow(index)
    }

    const handleCancelEdit = () => {
        handleToggleEditRow(index)
        handleMoveRow(index, null, row[columns[index]])
    }

    return (
        <TableRow ref={(node) => ref(drop(node))}>
            {columns.map((col, ind) => (
                <TableCell key={ind}>

                    {row.editable ? (
                        <TextField
                            value={row[col]}
                            onChange={(e) => handleEditRow(index, col, e.target.value)}
                        />
                    ) : (
                        row[col]
                    )}

                </TableCell>
            ))}

            <TableCell>

                {row.editable ? (
                    <>
                        <Button onClick={handleSaveRow}>Save</Button>
                        <Button onClick={handleCancelEdit}>Cancel</Button>
                    </>
                ) : (

                    <IconButton onClick={handleToggleEdit} area-label="Edit">
                        <EditIcon/>
                    </IconButton>
                )}
            </TableCell>

        </TableRow>
    );
};

export default DraggableRow;