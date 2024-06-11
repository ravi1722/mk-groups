import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DataGrid, GridToolbar, GridActionsCellItem, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Head } from '@inertiajs/react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.min.js';
import '../../../css/main.css';

function Index({ auth, users, amounts }) {
    const [rows, setrows] = useState([]);
    const [eamount, seteamount] = useState(0);
    const [splitamount, setsplitamount] = useState(0);
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

    useEffect(() => {

        if (amounts.length > 0) {
            let amnt = amounts[0].amount;
            seteamount(amnt);
        }
    }, []);

    useEffect(() => {
        let userlength = users.length;
        let split = eamount / userlength;
        setsplitamount(split);

        let row = users.map((user) => {
            user.amount = split.toFixed(2);
            return user;
        });
        setrows(row);
    }, [eamount]);

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    const columns = [
        { field: 'created_at', headerName: 'Date', width: 150, editable: true },
        { field: 'name', headerName: 'Name', width: 200, editable: true },
        { field: 'email', headerName: 'Email', width: 150, editable: true },
        { field: 'mobile', headerName: 'Mobile', width: 200, editable: true },
        { field: 'modeofpayment', headerName: 'Mode of Payment', width: 150, editable: true },
        { field: 'amount', headerName: 'Amount', width: 150, editable: true },
        {
            field: 'action', headerName: 'Action', width: 150, type: 'actions', getActions: ({ id, row }) => {
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
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        {amounts.map((amnt) => {
                            let active = '';
                            if (amnt.amount == eamount) active = "active";
                            return (
                                <li key={amnt.id} className="nav-item" role="presentation">
                                    <button className={"nav-link " + active} onClick={() => seteamount(amnt.amount)} data-bs-toggle="tab" type="button" role="tab" aria-controls="home" aria-selected="true">{amnt.amount}</button>
                                </li>
                            )
                        })}
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