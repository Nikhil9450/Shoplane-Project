import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

const ResetPassword = ({ show, handleClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        setSuccess('Password reset email sent successfully.');
        setError('');
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
        setSuccess('');
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="resetEmail">
            <Form.Label>Please provide registered email id to reset password.</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          {success && <Alert variant="success" className="mt-3">{success}</Alert>}
          <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Send Reset Email'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ResetPassword;
