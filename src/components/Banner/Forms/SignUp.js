import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// react-redux
import { connect } from "react-redux";

// actions
import {
	TOGGLE_SIGNIN,
	TOGGLE_PASSWORD,
	SHOW_ALERT,
	STORE_USER,
} from "../../../context/actions";

function SignUp({ toggle, toggle_password, password, alert, storeUser }) {
	const navigate = useNavigate();

	const emailDom = useRef();
	const passDom = useRef();
	const fNameDom = useRef();
	const lNameDom = useRef();
	const uNameDom = useRef();

	const register = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(
				"https://evangadi-form.cyclic.app/api/user/register",
				{
					userName: uNameDom.current.value,
					firstName: fNameDom.current.value,
					lastName: lNameDom.current.value,
					email: emailDom.current.value,
					password: passDom.current.value,
				}
			);
			storeUser(data.userName);
			localStorage.setItem("token", data.token);

			setTimeout(() => {
				navigate("/dashboard");
			}, 1000);
		} catch ({ response: { data } }) {
			alert(data.msg);
		}
	};

	return (
		<>
			<Form onSubmit={register}>
				<div className="py-4 text-center px-md-1 px-sm-3 mx-md-3">
					<h5>Join the network</h5>
					<p>
						Already have an account?{" "}
						<span
							onClick={() => {
								toggle();
							}}
							style={{
								color: "orange",
								cursor: "pointer",
							}}
						>
							Sign in
						</span>
					</p>
					<div className="px-xl-4 ">
						<Row>
							<Col sm={12} className="my-2">
								<Form.Control
									ref={emailDom}
									type="email"
									placeholder="Email address"
								/>
							</Col>
							<Col sm={12} className="my-2">
								<Form.Control
									ref={uNameDom}
									type="text"
									placeholder="User name"
								/>
							</Col>
							<Col sm={12} md={6} className="my-2">
								<Form.Control
									ref={fNameDom}
									type="text"
									placeholder="First name"
								/>
							</Col>
							<Col sm={12} md={6} className="my-2">
								<Form.Control
									ref={lNameDom}
									type="text"
									placeholder="Last name"
								/>
							</Col>
							<Col sm={12} className="my-2 position-relative">
								<Form.Control
									ref={passDom}
									type={password ? "text" : "password"}
									placeholder="Password"
								/>
								<i
									className={
										password
											? "fa fa-eye-slash"
											: "fa fa-eye"
									}
									onClick={() => {
										toggle_password();
									}}
									style={{
										position: "absolute",
										right: "5%",
										top: "30%",
										color: "gray",
										opacity: "0.3",
										cursor: "pointer",
									}}
								></i>
							</Col>
							<Col
								sm={12}
								className="px-4 d-flex justify-content-center text-center"
							>
								<small>
									I agree to the{" "}
									<a href=""> privacy policy</a> and{" "}
									<a href=""> terms of service.</a>
								</small>
							</Col>
							<Col sm={12}>
								<Button
									type="submit"
									variant="primary my-4 w-75"
								>
									Agree and Join
								</Button>
							</Col>
						</Row>
					</div>
				</div>
			</Form>
		</>
	);
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		storeUser: (person) => dispatch({ type: STORE_USER, payload: person }),
		toggle: () => dispatch({ type: TOGGLE_SIGNIN }),
		toggle_password: () => dispatch({ type: TOGGLE_PASSWORD }),
		alert: (msg) =>
			dispatch({
				type: SHOW_ALERT,
				payload: msg,
			}),
	};
};
const mapStateToProps = (state) => {
	const { password } = state;
	return { password };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
