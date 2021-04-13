import React from 'react';
import {Checkbox, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles} from '@material-ui/core';
import db from './firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
      backgroundColor: theme.palette.background.paper
    },
    demo: {
      backgroundColor: theme.palette.background.paper
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }));

function Todo(props) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([1]);

    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };
    return (
        <div className={classes.root}>

            <List>
                <Grid container>

                    <ListItem>
                        <Checkbox
                            edge="start"
                            // onChange={handleToggle(value)}
                            // checked={checked.indexOf(value) !== -1}
                            // inputProps={{ 'aria-labelledby': labelId }}
                            // onClick={event => db.collection('todos').doc(props.todo.id)}
                        />
                        <ListItemText style={{ marginRight:50 }} primary={props.todo.todo} secondary={"🧑‍🦰 " + props.todo.username}/>
                    </ListItem>
                    <ListItemSecondaryAction>
                        {/* <IconButton edge="end" aria-label="edit">
                            <EditIcon />
                        </IconButton> */}
                        <IconButton
                            // edge="end" 
                            aria-label="delete">
                            <DeleteForeverIcon onClick={event => db.collection('todos').doc(props.todo.id).delete()}/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </Grid>
            </List>

        </div>
    )
}

export default Todo