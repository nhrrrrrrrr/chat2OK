/* eslint-disable no-dupe-keys */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';

// Reusable DataTable Component
const DataTable = ({ headers, rows, handleDelete }) => {
 
  const handleEdit = (row) => {
    console.log("Edit row:", row);
  };

  const renderCellContent = (content) => {
    if (typeof content === 'boolean') {
      return content ? "true" : "false";
    } else if (typeof content === 'object' && content !== null) {
      if (Array.isArray(content)) {
        return content.map(item => `${item.quantity}\n${item.name}`).join('\n');
      } else {
        if (content.name) {
          return content.name;
        } else {
          return JSON.stringify(content);
        }
      }
    }
    return content;
  };
  
  return (
    <div className='mx-auto w-full flex max-w-screen-xl justify-between rounded-lg shadow-lg drop-shadow-5xl'>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: '#BCD1E7',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden', // Apply overflow-hidden
          backdropFilter: 'blur(50px)', // Apply backdrop-filter with blur
          WebkitBackdropFilter: 'blur(50px)', // For Safari
          backgroundClip: 'padding-box', // Apply bg-clip-padding
          backgroundColor: 'rgba(192, 192, 192, 0)', // Apply bg-opacity-0 (adjust as needed)
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers && headers.map((header, index) => (
                <TableCell key={index} sx={{ color: 'black', fontWeight: 'bold' }}>
                  {header}
                </TableCell>
              ))}
              <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 }, 
                  backgroundColor: rowIndex % 2 === 0 ? '#D7E6F0' : '#BED2E7',
                  overflow: 'hidden', // Apply overflow-hidden to rows
                  backdropFilter: 'blur(20px)', // Apply backdrop-filter with blur to rows
                  WebkitBackdropFilter: 'blur(20px)', // For Safari
                  backgroundClip: 'padding-box', // Apply bg-clip-padding to rows
                  backgroundColor: 'rgba(192, 192, 192, 0)', // Apply bg-opacity-0 (adjust as needed) to rows
                }}
              >
                {headers.map((header, cellIndex) => (
                  <TableCell key={cellIndex}>{renderCellContent(row[header])}</TableCell>
                ))}
                <TableCell className='flex gap-10'>
                  <Button  className='mr-5 bg-black' variant="" color="primary" onClick={() => handleEdit(row)}>Edit</Button>
                  <Button variant="" color="secondary" onClick={() => handleDelete(row)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataTable;
