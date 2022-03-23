import React, { Fragment, useState } from 'react'
import { Form, Button, Alert, Modal } from 'react-bootstrap'
import { useFormik, FormikProvider } from 'formik';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import { createStock } from 'api/stocks'

function CreateStockForm({onStockCreate, stocksArr}) {

	const [showUniqueAlert, setShowUniqueAlert] = useState(false)

	const createStockMutation = useMutation(createStock, {
		onSuccess: () => {
			onStockCreate()
		},
	})

	const validateUnique = (stocksArr = [], symbol) => {
		if (stocksArr.some(item => item.symbol === symbol)) {
			return false
		}
		return true
	}

	const LoginSchema = Yup.object().shape({
		name: Yup.string()
			.min(4, 'Minimum 4 characters required')
			.required('Email is required'),
		symbol: Yup.string()
			.required('Symbol is required')
			.min(3, 'Minimum 3 characters required')
			.max(5, 'Minimum 5 characters allowed')
	});

	const formik = useFormik({
		initialValues: {
			name: '',
			symbol: ''
		},
		validationSchema: LoginSchema,
		onSubmit: (val) => {
			if (validateUnique(stocksArr, val.symbol)){
				createStockMutation.mutate(val)
				setShowUniqueAlert(false)
			}else{
				setShowUniqueAlert(true)
			}
		}
	});

	const { errors, touched, handleSubmit, getFieldProps } = formik;

	const setFormikCaps = ( fieldName, val) => {
		formik.setFieldValue(fieldName, val.toUpperCase())
	}

	return (
		<Fragment>
			<Modal.Header closeButton >
				<Modal.Title id="contained-modal-title-vcenter">
					Modal heading
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<FormikProvider value={formik}>

					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3">
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" name="name" {...getFieldProps('name')} placeholder="Enter name" />
							{touched.name && errors.name && <Alert variant='danger'>{errors.name} </Alert>}
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Symbol</Form.Label>
							<Form.Control type="symbol" {...getFieldProps('symbol')} value={formik.values.symbol} onChange={(evt)=>setFormikCaps('symbol', evt.target.value)} placeholder="symbol" />
							{touched.symbol && errors.symbol && <Alert variant='danger'>{errors.symbol} </Alert>}
							{showUniqueAlert && <Alert variant='danger'>Symbol must be unique</Alert>}
						</Form.Group>
					</Form>

				</FormikProvider>
			</Modal.Body>
			
			<Modal.Footer>
				<Button variant="primary" onClick={handleSubmit}>
					Submit
				</Button>
			</Modal.Footer>
		</Fragment>
	)
}

export default CreateStockForm