import {
  Box,
  Button,
  Grid,
  Typography,
} from "@components/layout/mui-component";
import { notes } from "@/constants";
import { useEffect, useState } from "react";
import { TNote } from "@/types";
function Notes() {
  const [content, setContent] = useState<string>("");
  const [note, setNote] = useState<TNote | null>(null);
  const handleTextareaChange = (event: any) => {
    setContent(event.target.value);
  };
  useEffect(() => {
    if (note) setContent(note.content);
  }, [note]);
  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid item xs={3} sx={{ height: "100%" }}>
        <Box
          sx={{
            borderRight: "3px solid #eee",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              paddingLeft: 2,
              paddingRight: 4,
              paddingBottom: 2,
              borderBottom: "2px solid #eee",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", flexGrow: 1, display: "inline-block" }}
            >
              NOTES
            </Typography>
            <Button variant="contained">ADD </Button>
          </Box>
          <Box sx={{ overflow: "auto", width: "100%", height: "95%" }}>
            {notes.map((element) => (
              <Box
                key={element.id}
                onClick={() => {
                  setNote(element);
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 2,
                  paddingRight: 4,
                  paddingBottom: 2,
                  paddingTop: 2,
                  overflow: "hidden",
                  borderBottom: "2px solid gray",
                }}
              >
                <Typography
                  variant="inherit"
                  sx={{
                    fontWeight: "bold",
                    flexGrow: 1,
                    display: "inline-block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {element.name}
                </Typography>
                <Button
                  variant="text"
                  sx={{
                    bgcolor: "#D63214",
                    color: "white",
                    "&:hover": {
                      bgcolor: "tomato",
                    },
                  }}
                >
                  Delete
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={9} sx={{ height: "100%", pl: 2 }}>
        <Box sx={{ height: "100%" }}>
          <textarea
            style={{
              minHeight: "70vh",
              maxHeight: "100%",
              width: "100%",
            }}
            onChange={handleTextareaChange}
            value={content}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Notes;
