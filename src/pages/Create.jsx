import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { FormControlLabel } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useHistory } from "react-router-dom";
// import { ViewModuleTwoTone } from "@material-ui/icons";
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});
function Create() {
  const history = useHistory();
  const classes = useStyles();
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState({
    title: false,
    content: false,
  });

  const [category, setCategory] = useState("Todos");
  function handleChange(e) {
    const { name, value } = e.target;
    setNote((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    // console.log(note);
  }
  function handleClick(e) {
    e.preventDefault();
    setError({
      title: false,
      content: false,
    });
    if (note.title === "") {
      setError((prev) => {
        return {
          ...prev,
          title: true,
        };
      });
    }
    if (note.content === "") {
      setError((prev) => {
        return {
          ...prev,
          content: true,
        };
      });
    }

    if (note.title && note.content) {
      const title = note.title;
      const content = note.content;
      console.log(note, category);
      fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title, content, category }),
      }).then(() => {
        history.push("/");
      });
      setNote({
        title: "",
        content: "",
      });
    }
  }
  return (
    <Container>
      <Typography
        variant="h6"
        component="h2"
        color="textSecondary"
        gutterBottom
      >
        Create a new Note
      </Typography>
      <form noValidate autoComplete="off">
        <TextField
          onChange={handleChange}
          name="title"
          value={note.title}
          className={classes.field}
          variant="outlined"
          color="secondary"
          label="New Docs"
          fullWidth
          required
          error={error.title}
        />
        <TextField
          onChange={handleChange}
          name="content"
          value={note.content}
          className={classes.field}
          variant="outlined"
          color="secondary"
          label="Details"
          fullWidth
          multiline
          rows={4}
          required
          error={error.content}
        />
        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel control={<Radio />} label="Money" value="Money" />
            <FormControlLabel control={<Radio />} label="Todos" value="Todos" />
            <FormControlLabel
              control={<Radio />}
              label="Reminder"
              value="Reminder"
            />
            <FormControlLabel control={<Radio />} label="Work" value="Work" />
          </RadioGroup>
        </FormControl>
        <Button
          variant="contained"
          color="secondary"
          endIcon={<KeyboardArrowRightIcon />}
          onClick={handleClick}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default Create;
