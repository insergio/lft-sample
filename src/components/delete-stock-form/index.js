import React, { Fragment } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useMutation } from 'react-query';
import { deleteStock } from 'api/stocks'

function DeleteStockForm({ onStockDelete, stockId }) {

	const deleteStockMutation = useMutation(deleteStock, {
		onSuccess: () => {
			onStockDelete()
		},
	})

	return (
		<Fragment>
			<Modal.Header closeButton >
				<Modal.Title id="contained-modal-title-vcenter">
					Delete stock
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				Are you sure you want to delete this stock?
			</Modal.Body>

			<Modal.Footer>
				<Button variant="primary" onClick={() => deleteStockMutation.mutate(stockId)}>
					Submit
				</Button>
			</Modal.Footer>
		</Fragment>
	)
}

export default DeleteStockForm