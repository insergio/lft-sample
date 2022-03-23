import React from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'

function Login() {

	const navigate = useNavigate()

	const LoginSchema = Yup.object().shape({
		email: Yup.string().email('Email must be a valid email address').required('Email is required'),
		password: Yup.string().required('Password is required')
	});

	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: LoginSchema,
		onSubmit: () => {
			navigate('/stocks')
		}
	});

	const { errors, touched, handleSubmit, getFieldProps } = formik;

	return (
		<div className='login-container'>
			<FormikProvider value={formik}>

				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="text" name="email" {...getFieldProps('email')} placeholder="Enter email" />
						{touched.email && errors.email && <Alert variant='danger'>{errors.email} </Alert>}
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" {...getFieldProps('password')} placeholder="Password" />
						{errors.password && formik.submitCount && <Alert variant='danger'>{errors.password} </Alert>}
					</Form.Group>

					<div className='button-container'>
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</div>
				</Form>
			</FormikProvider>
		</div>
	)
}

export default Login