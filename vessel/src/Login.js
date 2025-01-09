import React, { useState } from 'react';
import styled from 'styled-components';
import { FaIdBadge, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 86vh;
  background: #f0f2f5;
  padding: 1rem;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  max-width: 350px;
  max-height: 80vh;
  width: 100%;
`;

const Title = styled.h2`
  color: #333;
  font-weight: 700;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  text-align: center;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0.75rem 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.5rem;
  background-color: #f9f9f9;
`;

const Icon = styled.div`
  margin-right: 0.5rem;
  color: #888;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: none;
  outline: none;
  font-size: 1rem;
  background: none;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: #004085;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 8px 20px rgba(24, 90, 157, 0.3);
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: none;
  }
`;

const LoginText = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-top: 1rem;
`;

const LoginBody = styled.div`
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100%;
`;

export default function Login() {
  const [loginData, setLoginData] = useState({
    employeeId: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate for programmatic navigation

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginPayload = {
      EmpCode: parseInt(loginData.employeeId, 10),
      Password: loginData.password,
    };

    try {
      const response = await fetch('http://localhost:5009/vesseldata/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginPayload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful", data);
        localStorage.setItem('authToken', data.employeeId); // Store the token or ID in localStorage
        navigate('/MainContent'); // Use navigate to redirect to MainContent
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
        setErrorMessage(errorData.message); // Set error message to display
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An unexpected error occurred."); // Set a generic error message
    }
  };

  return (
    <LoginBody>
      <LoginContainer>
        <FormContainer onSubmit={handleSubmit}>
          <Title>Login</Title>
          <LoginText>
            New User? <a href="/signup">Register</a>.
          </LoginText>

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          <InputWrapper>
            <Icon>
              <FaIdBadge />
            </Icon>
            <Input
              name="employeeId"
              onChange={handleChange}
              value={loginData.employeeId}
              placeholder="Name"
              required
            />
          </InputWrapper>

          <InputWrapper>
            <Icon>
              <FaLock />
            </Icon>
            <Input
              type="password"
              name="password"
              onChange={handleChange}
              value={loginData.password}
              placeholder="Password"
              required
            />
          </InputWrapper>

          <Button type="submit">Login</Button>

          <LoginText>
            Forgot your password? <a href="/reset">Reset it here</a>.
          </LoginText>
        </FormContainer>
      </LoginContainer>
    </LoginBody>
  );
}
