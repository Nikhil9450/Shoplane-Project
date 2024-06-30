import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import classes from './Login.module.css';
import ResetPassword from './ResetPassword'; // Import the ResetPassword component

const Signin = () => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showResetPassword, setShowResetPassword] = useState(false); // State to handle modal visibility

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(JSON.stringify(formData));
      setLoader(true);
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCred) => {
          setLoader(false);
          console.log("usercred------------->", userCred);
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
          setError(error.message); // Display the error message
        });
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <div>
              <Form.Label className={classes.label} htmlFor="email">Email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                aria-describedby="emailHelpBlock"
                size="sm"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <Form.Text className={classes.error_text} muted>{errors.email}</Form.Text>}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <Form.Label className={classes.label} htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                id="password"
                aria-describedby="passwordHelpBlock"
                size="sm"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <Form.Text className={classes.error_text} muted>{errors.password}</Form.Text>}
            </div>
          </Col>
        </Row>
        <Row>
          <Col className='d-flex justify-content-center'>
            <Button variant="primary" className={classes.signinbtn} size="sm" type="submit">
              {loader ? <Spinner animation="border" variant="light" /> : "Login"}
            </Button>
          </Col>
        </Row>
        {error && (
          <Row>
            <Col>
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            </Col>
          </Row>
        )}
        <Row>
          <Col className="d-flex justify-content-center">
            <Button variant="link" onClick={() => setShowResetPassword(true)}>
              Reset Password.
            </Button>
          </Col>
        </Row>
      </Form>
      <ResetPassword show={showResetPassword} handleClose={() => setShowResetPassword(false)} />
    </Container>
  );
};

export default Signin;
