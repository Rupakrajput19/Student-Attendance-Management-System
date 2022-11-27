import React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Student ID', width: 100 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 140,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 140,
  },
  {
    field: 'DOB',
    headerName: 'Date of birth',
    type: 'string',
    width: 120,
  },
  {
    field: 'Address',
    headerName: 'Address',
    type: 'string',
    width: 140,
  }
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.getValue(params.id, 'firstName') || ''} ${
  //       params.getValue(params.id, 'lastName') || ''
  //     }`,
  // },
];

const rows = [
  { id: 1, firstName: 'Ritu', lastName: 'Kumar', DOB: '27/01-2000', Address:'Delhi' },
  { id: 2, firstName: 'Lalit', lastName: 'Yadav', DOB: '22/05-2001', Address:'UP' },
  { id: 3, firstName: 'Aniket', lastName: 'Kumar', DOB: '05/11-1997', Address:'Mumbai' },
  { id: 4, firstName: 'Abhishek', lastName: '', DOB: '16/04-1995', Address:'Haryana' },
  { id: 5, firstName: 'Mukesh', lastName: 'Yadav', DOB: '25/01-1992', Address:'UP' },
  { id: 6, firstName: 'Vikash', lastName: null, DOB: '10/06-2003', Address:'Delhi' },
  { id: 7, firstName: 'Aditya', lastName: 'Saxena', DOB: '31/08-1999', Address:'Punjab' },
  { id: 8, firstName: 'Sandeep', lastName: 'Rohila', DOB: '26/11-1998', Address:'Chennai' },
  { id: 9, firstName: 'Umesh', lastName: 'Chakartboty', DOB: '15/01-1994', Address:'Delhi' },
];

export default function Attendance() {
  return (
    <>
    <div style={{ height: 400, width: '80%', textAlign: "center" , margin:"30px auto", background:"white", border:"2px solid black"}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
    </>
  );
}