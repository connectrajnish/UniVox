import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useUser } from './shared/UserContext';

const API_URL = process.env.API_URL;

export default function LoginCard() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };

  const { dispatch, state } = useUser();

  const navigate = useNavigate();
  
  // if(state && state.isAuthenticated) navigate(`profile/${state.user.userName}`);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/user/sign-in`, formData, {withCredentials: true});

      if (response.status === 200) {
        const { user } = response.data;

        // Dispatch a 'LOGIN' action to update user data and authentication state
        dispatch({ type: 'LOGIN', user });

        navigate("/");
      } else if (response.status === 400) {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("An error occurred");
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-20">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            <Input
              type="email"
              label="Email"
              name="email"
              size="lg"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label="Password"
              name="password"
              size="lg"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="-ml-2.5">
              <Checkbox
                label="Remember Me"
                checked={rememberMe}
                onChange={handleCheckboxChange}
              />
            </div>
            <Button variant="gradient" fullWidth type="submit">
              Sign In
            </Button>
          </CardBody>
        </form>
        <CardFooter className="pt-0">
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Link to="/signup">
              <Typography
                as="a"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Sign up
              </Typography>
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}
