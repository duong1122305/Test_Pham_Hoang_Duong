import { Modal } from "react-bootstrap";
import { useEffect } from "react";

const Annoucement = ({ show, content, close }) => {
    useEffect(() => {
        if (show) {
            const timeout = setTimeout(() => {
                close();
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [show, close]);


    return (
        <Modal show={show} onHide={close} centered>
            <Modal.Header closeButton>
                <Modal.Title>Thông báo</Modal.Title>
            </Modal.Header>
            <Modal.Body>{content}</Modal.Body>
        </Modal>
    )
}

export default Annoucement