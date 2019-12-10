import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


// export interface ModalConfigObj {
//     header: {
//         title: "string"
//     },
//     body: Object,
//     footer: {
//         btn1: {
//             label: "",
//             btn1Handler: ""
//         },
//         btn2: {
//             label: "",
//             btn2Handler: ""
//         }
//     },
//     dialogClassName: ""
// }


/**
 * Full props config object type: 
 * {
        header: {
            title: ""
        },
        body: ,
        footer: {
            btn1: {
                label:"", 
                btn1Handler:""
            },
            btn2: {
                label:"", 
                btn2Handler:""
            }
        },
        dialogClassName: ""
    }
 * @param {*} props 
 */
export default function ModalTemplate(props) {
    
    return (
        <Modal show={props.show} onHide={props.handleClose} dialogClassName={props.configObj.dialogClassName}>
            {props.configObj.header &&
                <Modal.Header closeButton>
                    <Modal.Title>{props.configObj.header.title}</Modal.Title>
                </Modal.Header>
            }
            <Modal.Body>
                {props.configObj.body}
            </Modal.Body>
            {props.configObj.footer &&
                <Modal.Footer>
                    {props.configObj.footer.btn1 &&
                        <Button variant="secondary" onClick={props.configObj.footer.btn1.btn1Handler}>
                            {props.configObj.footer.btn1.label}
                        </Button>}
                    {props.configObj.footer.btn2 &&
                        <Button variant="primary" onClick={props.configObj.footer.btn2.btn1Handler}>
                            {props.configObj.footer.btn2.label}
                        </Button>}
                </Modal.Footer>}
        </Modal>
    )
}

