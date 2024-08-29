import React from 'react'
import { useForm } from '@inertiajs/react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function WhatsappForm() {
    const { data, setData, post, processing, errors } = useForm({
        id: '',
        Group: '',
        Month: '',
        Amount: '',
        Commission: '',
        Date: '',
        Time: '',
        AuctionAmount: '',
        Bidder: '',
        MonthlySubscription: '',
        Saving: '',
        NextMonthPayAmnt: '',
    })

    const formSubmit = (e) => {
        e.preventDefault();
        post('/admin/sendwhatsapp');
    }
    return (
        <Form onSubmit={formSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>குரூப்</Form.Label>
                    <Form.Control type="text" placeholder="Group" style={{ border: "1px solid #bbaeae" }} onChange={e => setData('Group', e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>மாதம்</Form.Label>
                    <Form.Control type="text" placeholder="Month" style={{ border: "1px solid #bbaeae" }} onChange={e => setData('Month', e.target.value)} />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>தேதி</Form.Label>
                    <Form.Control type="text" placeholder="Date" style={{ border: "1px solid #bbaeae" }} onChange={e => setData('Date', e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>நேரம்</Form.Label>
                    <Form.Control type="text" placeholder="Time" style={{ border: "1px solid #bbaeae" }} onChange={e => setData('Time', e.target.value)} />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>சீட்டுத் தொகை</Form.Label>
                    <Form.Control type="text" placeholder="Chettu Amount" style={{ border: "1px solid #bbaeae" }} onChange={e => setData('Amount', e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>கமிஷன்</Form.Label>
                    <Form.Control type="text" placeholder="Commission" style={{ border: "1px solid #bbaeae" }} onChange={e => setData('Commission', e.target.value)} />
                </Form.Group>
            </Row>

            <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridName">
                <Form.Label>ஏலம் போன தொகை</Form.Label>
                <Form.Control type="text" placeholder="Auctions Amount" style={{ border: "1px solid #bbaeae" }} onChange={e => setData('AuctionAmount', e.target.value)} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridName">
                <Form.Label>ஏலம் எடுத்தவர்</Form.Label>
                <Form.Control type="text" placeholder="Bidder" style={{ border: "1px solid #bbaeae" }} onChange={e => setData('Bidder', e.target.value)} />
            </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>மாத சந்தா</Form.Label>
                    <Form.Control type="text" placeholder="Monthly Subscription" style={{ border: "1px solid #bbaeae" }} onChange={e => setData('MonthlySubscription', e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>இருப்பு</Form.Label>
                    <Form.Control type="text" placeholder="Saving" style={{ border: "1px solid #bbaeae" }} onChange={e => setData('Saving', e.target.value)} />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridName">
                <Form.Label>அடுத்த மாதம் கட்டவேண்டிய தொகை</Form.Label>
                <Form.Control type="text" placeholder="Next Month Payment Amount" style={{ border: "1px solid #bbaeae" }} onChange={e => setData('NextMonthPayAmnt', e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Send
            </Button>
        </Form>
    )
}

export default WhatsappForm