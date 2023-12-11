import { useForm, SubmitHandler } from "react-hook-form";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Link,
} from "@components/layout/mui-component";
import { ILogin } from "@/types";
import { accountList } from "@/constants";
import { displayToast } from "@/utils/toast";
import { useDispatch } from "react-redux";
import { login } from "@/slices/account";

import { useNavigate } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<ILogin> = (data) => {
    if (!data.username || !data.password) {
      displayToast("Invalid credentials !", "error");
    } else {
      const account = accountList.find(
        (item) =>
          item.username === data.username && item.password === data.password
      );

      if (account) {
        displayToast("Login succesfully!", "success");
        setTimeout(() => {
          dispatch(login({ username: data.username, password: "" }));
          navigate("/");
        }, 3500);
      } else {
        displayToast("User not found !", "error");
      }
    }
  };

  return (
    <Box
      sx={{
        overflowX: "hidden",
      }}
    >
      <Container>
        <Box>
          <Typography variant="h3">Login</Typography>
        </Box>
        <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              border: "1px solid #eee",
              marginTop: "2rem",
              padding: "2rem",
              position: "relative",
              borderRadius: "8px",
            }}
          >
            <Box sx={{ marginBottom: "20px" }}>
              <TextField
                label="Username"
                fullWidth
                type="text"
                required
                margin="normal"
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Invalid Username",
                  },
                  maxLength: {
                    value: 30,
                    message: "Invalid Username",
                  },
                })}
              />
              {errors.username && (
                <Typography variant="body2" color="error">
                  {errors.username.message}
                </Typography>
              )}
            </Box>
            <Box>
              <TextField
                label="Password"
                fullWidth
                type="password"
                required
                autoComplete=""
                margin="normal"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Invalid Password",
                  },
                  maxLength: {
                    value: 50,
                    message: "Invalid Password",
                  },
                })}
              />
              {errors.password && (
                <Typography variant="body2" color="error">
                  {errors.password.message}
                </Typography>
              )}
            </Box>
            <br />
            <Box id="login-response" sx={{ marginBottom: "20px" }}></Box>
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
            <Typography variant="body1" sx={{ marginTop: "5px" }}>
              <Link
                href="/signup"
                style={{ textDecoration: "under", color: "black" }}
              >
                <Button variant="text">Sign Up</Button>
              </Link>
              <Link
                href="/forgot-password"
                style={{
                  textDecoration: "none",
                  color: "black",
                  marginLeft: 10,
                }}
              >
                <Button variant="text">Forgot Password</Button>
              </Link>
            </Typography>
          </Box>
        </form>
      </Container>
    </Box>
  );
}

export default Login;
