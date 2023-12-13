import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@components/layout/mui-component";
import { useEffect, useState } from "react";
import { TNote } from "@/types";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { createNote, deleteNote, updateNote } from "@/slices/note";
function Notes() {
  const [content, setContent] = useState<string>("");
  const [name, setName] = useState<string>("");
  const noteSelector = useAppSelector((store) => store.note);
  const dispatch = useAppDispatch();
  const [note, setNote] = useState<TNote | undefined>(undefined);
  const handleTextareaChange = (event: any) => {
    setContent(event.target.value);
  };
  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };
  const handleCreateNote = () => {
    const newNote: TNote = {
      id: noteSelector.length + 1,
      user_id: 1,
      updated_date: new Date(),
      status: 1,
      content: "",
      name: "Untitled",
    };
    dispatch(createNote(newNote));
    setNote(newNote);
  };
  const handleUpdateNote = () => {
    const newNote: TNote = {
      id: note?.id || 1,
      user_id: note?.user_id || 1,
      updated_date: new Date(),
      status: 1,
      content,
      name,
    };
    dispatch(updateNote(newNote));
  };
  const handleDeleteNote = (id: number) => {
    if (note && note.id === id) {
      setNote(undefined);
    }
    dispatch(deleteNote(id));
  };
  useEffect(() => {
    console.log(note);
    if (note) {
      setContent(note?.content || "");
      setName(note?.name || "Untitled");
    }
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
              marginLeft: 1,
              paddingRight: 4,
              paddingBottom: 2,
              borderBottom: "2px solid #eee",
              borderRight: "0",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", flexGrow: 1, display: "inline-block" }}
            >
              NOTES
            </Typography>
            <Button variant="contained" onClick={handleCreateNote}>
              ADD
            </Button>
          </Box>
          <Box
            sx={{
              height: "100%",
            }}
          >
            {noteSelector.length > 0
              ? noteSelector.map((element) => (
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
                      onClick={(event) => {
                        event.stopPropagation();
                        setNote(undefined);

                        handleDeleteNote(element.id);
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                ))
              : null}
          </Box>
        </Box>
      </Grid>

      <Grid item xs={9} sx={{ height: "100%", pl: 2 }}>
        {note ? (
          <Box>
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <TextField
                onChange={handleNameChange}
                label="Title"
                margin="normal"
                value={name}
                fullWidth
                sx={{ mt: 0 }}
              />
            </form>
            <Box sx={{ height: "100%" }}>
              <textarea
                style={{
                  minHeight: "55vh",
                  maxHeight: "100%",
                  width: "100%",
                }}
                onChange={handleTextareaChange}
                value={content}
              />
              <Box sx={{ py: 2 }}>
                <Button variant="contained" onClick={handleUpdateNote}>
                  SAVE
                </Button>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box></Box>
        )}
      </Grid>
    </Grid>
  );
}

export default Notes;
