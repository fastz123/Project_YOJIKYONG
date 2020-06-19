import React from "react";
import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Paper
} from "@material-ui/core";

export default function ReportTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table>
      <TableHead>
        <TableRow>
          <TableCell>글&nbsp;번&nbsp;호</TableCell>
          <TableCell>글&nbsp;제&nbsp;목</TableCell>
          <TableCell>조&nbsp;회&nbsp;수</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>여기 정말 심하네요</TableCell>
          <TableCell>1</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2</TableCell>
          <TableCell>여기 정말 심하네요</TableCell>
          <TableCell>0</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>3</TableCell>
          <TableCell>여기 정말 심하네요</TableCell>
          <TableCell>5</TableCell>
        </TableRow>
      </TableBody>
      </Table>
    </TableContainer>
  );
}
