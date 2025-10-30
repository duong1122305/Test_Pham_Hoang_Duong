import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button, Modal, ButtonGroup } from "react-bootstrap";

const UpdateForm = ({ show, onHide, reloadData, id }) => {
    const [user, setUser] = useState({})

    const [error, setError] = useState({})

    useEffect(() => {
        const handleFindUserById = async () => {
            try {
                const response = await axios.get(`https://localhost:7067/api/user/getbyid/${id}`)
                const userData = response.data;
                if (userData.dob && typeof userData.dob === 'string') {
                    userData.dob = userData.dob.split('T')[0];
                }

                setUser(userData)
            } catch (error) {
                console.log('Error: ', error);
            }
        }

        console.log(id);

        if (id && show) {
            handleFindUserById()
        }
    }, [id, show])

    const handleUpdate = async () => {
        try {
            if(!user) return
            const response = await axios.put(`https://localhost:7067/api/user/update/${id}`, user)

            reloadData()
            onHide()
            console.log('update success');

        } catch (error) {
            console.log('Error: ', error);
        }
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
        const newError = {}

        //Check valid info
        if (user.name.trim().length === 0) {
            newError.name = "Họ tên không được để trống";
        }

        const phoneRegex = /^(03[2-9]|05[689]|07[06-9]|08[1-689]|09[0-46-9])\d{7}$/;
        if (user.phone.trim().length === 0) {
            newError.phone = "SĐT không được để trống"
        } else if (!phoneRegex.test(user.phone) || user.phone.trim().length > 10) {
            newError.phone = "SĐT không hợp lệ"
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (user.email.trim().length === 0) {
            newError.email = "Email không được để trống"
        } else if (!emailRegex.test(user.email)) {
            newError.email = "Email không hợp lệ"
        }

        setError(newError)

        if (Object.keys(newError).length == 0) {
            handleUpdate()
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Sửa thông tin
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Họ và tên</Form.Label>
                        <Form.Control type="text" value={user.name || ''} onChange={(e) => setUser({ ...user, name: e.target.value })} isInvalid={!!error.name} />
                        {error.name && <div className="text-danger">{error.name}</div>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Ngày sinh</Form.Label>
                        <Form.Control type="date" value={user.dob || ''} onChange={(e) => setUser({ ...user, dob: e.target.value })} isInvalid={!!error.dob} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={user.email || ''} onChange={(e) => setUser({ ...user, email: e.target.value })} isInvalid={!!error.email} />
                        {error.email && <div className="text-danger">{error.email}</div>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>SĐT</Form.Label>
                        <Form.Control type="tel" value={user.phone || ''} onChange={(e) => setUser({ ...user, phone: e.target.value })} isInvalid={!!error.phone} />
                        {error.phone && <div className="text-danger">{error.phone}</div>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control as="textarea" rows={3} value={user.address || ''} onChange={(e) => setUser({ ...user, address: e.target.value })} isInvalid={!!error.address} />
                    </Form.Group>
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="outline-primary" onClick={handleSubmit}>Sửa</Button>
                        <Button variant="outline-warning" onClick={onHide}>Đóng</Button>
                    </ButtonGroup>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default UpdateForm;