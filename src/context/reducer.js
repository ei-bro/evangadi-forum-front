import {
	TOGGLE_SIGNUP,
	TOGGLE_SIGNIN,
	TOGGLE_PASSWORD,
	SHOW_ALERT,
	STORE_USER,
	REMOVE_USER,
} from "./actions";

const reducer = (state, { type, payload }) => {
	switch (type) {
		case STORE_USER:
			return { ...state, user: payload };
		case REMOVE_USER:
			return { ...state, user: "" };
		case SHOW_ALERT:
			return { ...state, alert: payload };
		case TOGGLE_SIGNUP:
			return { ...state, signup: true };
		case TOGGLE_SIGNIN:
			return { ...state, signup: false };
		case TOGGLE_PASSWORD:
			let temp = false;
			if (state.password) {
				temp = false;
			} else {
				temp = true;
			}
			return { ...state, password: temp };
		default:
			return state;
	}
};

export default reducer;
