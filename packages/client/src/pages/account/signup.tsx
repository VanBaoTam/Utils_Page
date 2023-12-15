import { useForm, SubmitHandler } from "react-hook-form";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Link,
} from "@components/layout/mui-component";
import { displayToast } from "@/utils/toast";
import { ISignUp } from "@/types";
import { useDataProvider } from "@/hooks/useProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUp() {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>();
  const navigate = useNavigate();
  const provider = useDataProvider();

  const onSubmit: SubmitHandler<ISignUp> = async (data) => {
    setIsloading(true);
    try {
      const resp = await provider.post({ path: "users/sign-up", body: data });
      if (resp.status === 200) {
        displayToast(resp.data, "success");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        setIsloading(false);
      } else {
        displayToast(resp.data, "error");
        setIsloading(false);
      }
    } catch (error: any) {
      console.log(error.response.data.error);
      displayToast(error.response.data.error, "error");
      setIsloading(false);
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
          <Typography variant="h3">Sign Up</Typography>
        </Box>
        <form id="signup-form" onSubmit={handleSubmit(onSubmit)}>
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
                    value: 4,
                    message: "Username too short",
                  },
                  maxLength: {
                    value: 30,
                    message: "Username too long",
                  },
                })}
              />
              {errors.username && (
                <Typography variant="body2" color="error">
                  {errors.username.message}
                </Typography>
              )}
            </Box>
            <Box sx={{ marginBottom: "20px" }}>
              <TextField
                label="Name"
                fullWidth
                type="text"
                required
                margin="normal"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 4,
                    message: "Name is too short",
                  },
                  maxLength: {
                    value: 50,
                    message: "Name is too long",
                  },
                })}
              />
              {errors.name && (
                <Typography variant="body2" color="error">
                  {errors.name.message}
                </Typography>
              )}
            </Box>
            <Box sx={{ marginBottom: "20px" }}>
              <TextField
                label="Email"
                fullWidth
                type="email"
                required
                margin="normal"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <Typography variant="body2" color="error">
                  {errors.email.message}
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
                    message: "Password is too short",
                  },
                  maxLength: {
                    value: 50,
                    message: "Password is too long",
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
            <Button
              variant="contained"
              color="primary"
              disabled={isLoading}
              type="submit"
            >
              Sign Up
            </Button>
            <Typography
              variant="body1"
              sx={{
                marginTop: "5px",
                marginLeft: "3rem",
                display: "inline-block",
              }}
            >
              <Link
                href="/login"
                style={{
                  textDecoration: "under",

                  color: "black",
                }}
              >
                <Button variant="text">Login</Button>
              </Link>
            </Typography>
          </Box>
        </form>
      </Container>
    </Box>
  );
}

export default SignUp;
