import React, { useState } from 'react'
import { Table, Spinner, Button } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

import { fetchStocksList } from 'api/stocks'
import ErrorFallback from '../request-error-fallback'
import StocksModal from '../stocks-modal'
import CreateStockForm from '../create-stock-form'

function StocksList() {

	const navigate = useNavigate()
	const [isModalVisible, setIsModalVisible] = useState(false)
	const { isLoading, isError, data, refetch } = useQuery('stocks-list', fetchStocksList)

	const renderList = () => {

		if (isLoading) {
			return <Spinner animation="border" variant="info" />
		}

		if (isError) {
			return <ErrorFallback errorText={'There has been an error connecting to the server'}/>
		}

		return (
			<Table striped bordered hover responsive variant="dark">
				<thead>
					<tr>
						<th>Stock name</th>
						<th>Symbol</th>
					</tr>
				</thead>
				<tbody>
					{data?.map((item) => {
						return (
							<tr key={item.id} onClick={() => navigate(`/stocks/details/${item.id}`)}>
								<td>{item.name}</td>
								<td colSpan={2}>${item.symbol}</td>
							</tr>
						)
					})}
				</tbody>
			</Table>
		)
	}

	return (
		<div className='stocks-list'>

			<div className='button-container'>
				<h1>Stocks List</h1>
				<Button className='add-button' onClick={() => setIsModalVisible(true)}>
					Add a new stock
				</Button>
			</div>

			{renderList()}

			<StocksModal
				show={isModalVisible}
				handleClose={() => setIsModalVisible(false)}>
				<CreateStockForm
					onStockCreate={() => {
						refetch(); 
						setIsModalVisible(false)
						toast('Stock created')
					}}
					stocksArr={data}
				/>
			</StocksModal>

			<ToastContainer />
		</div>
	)
}

export default StocksList