import { useDataProvider } from "@/hooks/useProvider";
import { displayToast } from "@/utils/toast";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@components/layout/mui-component";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, Navigate, useParams } from "react-router-dom";

interface IProfile {
  password: string;
  re_password: string;
  id: number | string;
}

function ResetPassword() {
  const params = useParams<{ id?: string }>();
  const id = params.id;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfile>();
  const provider = useDataProvider();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isValidated, setIsValidated] = useState<number>(0);
  const [userId, setUserId] = useState<number>();
  const handleGetValidation = async () => {
    if (!id) return;
    try {
      const resp = await provider.post({
        path: "users/who-am-i",
        body: { id: id },
      });
      if (resp.status === 200) {
        displayToast(resp.data.message, "success");
        console.log(resp.data);
        setUserId(resp.data.id);
        setIsValidated(1);
      } else {
        displayToast(resp.data, "error");
        setIsValidated(2);
      }
    } catch (error: any) {
      console.log(error.response.data.error);
      displayToast(error.response.data.error, "error");
      setIsValidated(2);
    }
  };
  const onSubmit: SubmitHandler<IProfile> = async (data) => {
    if (data.password !== data.re_password) {
      displayToast("Confirm password not matchs", "error");
      return;
    }
    setIsSubmitted(true);
    try {
      if (!userId) {
        displayToast(
          "Invalid account's credentials, please try again later!",
          "error"
        );
        setIsSubmitted(false);
        return;
      }
      data.id = userId;
      const resp = await provider.post({
        headers: {
          Authorization: `Bearer ${id}`,
        },
        path: "users/update-password",
        body: data,
      });
      if (resp.status === 200) {
        displayToast(resp.data.message, "success");
        <Navigate to={"/"} />;
      } else {
        displayToast(resp.data, "error");
      }
    } catch (error: any) {
      console.log(error.response);
      displayToast(error.response.data.error, "error");
    } finally {
      setIsSubmitted(false);
    }
  };
  useEffect(() => {
    console.log("RUNNING", id);
    handleGetValidation();
  }, []);
  return (
    <Box
      sx={{
        overflowX: "hidden",
      }}
    >
      {isValidated === 0 ? (
        <Container>
          <Box>
            <Typography variant="h3">Loading...</Typography>
          </Box>
        </Container>
      ) : isValidated === 1 ? (
        <Container>
          <Box>
            <Typography variant="h3">Reset Password</Typography>
          </Box>
          <form id="resetPass-form" onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                border: "1px solid #eee",
                marginTop: "2rem",
                padding: "2rem",
                position: "relative",
                borderRadius: "8px",
              }}
            >
              <Box>
                <TextField
                  label="Password"
                  fullWidth
                  type="password"
                  autoComplete=""
                  {...register("password", {
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
                  autoComplete=""
                  {...register("re_password", {})}
                />
                {errors.re_password && (
                  <Typography variant="body2" color="error">
                    {errors.re_password.message}
                  </Typography>
                )}
              </Box>
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitted}
                sx={{ marginTop: "2rem" }}
                type="submit"
              >
                Reset Password
              </Button>
            </Box>
          </form>
        </Container>
      ) : (
        <Container>
          <Box>
            <Typography variant="h3">
              Invalid Session, please go back to HomePage.
            </Typography>
            <Typography variant="body1" component={"div"}>
              <Link to="/">
                <Button>Go back to HomePage</Button>
              </Link>
            </Typography>
          </Box>
        </Container>
      )}
    </Box>
  );
}

export default ResetPassword;
