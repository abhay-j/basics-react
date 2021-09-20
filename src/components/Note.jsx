import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { IconButton, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { DeleteOutline } from "@material-ui/icons";
function Note({ title, content, id, category, handleDelete }) {
  return (
    <div>
      <Card elevation={2}>
        <CardHeader
          action={
            <IconButton
              aria-label="settings"
              onClick={() => {
                handleDelete(id);
              }}
            >
              <DeleteOutline />
            </IconButton>
          }
          title={title}
          subheader={category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {content}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
export default Note;
