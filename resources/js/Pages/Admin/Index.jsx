import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select from '@mui/material/Select';
import { DataGrid, GridToolbar, GridActionsCellItem, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Head } from '@inertiajs/react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FormControl from '@mui/material/FormControl';
import Button from 'react-bootstrap/Button';
import { Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import dayjs from 'dayjs';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.min.js';
import '../../../css/main.css';

function Index({ auth, amounts, mop }) {
    const [rows, setrows] = useState([]);
    const [eamountid, seteamountid] = useState(null);
    const [prevtotamnt, setprevtotamnt] = useState(0);
    const [totalamount, settotalamount] = useState(0);
    const [newamount, setnewamount] = useState('');
    const [month, setmonth] = useState(dayjs());
    const [amntmodal, setamntmodal] = useState(false);
    const [detailmodal, setdetailmodal] = useState(false);

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

    function SelectEditInputCell(props) {
        const { id, value, field } = props;

        const handleChange = async (event) => {
            let rowdata = props.row;
            if(rowdata.id == id) {
                rowdata.mopid = event.target.value
            }
            processRowUpdate(rowdata);
        };

        return (
            <Select
                value={value}
                onChange={handleChange}
                size="small"
                sx={{ height: 1 }}
                native
                autoFocus
            >
                {mop.map((mp) => {
                    return (
                        <option key={mp.id} value={mp.id}>{mp.modeofpayment}</option>
                    )
                })}
            </Select>
        );
    }

    const renderSelectEditInputCell = (params) => {
        return <SelectEditInputCell {...params} />;
    };

    const addnewtab = () => {
        if (newamount == '') {
            alert("Enter new amount..");
            return false;
        }
        axios({
            method: "POST",
            url: route("admin.getall"),
            data: { mode: "addnewtab", newamount: newamount },
        }).then(res => {
            const respmsg = res.data;
            setamntmodal(false);
            window.location.reload();
        }).catch((error) => {
            alert(error);
        });

    }

    const getamount = () => {
        axios({
            method: "POST",
            url: route("admin.getall"),
            data: { mode: "getamountbymonth", month: month, eamountid: eamountid?.id },
        }).then(res => {
            const respmsg = res.data;
            let arrdata = respmsg?.bydate;
            let nodate = respmsg?.nodate;
            setprevtotamnt(nodate);
            let totamnt = 0;
            if (arrdata.length > 0) {
                arrdata.map((val) => {
                    totamnt = parseFloat(totamnt) + parseFloat(val?.amount);
                });
            }
            settotalamount(totamnt);
            setrows(arrdata);
        }).catch((error) => {
            alert(error);
        });
    }

    useEffect(() => {

        if (amounts.length > 0) {
            let amnt = amounts[0];
            seteamountid(amnt);
        }
    }, []);

    const monthname = (dt) => {
        let mlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return mlist[dt.getMonth()];
    }

    useEffect(() => {
        if (eamountid != null) getamount();
    }, [month, eamountid]);

    const processRowUpdate = (newRow) => {
        let amount = parseFloat(newRow.amount);
        let userid = parseFloat(newRow.id);

        axios({
            method: "POST",
            url: route("admin.getall"),
            data: { mode: "editdata", month: month, editdata: newRow, eamountid: eamountid?.id },
        }).then(res => {
            const respmsg = res.data;
            getamount();
        }).catch((error) => {
            alert(error);
        });

    }

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    const columns = [
        { field: 'created_at', headerName: 'User Date', width: 150, editable: true },
        { field: 'name', headerName: 'Name', width: 200, editable: true },
        { field: 'email', headerName: 'Email', width: 250, editable: true },
        { field: 'mobile', headerName: 'Mobile', width: 200, editable: true },
        { field: 'modeofpayment', headerName: 'Mode of Payment', width: 200, renderEditCell: renderSelectEditInputCell, editable: true },
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
                        <Col lg={1} className='p-2'>
                            <AddCircleOutlineIcon className="cursor-pointer" onClick={() => setamntmodal(true)} />
                        </Col>
                        <Col lg={8}>
                            <ul className="nav nav-tabs nav-tabs-scroll" id="myTab" role="tablist">
                                {amounts.map((amnt) => {
                                    let active = '';
                                    if (amnt.id == eamountid?.id) active = "active";
                                    return (
                                        <li key={amnt.id} className="nav-item" role="presentation">
                                            <button className={"nav-link " + active} onClick={() => seteamountid(amnt)} data-bs-toggle="tab" type="button" role="tab" aria-controls="home" aria-selected="true">{amnt.amount}</button>
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
                        <div className='position-absolute fw-bold fs-5' style={{ right: "150px" }}>Total : <span className='ml-2 cursor-pointer' onClick={() => setdetailmodal(true)}>{totalamount}</span></div>
                    </StyledBox>
                </div>
            </div>
            <Modal show={amntmodal} onHide={() => setamntmodal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Tab</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control type="text" placeholder="Enter amount" onChange={(event) => setnewamount(event.target.value)} /><br />
                    <Button variant="success" onClick={addnewtab}>Add Tab</Button>
                </Modal.Body>
            </Modal>
            <Modal show={detailmodal} onHide={() => setdetailmodal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Total Amount</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card >
                        <Card.Body>
                            <ListGroup>
                                <ListGroup.Item><b>Month</b>: {monthname(new Date(month?.$d)) + ' - ' + (new Date(month?.$d).getFullYear())}</ListGroup.Item>
                                <ListGroup.Item><b>Amount</b>: {eamountid?.amount} </ListGroup.Item>
                                <ListGroup.Item><b>Prev Total Amount</b>: {prevtotamnt}</ListGroup.Item>
                                <ListGroup.Item><b>Total Amount</b>: {totalamount}</ListGroup.Item>
                                <ListGroup.Item>{eamountid?.amount + ' - ' + (4 / 100 * eamountid?.amount) + ' = ' + (eamountid?.amount - ((4 / 100 * eamountid?.amount)))}</ListGroup.Item>
                                <ListGroup.Item className={((eamountid?.amount - ((4 / 100 * eamountid?.amount))) - prevtotamnt - totalamount) < 0 ? "text-danger" : ""}>{(eamountid?.amount - ((4 / 100 * eamountid?.amount))) + ' - ' + prevtotamnt + ' - ' + totalamount + ' = ' + ((eamountid?.amount - ((4 / 100 * eamountid?.amount))) - prevtotamnt - totalamount)} </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Modal.Body>
            </Modal>
        </AuthenticatedLayout>
    )
}

export default Index