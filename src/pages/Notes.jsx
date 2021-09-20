import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Note from "../components/Note";
function Notes() {
  const [notesArray, setNotesArray] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then((res) => res.json())
      .then((data) => setNotesArray(data));
  }, []);
  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: "DELETE",
    });
    const newNotes = notesArray.filter((note) => id !== note.id);
    setNotesArray(newNotes);
  };
  return (
    <Container>
      <Typography
        variant="h6"
        component="h2"
        color="textSecondary"
        gutterBottom
      >
        Notes page
      </Typography>

      <Grid container spacing={3}>
        {notesArray.map((note) => {
          return (
            <Grid key={note.id} item xs={12} md={6} lg={3}>
              <Note {...note} handleDelete={handleDelete} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
export default Notes;
