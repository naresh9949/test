import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "./../MUI/Select";
import Switch from "./../MUI/Switch";
import { styled } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import Container from "@mui/material/Container";
import { useState } from "react";
import TollBar from "./TableTollBar";
import EditableCell from "./../MUI/EditableCell";
import DeleteBtn from "./../MUI/DeleteBtn";
import Autocomplete from "./../MUI/Autocomplete";
import CheckBox from "./../MUI/CheckBox";

export default function Headers(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {<TableCell key="selectall" align="center">
            <CheckBox changeHandler={props.selectAllHandler}/>
        </TableCell>}
        {props.headCells
          .filter((cell) => props.showCells.includes(cell.id))
          .map((headCell) => {
            return (
              <TableCell
                key={headCell.id}
                align="center"
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                  align="center"
                  sx={{ color: "black", fontWeight: "bold" }}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            );
          })}
      </TableRow>
    </TableHead>
  );
}
