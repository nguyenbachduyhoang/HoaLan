import { useFormik } from 'formik'
import React from 'react'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup'
export default function Contact1() {
    const formik = useFormik({
        validateOnChange: false, //được kích hoạt khi giá trị input thay đổi
        validateOnBlur: false, //kích hoạt khi thoát khỏi input
        initialValues: {
            email: '',
            name: '',
            phone: 0,
            menu: '',
            content: '',
            agree: false
        },
        onSubmit: values => {
            alert(JSON.stringify(values))
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),
            email: Yup.string().required("Required.").email("Invalid email"),
            phone: Yup.number().integer().typeError("Please enter a valid number"),
            menu: Yup.string().required("Please select a program."),
            content: Yup.string().required("Required.").min(10, "Must be 10 characters or more"),
            agree: Yup.boolean().oneOf([true], "The terms and conditions must be accepted.")
        }),


    })
    return (
        <Container>
            <Row>
                <Col md={12}>
                    <form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Your email..."
                                name='email' value={formik.values.email} onChange={formik.handleChange}
                            />
                            {formik.errors.email && (<Alert variant='warning'>{formik.errors.email}</Alert>)}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Your name..."
                                name='name' value={formik.values.name} onChange={formik.handleChange}
                            />
                            {formik.errors.name && (<Alert variant='warning'>{formik.errors.name}</Alert>)}

                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="number" placeholder="Your phone..."
                                name='phone' value={formik.values.phone} onChange={formik.handleChange}
                            />
                            {formik.errors.phone && (<Alert variant='warning'>{formik.errors.phone}</Alert>)}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Menu</Form.Label>
                            <Form.Select aria-label="Default select example" name='menu'
                                value={formik.values.menu} onChange={formik.handleChange}
                            >
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                            {formik.errors.menu && (<Alert variant='warning'>{formik.errors.menu}</Alert>)}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" rows={3} name='content'
                                value={formik.values.content} onChange={formik.handleChange}
                            />
                            {formik.errors.content && (<Alert variant='warning'>{formik.errors.content}</Alert>)}
                        </Form.Group>
                        <Form.Group>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="custom-switch"
                                label="Check this switch"
                                name='agree'
                                value={formik.values.agree} onChange={formik.handleChange}
                            />
                            {formik.errors.agree && (<Alert variant='warning'>{formik.errors.agree}</Alert>)}
                        </Form.Group>
                        <Form.Group>
                            <Button variant='primary' type='submit'>Submit</Button>
                        </Form.Group>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}
