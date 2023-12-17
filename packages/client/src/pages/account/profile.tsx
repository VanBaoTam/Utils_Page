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
  name: string;
  password: string;
  re_password: string;
}

function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfile>();
  const provider = useDataProvider();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<IProfile> = async (data) => {
    if (data.password !== data.re_password) {
      displayToast("Confirm password not matchs", "error");
      return;
    }
    setIsLoading(true);
    try {
      const token = sessionStorage.getItem("Bearer");
      if (!token) {
        displayToast(
          "Invalid account's credentials, please log in again!",
          "error"
        );
        setIsLoading(false);
        return;
      }
      const resp = await provider.post({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        path: "users/change-profile",
        body: data,
      });
      if (resp.status === 200) {
        displayToast(resp.data.message, "success");
      } else {
        displayToast(resp.data, "error");
      }
    } catch (error: any) {
      console.log(error.response);
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
          <Typography variant="h3">Change Profile</Typography>
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
            <Box>
              <TextField
                label="Password"
                fullWidth
                type="password"
                required
                autoComplete=""
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
            <Box>
              <TextField
                label="Confirm password"
                fullWidth
                type="password"
                required
                autoComplete=""
                {...register("re_password", {
                  required: "Confirm password is required",
                })}
              />
              {errors.re_password && (
                <Typography variant="body2" color="error">
                  {errors.re_password.message}
                </Typography>
              )}
            </Box>
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
