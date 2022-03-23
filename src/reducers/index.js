const INITIAL_STATE = {
	action: {}
};

export default function stockReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'UPDATE_CURRENT_STOCK':
			return {
				stock: action.payload
			};
		default:
			return state;
	}
}
