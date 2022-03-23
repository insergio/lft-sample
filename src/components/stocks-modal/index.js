import React from 'react'
import { Modal, Button } from 'react-bootstrap'

function StocksModal(props) {
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			onHide={props.handleClose}
		>
			{props.children}
		</Modal>
	)
}

export default StocksModal