import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";

// react-redux
import { connect } from "react-redux";

// actions
import { SHOW_ALERT, STORE_USER } from "../../context/actions";

export const Home = ({ user, alert, storeUser }) => {
	const [questions, setQuestions] = useState([]);
	const navigate = useNavigate();
	const token = localStorage.getItem("token");

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
			console.log(data);
			await fetchQuestions();
		} catch (error) {
			console.log(error.response);
			alert("Please log in to your account first.");
			navigate("/");
		}
	};

	const fetchQuestions = async () => {
		try {
			const { data } = await axios.get(
				"https://evangadi-form.cyclic.app/api/question/all",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setQuestions(data);
		} catch (error) {
			alert("Please log in to your account first.");
			navigate("/");
		}
	};

	return (
		<>
			<Container className="py-5">
				<Row className="my-5">
					<Col sm={12} md={8}>
						<Link to="/ask">
							<Button>Ask Question</Button>
						</Link>
					</Col>
					<Col sm={12} md={4}>
						<h4>
							welcome : {"  "}
							<span className="text-secondary">{user}</span>
						</h4>
					</Col>
				</Row>
				<h3 className="my-5">Questions</h3>
				{/* map */}

				{questions?.map((el) => {
					return (
						<Link
							key={el.post_id}
							to={`/question/${el.post_id}`}
							className="text-decoration-none text-secondary"
						>
							<hr />
							<Row>
								<Col sm={12} md={3} xl={2}>
									<Row>
										<Col sm={12}>
											<i
												className="fa-solid fa-user-tie"
												style={{
													fontSize: "80px",
												}}
											></i>
										</Col>
										<Col sm={12}>
											<h6 className="my-3 text-secondary text-capitalize">
												{el.user_name}
											</h6>
										</Col>
									</Row>
								</Col>
								<Col xs={11} md={8} xl={9}>
									<h6>{el.question}</h6>
								</Col>
								<Col xs={1} md={1}>
									<i
										className="fa-solid fa-angle-right py-md-5"
										style={{
											fontSize: "30px",
										}}
									></i>
								</Col>
							</Row>
							<hr />
						</Link>
					);
				})}
			</Container>
		</>
	);
};

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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
