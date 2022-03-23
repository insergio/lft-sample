import React from 'react'

function ErrorFallback({errorText, isError=true}) {
	return (
		<div className='request-error'>
			{isError && <h3>Oops!</h3>}
			<p>
				{errorText}
			</p>
		</div>
	)
}

export default ErrorFallback