import React from 'react';
import {useDrag, useDrop} from "react-dnd";
import {TableCell, TableRow, TextField} from "@mui/material";

const ItemType = 'Table_Row';

const DraggableRow = ({row, index, handleEditRow, handleMoveRow, columns}) => {
    const [, ref] = useDrag({
        type: ItemType,
        item: {index}
    })

    const [, drop] = useDrop({
        accept: ItemType,
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                handleMoveRow(draggedItem.index, index)
                draggedItem.index = index
            }
        }
    })

    return (
        <TableRow>
            {columns.map((col, ind) => (
                <TableCell key={ind}>
                    {/*<TextField/>*/}
                </TableCell>
            ))}
        </TableRow>
    );
};

export default DraggableRow;