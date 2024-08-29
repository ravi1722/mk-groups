import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../../css/app.css';
import Row from "react-bootstrap/Row";
import { Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AddCircle } from '@mui/icons-material';
export default function Authenticated({ user, header, children }) {
    const [showprof, setShowprof] = useState(false);

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (

        <>
            <Navbar collapseOnSelect expand="lg" className="navhead ">
                <Container fluid>
                    <Navbar.Brand href="#home">
                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto navanchor">
                            <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Dashboard
                            </NavLink>
                            <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Home
                            </NavLink>
                            <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                About
                            </NavLink>
                            <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Contact
                            </NavLink>
                        </Nav>
                        <Nav className='drpbutton justify-content-end'>
                            <span onClick={() => setShowprof(true)}><AccountCircleIcon sx={{ fontSize: 33 }} style={{ color: "white" }} /></span>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {showprof && <div className='profi col-lg-2 p-2 m-2 mt-0 float-end fl_rt'>
                <Row className=''>
                    <Col lg={3} md={2} className='imgred'>
                        <img src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png" className='mt-1' width="180" alt="" />
                    </Col>
                    <Col lg={9} md={10}>
                        <Row>
                            <Col lg={12}>
                                <b>{user.name}</b>
                            </Col>
                            <Col lg={12}>
                                <b>{user.email}</b>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className='border-top'>
                    <Col lg={6}>
                        <Link href={route('profile.edit')} as="button">
                            <b>Profile</b>
                        </Link>
                    </Col>
                    <Col lg={6}>
                        <Link method="post" href={route('logout')} className='float-end' as="button">
                            <b>Log Out</b>
                        </Link>
                    </Col>
                </Row>
            </div>}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <main>{children}</main>
        </>
    );
}
