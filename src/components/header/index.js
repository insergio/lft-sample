import React from 'react'
import { connect } from 'react-redux';
import { Navbar, Container } from 'react-bootstrap'
import { useLocation } from "react-router-dom";

import stockPic from 'assets/stock.svg'

function Header({stock}) {

	const { pathname } = useLocation();

	const renderStock = () => {
		if(pathname.includes('/details/')){
			return stock && <p className='header-bar__stock'>{stock.name} | <span>${stock.symbol}</span></p>
		}
	}

	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="/stocks" className='header-bar'>
					<img
						alt=""
						src={stockPic}
						width="30"
						height="30"
						className="d-inline-block align-top"
					/>{' '}
					Linear<span>FT</span> test project
					{renderStock()}
				</Navbar.Brand>
			</Container>
		</Navbar>
	)
}

function mapStateToProps(state) {
	return {
		stock: state.stock
	};
}


export default connect(mapStateToProps, null)(Header)
