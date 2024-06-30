import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classes from './Login.module.css';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../../firebase';
import Spinner from 'react-bootstrap/Spinner';

const Signup = (props) => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    state: '',
    city: '',
    pincode: '',
    mobileno: '',
    fax: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const stateData=props.data;

  useEffect(() => {
    // Set state options on component mount
    setStateOptions(stateData.map(state => ({
      value: state.name,
      label: state.name
    })));
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // If state changes, update city options
    if (id === 'state') {
      const selectedState = stateData.find(state => state.name === value);
      if (selectedState) {
        setCityOptions(selectedState.cities.map(city => ({
          value: city,
          label: city
        })));
      } else {
        setCityOptions([]);
      }
    }
  };

  const validate = () => {
    let newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  
    if (!formData.firstName) newErrors.firstName = 'Please enter a valid first name.';
    if (!formData.lastName) newErrors.lastName = 'Last name is required.';
    if (!formData.email) {
      newErrors.email = 'Please enter a valid email.';
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }
    if (!formData.address) newErrors.address = 'Please enter a valid address.';
    if (!formData.state) newErrors.state = 'Please select your state.';
    if (!formData.city) newErrors.city = 'Please select your city.';
    if (!formData.pincode) newErrors.pincode = 'Please enter a valid pincode.';
    if (!formData.mobileno) newErrors.mobileno = 'Mobile number is required.';
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (!passwordPattern.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long, contain at least one number, one uppercase letter, and one lowercase letter.';
    }
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoader(true);
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCred) => {
          setLoader(false);
          console.log("usercred------------->", userCred);
          return updateProfile(userCred.user, {
            displayName: formData.name
          });
        })
        .then(() => {
          console.log("Profile updated successfully");
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
          setError(error.message);
        })
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <input type="radio" id="Individual" name="type" value="HTML" checked/>
            <label for="html">Individual</label>
          </Col>
          <Col>
            <input type="radio" id="Enterpise" name="type" value="CSS"/>
            <label for="css">Enterpise</label>
          </Col>
          <Col>
            <input type="radio" id="Government" name="type" value="JavaScript"/>
            <label for="javascript">Government</label>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <Form.Label aria-required className={classes.label} htmlFor="firstName">First Name<span aria-hidden="true">*</span></Form.Label>
              <Form.Control
                type="text"
                id="firstName"
                aria-describedby="firstNameHelpBlock"
                placeholder='First Name'
                size="sm"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <Form.Text className={classes.error_text} muted>{errors.firstName}</Form.Text>}
            </div>
          </Col>
          <Col>
            <div>
            <Form.Label className={`${classes.label} ${classes.required}`} htmlFor="lastName">Last Name<span aria-hidden="true">*</span></Form.Label>

              {/* <Form.Label aria-required className={classes.label} htmlFor="lastName">Last Name</Form.Label> */}
              <Form.Control
                type="text"
                id="lastName"
                aria-describedby="lastNameHelpBlock"
                placeholder='Last Name'
                size="sm"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <Form.Text className={classes.error_text} muted>{errors.lastName}</Form.Text>}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <Form.Label aria-required className={classes.label} htmlFor="signupemail">Email<span aria-hidden="true">*</span></Form.Label>
              <Form.Control
                type="email"
                id="email"
                aria-describedby="emailHelpBlock"
                placeholder='Email'
                size="sm"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <Form.Text className={classes.error_text} muted>{errors.email}</Form.Text>}
            </div>
          </Col>
          <Col>
            <div>
              <Form.Label aria-required className={classes.label} htmlFor="address">Address<span aria-hidden="true">*</span></Form.Label>
              <Form.Control
                type="text"
                id="address"
                aria-describedby="AddressHelpBlock"
                placeholder='Address'
                size="sm"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <Form.Text className={classes.error_text} muted>{errors.address}</Form.Text>}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <Form.Label aria-required className={classes.label} htmlFor="state">Select state<span aria-hidden="true">*</span></Form.Label>
              <Form.Select
                id="state"
                size="sm"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="">Please select your state</option>
                {stateOptions.map((option, index) => (
                  <option key={index} value={option.value}>{option.label}</option>
                ))}
              </Form.Select>
              {errors.state && <Form.Text className={classes.error_text} muted>{errors.state}</Form.Text>}
            </div>
          </Col>
          <Col>
            <div>
              <Form.Label aria-required className={classes.label} htmlFor="city">Select City<span aria-hidden="true">*</span></Form.Label>
              <Form.Select
                id="city"
                size="sm"
                value={formData.city}
                onChange={handleChange}
              >
                <option value="">Please select your city</option>
                {cityOptions.map((option, index) => (
                  <option key={index} value={option.value}>{option.label}</option>
                ))}
              </Form.Select>
              {errors.city && <Form.Text className={classes.error_text} muted>{errors.city}</Form.Text>}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <Form.Label aria-required className={classes.label} htmlFor="pincode">PinCode<span aria-hidden="true">*</span></Form.Label>
              <Form.Control
                type="number"
                id="pincode"
                aria-describedby="pincodeHelpBlock"
                placeholder='ex: 110042'
                size="sm"
                value={formData.pincode}
                onChange={handleChange}
              />
              {errors.pincode && <Form.Text className={classes.error_text} muted>{errors.pincode}</Form.Text>}
            </div>
          </Col>
          <Col>
            <div>
              <Form.Label aria-required className={classes.label} htmlFor="mobileno">Mobile No.<span aria-hidden="true">*</span></Form.Label>
              <Form.Control
                type="number"
                id="mobileno"
                aria-describedby="MobilenoHelpBlock"
                placeholder='Mobile number'
                size="sm"
                value={formData.mobileno}
                onChange={handleChange}
              />
              {errors.mobileno && <Form.Text className={classes.error_text} muted>{errors.mobileno}</Form.Text>}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <Form.Label aria-required className={classes.label} htmlFor="fax">Fax<span aria-hidden="true">*</span></Form.Label>
              <Form.Control
                type="number"
                id="fax"
                aria-describedby="faxHelpBlock"
                size="sm"
                placeholder='011-55541234'
                value={formData.fax}
                onChange={handleChange}
              />
            </div>
          </Col>
          <Col>
            <div>
              <Form.Label aria-required className={classes.label} htmlFor="phone">Phone<span aria-hidden="true">*</span></Form.Label>
              <Form.Control
                type="number"
                id="phone"
                aria-describedby="PhoneHelpBlock"
                size="sm"
                placeholder='011-55541234'
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <Form.Label aria-required className={classes.label} htmlFor="password">Password<span aria-hidden="true">*</span></Form.Label>
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
          <Col>
            <div>
              <Form.Label aria-required className={classes.label} htmlFor="confirmPassword">Confirm Password<span aria-hidden="true">*</span></Form.Label>
              <Form.Control
                type="password"
                id="confirmPassword"
                aria-describedby="confirmpasswordHelpBlock"
                size="sm"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <Form.Text className={classes.error_text} muted>{errors.confirmPassword}</Form.Text>}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" size="sm" type="submit" className={classes.signupbtn}>{((loader) ? <Spinner animation="border" variant="light" /> : "Signup")}</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Signup;
