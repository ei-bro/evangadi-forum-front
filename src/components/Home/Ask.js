import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";

// react-redux
import { connect } from "react-redux";

// actions
import { SHOW_ALERT, STORE_USER } from "../../context/actions";

function Ask({ storeUser, alert }) {
	const token = localStorage.getItem("token");

	const titleDom = useRef();
	const descDom = useRef();

	const navigate = useNavigate();

	useEffect(() => {
		if (token) {
			checkLogedIn();
		} else {
			navigate("/");
		}
	}, []);

	const checkLogedIn = async () => {
		try {
			const { data } = await axios.get(
				"https://evangadi-form.cyclic.app/api/user/current",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			storeUser(data.user);
		} catch (error) {
			console.log(error.message);
			alert("Please log in to your account first.");
			navigate("/");
		}
	};

	const postQuestion = async (e) => {
		e.preventDefault();
		try {
			await axios.post(
				`https://evangadi-form.cyclic.app/api/question/post`,
				{
					question: titleDom.current.value,
					questionDescription: descDom.current.value,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			titleDom.current.value = "";
			descDom.current.value = "";

			setTimeout(() => {
				navigate("/dashboard");
			}, 1300);
		} catch (error) {
			console.log(error.response);
		}
	};

	return (
		<>
			<Container className="my-5">
				<h3 className="text-center my-4 underline">
					Steps to write a good Question
				</h3>
				<ul
					style={{
						width: "50%",
						margin: "0 auto",
						marginBottom: "60px",
						lineHeight: "30px",
					}}
				>
					<li>Summerize your problems in a one-line-title.</li>
					<li>Describe your problem in more detail.</li>
					<li>
						Describe what you tried and what you expected to happen.
					</li>
					<li>Review your question and post it to site.</li>
				</ul>

				<h4 className="text-center my-2 underline">
					Ask a public question
				</h4>
				<div className="shadow-sm py-3 px-5">
					<Form onSubmit={postQuestion}>
						<Form.Control
							ref={titleDom}
							type="text"
							placeholder="Title"
							className="my-3"
						/>
						<Form.Control
							ref={descDom}
							as="textarea"
							rows="4"
							placeholder="Question Description ..."
						></Form.Control>
						<Button type="submit" className="mt-4">
							Post Your Question
						</Button>
					</Form>
				</div>
			</Container>
		</>
	);
}

const mapStateToProps = (state) => {
	const { user } = state;
	return { user };
};

const mapDispatchToProps = (dispatch) => {
	return {
		storeUser: (person) => dispatch({ type: STORE_USER, payload: person }),

		alert: (msg) =>
			dispatch({
				type: SHOW_ALERT,
				payload: msg,
			}),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Ask);
