import React, { useState } from 'react'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query'
import { Table, Spinner, Button } from 'react-bootstrap'
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

import { fetchStocksItem } from 'api/stocks'
import ErrorFallback from 'components/request-error-fallback'
import StocksModal from 'components/stocks-modal'
import DeleteStockForm from 'components/delete-stock-form';
import { useNavigate } from 'react-router-dom'
import { updateUserStore } from 'actions/index'

function Details(props) {
	let { id } = useParams();
	const navigate = useNavigate()
	const { isLoading, isError, data } = useQuery('stocks-item', () => fetchStocksItem(id))
	const [isModalVisible, setIsModalVisible] = useState(false)

	const renderList = () => {

		if (isLoading) {
			return <Spinner animation="border" variant="info" />
		}

		if (data) {
			props.updateUserStore(data)
		}

		if (isError) {
			return <ErrorFallback errorText={'There has been an error fetching this stock'} />
		}

		if (!isLoading && !data?.data) {
			return <ErrorFallback isError={false} errorText={'No OHLCV data history found for this stock'} />
		}

		return (
			<Table striped bordered hover responsive variant="dark">
				<thead>
					<tr>
						<th>Date</th>
						<th>Open</th>
						<th>High</th>
						<th>Low</th>
						<th>Close</th>
						<th>Volume</th>
					</tr>
				</thead>
				<tbody>
					{data?.data?.map((item) => {
						return (
							<tr key={item.date}>
								<td>{moment(item.date).format('MMM DD YYYY')}</td>
								<td>{item.open}</td>
								<td>{item.high}</td>
								<td>{item.low}</td>
								<td>{item.close}</td>
								<td>{item.volume}</td>
							</tr>
						)
					})}
				</tbody>
			</Table>
		)
	}

	return (
		<div className='stocks-details'>

			<div className='button-container'>
				<Button variant={'primary'} onClick={() => navigate('/stocks')}>
					← Return to list
				</Button>

				<Button variant={'danger'} onClick={() => setIsModalVisible(true)}>
					Remove this stock
				</Button>
			</div>

			{renderList()}

			<StocksModal
				show={isModalVisible}
				handleClose={() => setIsModalVisible(false)}>
				<DeleteStockForm
					onStockDelete={() => {
						setIsModalVisible(false)
						navigate('/stocks')
						toast('Stock successfully removed')
					}}
					stockId={id}
				/>
			</StocksModal>

			<ToastContainer />

		</div>
	)
}

export default connect(null, { updateUserStore })(Details)