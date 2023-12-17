import { useState } from "react";
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
import { useDispatch } from "react-redux";
import { useDataProvider } from "@/hooks/useProvider";

interface IProfile {
  username: string;
  password: string;
  email: string;
}

function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfile>();
  const dispatch = useDispatch();
  const provider = useDataProvider();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<IProfile> = async (data) => {
    setIsLoading(true);
    try {
      const resp = await provider.post({
        path: "users/update-profile",
        body: data,
      });

      if (resp.status === 200) {
        displayToast(resp.data.message, "success");
      } else {
        displayToast(resp.data, "error");
      }
    } catch (error: any) {
      console.log(error.response.data.error);
      displayToast(error.response.data.error, "error");
    } finally {
      setIsLoading(false);
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
          <Typography variant="h3">Profile</Typography>
        </Box>
        <form id="profile-form" onSubmit={handleSubmit(onSubmit)}>
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
            <Box id="profile-response" sx={{ marginBottom: "20px" }}></Box>
            <Button
              variant="contained"
              color="primary"
              disabled={isLoading}
              type="submit"
            >
              Update Profile
            </Button>
            <Typography variant="body1" sx={{ marginTop: "5px" }}>
              <Link
                href="/logout"
                style={{ textDecoration: "under", color: "black" }}
              >
                <Button variant="text">Logout</Button>
              </Link>
            </Typography>
          </Box>
        </form>
      </Container>
    </Box>
  );
}

export default Profile;
