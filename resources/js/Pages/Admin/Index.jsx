import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DataGrid, GridToolbar, GridActionsCellItem, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Head } from '@inertiajs/react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.min.js';
import '../../../css/main.css';

function Index({ auth, users }) {
    const rows = users;
    const StyledBox = styled('div')(({ theme }) => ({
        height: 480,
        width: '100%',
        '& .MuiDataGrid-cell--editing': {
            backgroundColor: 'rgb(255,215,115, 0.19)',
            color: '#1a3e72',
            '& .MuiInputBase-root': {
                height: '100%',
            },
        },
        '& .Mui-error': {
            backgroundColor: `rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
            color: theme.palette.error.main,
        },
    }));

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    const columns = [
        { field: 'created_at', headerName: 'Date', width: 200, editable: true },
        { field: 'name', headerName: 'Name', width: 200, editable: true },
        { field: 'email', headerName: 'Email', width: 200, editable: true },
        { field: 'mobile', headerName: 'Mobile', width: 200, editable: true },
        {
            field: 'action', headerName: 'Action', width: 200, type: 'actions', getActions: ({ id, row }) => {
                return [
                    <>
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Discard changes" />
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Discard changes" />
                    </>
                ]
            }
        },
    ]
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard&nbsp;<ControlPointRoundedIcon /></h2>}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ul class="nav nav-tabs m-2">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Active</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                    </ul>
                    <StyledBox>
                        <DataGrid rows={rows} columns={columns} editMode="row"
                            slots={{ toolbar: CustomToolbar }}
                            // checkboxSelection
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                    csvOptions: { utf8WithBom: true }
                                },
                            }} />
                    </StyledBox>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Index