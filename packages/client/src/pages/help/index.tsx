import { Box, Typography } from "@components/layout/mui-component";

function Help() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <Box sx={{ textAlign: "left" }}>
        <Typography variant="body1" paragraph>
          Discover the power of productivity with our versatile set of features.
          You can start using our website without the need to log in, but we
          recommend creating an account to leverage the full potential of our
          cloud-based services.
        </Typography>
        <Typography variant="h6" paragraph>
          - Task Management
        </Typography>
        <Typography variant="body1" paragraph>
          Seamlessly handle your tasks with the ability to view, add, edit, and
          delete them. Set specific reminder times and deadlines to stay on top
          of your commitments.
        </Typography>
        <Typography variant="h6" paragraph>
          - Note Management
        </Typography>
        <Typography variant="body1" paragraph>
          Elevate your note-taking experience with our online notepad.
          Synchronize your notes across multiple devices and easily upload files
          for a user-friendly experience.
        </Typography>
        <Typography variant="h6" paragraph>
          - Timer Functionality
        </Typography>
        <Typography variant="body1" paragraph>
          Efficiently manage your time with customizable timers. Set
          appointments and receive timely reminders to ensure you complete tasks
          within specified time limits.
        </Typography>
        <Typography variant="h6" paragraph>
          - Calendar Integration
        </Typography>
        <Typography variant="body1" paragraph>
          Stay organized by scheduling specific events on our calendar. Include
          event titles, start and end times, and receive reminders in advance.
        </Typography>
      </Box>
    </Box>
  );
}

export default Help;
