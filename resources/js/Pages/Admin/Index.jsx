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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FormControl from '@mui/material/FormControl';
import { Col, Row } from 'react-bootstrap';
import dayjs from 'dayjs';

function Index({ auth, amounts }) {
    const [rows, setrows] = useState([]);
    const [eamount, seteamount] = useState(0);
    const [splitamount, setsplitamount] = useState(0);


    const [totalamount, settotalamount] = useState(0);
    const [month, setmonth] = useState(dayjs());

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

    // useEffect(() => {
    //     // let userlength = users.length;
    //     // let split = eamount / userlength;
    //     // setsplitamount(split);

    //     // let row = users.map((user) => {
    //     //     user.amount = split.toFixed(2);
    //     //     return user;
    //     // });
    //     setrows(users);
    // }, [eamount]);

    const getamount = () => {
        axios({
            method: "POST",
            url: route("admin.getall"),
            data: { mode: "getamountbymonth", month: month },
        }).then(res => {
            const respmsg = res.data;
            let totamnt = 0;
            if (respmsg.length > 0) {
                respmsg.map((val) => {
                    totamnt = parseFloat(totamnt) + parseFloat(val?.amount);
                });
            }
            settotalamount(totamnt);
            setrows(respmsg);
            console.log(respmsg)
        }).catch((error) => {
            alert(error);
        });
    }

    useEffect(() => {
        getamount();
    }, [month]);

    const processRowUpdate = (newRow) => {
        let amount = parseFloat(newRow.amount);
        let userid = parseFloat(newRow.id);

        axios({
            method: "POST",
            url: route("admin.getall"),
            data: { mode: "saveamount", month: month, amount: amount, userid: userid },
        }).then(res => {
            const respmsg = res.data;
            getamount();
        }).catch((error) => {
            alert(error);
        });

        // settotalamount(amount);
        // console.log(amount)
    }

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
        { field: 'email', headerName: 'Email', width: 250, editable: true },
        { field: 'mobile', headerName: 'Mobile', width: 200, editable: true },
        { field: 'modeofpayment', headerName: 'Mode of Payment', width: 200, editable: true },
        { field: 'amount', headerName: 'Amount', width: 150, editable: true },
        // {
        //     field: 'action', headerName: 'Action', width: 150, type: 'actions', getActions: ({ id, row }) => {
        //         return [
        //             <>
        //                 <GridActionsCellItem
        //                     icon={<EditIcon />}
        //                     label="Discard changes" />
        //                 <GridActionsCellItem
        //                     icon={<DeleteIcon />}
        //                     label="Discard changes" />
        //             </>
        //         ]
        //     }
        // },
    ]
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard&nbsp;<ControlPointRoundedIcon /></h2>}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Row className='mb-2'>
                        <Col lg={9}>
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
                        </Col>
                        <Col lg={3}>
                            <FormControl fullWidth>
                                <div>
                                    <FormControl fullWidth>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label={'Month'}
                                                views={['month', 'year']}
                                                value={month}
                                                onChange={(newValue) => setmonth(dayjs(newValue))}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                </div>
                            </FormControl>
                        </Col>
                    </Row>

                    <StyledBox className='position-relative'>
                        <DataGrid rows={rows} columns={columns} editMode="row"
                            processRowUpdate={processRowUpdate}
                            slots={{ toolbar: CustomToolbar }}
                            // checkboxSelection
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                    csvOptions: { utf8WithBom: true }
                                },
                            }} />
                        <div className='position-absolute fw-bold fs-5' style={{ right: "150px" }}>Total : <span className='ml-2'>{totalamount}</span></div>
                    </StyledBox>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Index