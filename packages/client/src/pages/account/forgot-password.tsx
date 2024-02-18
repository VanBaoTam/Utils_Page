import { useDataProvider } from "@/hooks/useProvider";
import { displayToast } from "@/utils/toast";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@components/layout/mui-component";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import emailjs from "emailjs-com";
type TEmail = {
  email: string;
};
function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TEmail>();
  const provider = useDataProvider();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const onSubmit: SubmitHandler<TEmail> = async (data) => {
    setIsSubmitted(true);
    try {
      const resp = await provider.post({
        path: "users/forgot-password",
        body: data,
      });
      if (resp.status === 200) {
        displayToast(resp.data.message, "success");
        handleSendMail(resp.data.emailParams);
      } else {
        displayToast(resp.data, "error");
        setIsSubmitted(false);
      }
    } catch (error: any) {
      console.log(error.response.data.error);
      displayToast(error.response.data.error, "error");
      setIsSubmitted(false);
    }
  };
  const handleSendMail = async (emailParams: any) => {
    await emailjs.send(
      "service_30v0ikz",
      "template_fi2wf3k",
      emailParams,
      "il9QG9B7XFL3sfpV0"
    );
  };
  return (
    <Box
      sx={{
        overflowX: "hidden",
      }}
    >
      <Container>
        <Box>
          <Typography variant="h3">Forgot Password</Typography>
        </Box>
        <form id="forgotPass-form" onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              border: "1px solid #eee",
              marginTop: "2rem",
              padding: "2rem",
              position: "relative",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body1" component="div">
              Type your email below and submit to get an email for password
              reset instruction.
            </Typography>
            <Box sx={{ marginBottom: "20px" }}>
              <TextField
                label="Email"
                fullWidth
                type="text"
                margin="normal"
                {...register("email", {
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
              {errors.email && (
                <Typography variant="body2" color="error">
                  {errors.email.message}
                </Typography>
              )}
            </Box>

            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitted}
              type="submit"
            >
              Forgot Password
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
}

export default ForgotPassword;
