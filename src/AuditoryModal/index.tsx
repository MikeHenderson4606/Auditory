
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function AuditoryModal({text, showModal, onHide}: {text:string, showModal:boolean, onHide:() => void}) {

    return (
        <div>
            <Modal show={showModal} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>There was a problem processing your request.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {text}
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-success' onClick={onHide}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AuditoryModal;