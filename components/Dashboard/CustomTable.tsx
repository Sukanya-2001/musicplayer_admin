import styled from "@emotion/styled";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React from "react";

const TableContainerWrapper = styled(TableContainer)`
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
  }
`;

interface TableProps {
  tableHeadList: string[];
  children: React.ReactNode;
}

export const CustomTable = ({ tableHeadList, children }: TableProps) => {
  return (
    <TableContainerWrapper>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeadList?.map((item, index) => (
              <TableCell key={index} align="center">
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainerWrapper>
  );
};
