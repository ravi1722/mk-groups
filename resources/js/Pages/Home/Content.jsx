import React from 'react'
import '../../../css/app.css';
import Row from "react-bootstrap/Row";
import { Col } from 'react-bootstrap';
import Container from "react-bootstrap/Container";

function Content() {
    return (
        <>
            <div className='bg_img' style={{ overflowY: "auto", height: "auto" }}>
                <Container>
                    <Row>
                        <Col md={6} lg={6}>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus quod dolor praesentium facilis commodi quas, adipisci itaque! Quasi hic dolores repellendus culpa dolore sapiente molestiae ex? Excepturi nisi, illum illo ex incidunt doloribus recusandae at eligendi corporis iure, ducimus earum vitae quibusdam? Omnis dolorem ducimus deleniti dicta commodi. Ex ducimus nulla suscipit veritatis unde minima aut, beatae officiis, voluptatibus aspernatur sit enim velit quod magnam dicta ad possimus. Corrupti harum doloribus rerum quas eveniet, esse soluta incidunt asperiores id, dolorum molestiae, earum quos molestias porro reprehenderit facere delectus deleniti nisi? Eaque aliquam vitae maxime dolorem laboriosam. Iste animi dignissimos a?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus quod dolor praesentium facilis commodi quas, adipisci itaque! Quasi hic dolores repellendus culpa dolore sapiente molestiae ex? Excepturi nisi, illum illo ex incidunt doloribus recusandae at eligendi corporis iure, ducimus earum vitae quibusdam? Omnis dolorem ducimus deleniti dicta commodi. Ex ducimus nulla suscipit veritatis unde minima aut, beatae officiis, voluptatibus aspernatur sit enim velit quod magnam dicta ad possimus. Corrupti harum doloribus rerum quas eveniet, esse soluta incidunt asperiores id, dolorum molestiae, earum quos molestias porro reprehenderit facere delectus deleniti nisi? Eaque aliquam vitae maxime dolorem laboriosam. Iste animi dignissimos a</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Content
