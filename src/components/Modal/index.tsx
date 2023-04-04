import React, {useState} from 'react'
import ReactDOM from "react-dom";

const MODAL_STYLES:any = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 1000,
    width: "50%",
    height: "50%",
    borderRadius: "5px",
}

const OVERLAY_STYLES:any = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000,
 
}
export default function Modal({ open, children, onClose,title }:any) {
    if (!open) return null

    return ReactDOM.createPortal(
        <>
            <div style={OVERLAY_STYLES } />
            <div style={MODAL_STYLES}>
                <h4>{title}</h4>
                {/* <button onClick={onClose}>x</button> */}
                {children}
            </div>
        </>,
        document.getElementById('portal') as Element | DocumentFragment
    )


}
