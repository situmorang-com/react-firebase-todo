import { useEffect, useState } from 'react';
import './App.css';
import { Button,FormControl, IconButton, Input, InputLabel, Paper, TextField, ThemeProvider, Typography } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
// import CloudOffIcon from '@material-ui/icons/CloudOff';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
      backgroundColor: theme.palette.background.paper,
	//   align:"center"
	//   justifyItems:'center'
	},
  }));

function App() {
	const [ todos, setTodos ] = useState([]);
	const [ input, setInput ] = useState('');
	const [ username, setUsername] = useState('');
	// const [ username, setInput ] = useState('');
	const [checked, setChecked] = useState([1]);

	const [theme, setTheme] = useState(true);
	const classes = useStyles();
	const icon = !theme ? <Brightness7Icon /> : <Brightness3Icon />;
	const appliedTheme = createMuiTheme(theme ? light : dark);
  

	//when the app loads, we need to listen to database and fetch new todos as they get added/removed
	useEffect(() => {
		db.collection('todos').orderBy('timestamp', 'asc').onSnapshot(snapshot => [
			// console.log(snapshot.docs.map(doc => doc.data()))
			setTodos(snapshot.docs.map(doc => ({
				id: doc.id,
				username: doc.data().username,
				todo: doc.data().todo,
				checked: doc.data().checked
			})))
		])
	}, [])

	const addTodo = (event) => {
		// this will fire off when clicking submit button
		event.preventDefault(); // stop page refress when clicking submit on FORM

		db.collection('todos').add({
			todo: input,
			username: username,
			checked: false,
			timestamp: firebase.firestore.FieldValue.serverTimestamp()
		})
		setInput(''); // clear up the input after hitting submit
		setUsername('');
	};

	return (
		<ThemeProvider theme={appliedTheme}>
			<Paper>
			{/* <div align="center" className={`${App} ${classes.root}`}> */}
			<div align="center" className="App">
				<IconButton
					edge="end"
					color="inherit"
					aria-label="mode"
					onClick={() => setTheme(!theme)}
				>
					{icon}
				</IconButton>
				<Typography>
					Click on {!theme ? "Sun" : "Moon"} Icon to change to{" "}
					{!theme ? "Light" : "Dark"} theme
				</Typography>
				<h1 >CheckList</h1>
				<form>

					<FormControl>
						{/* <InputLabel variant="outlined" color='primary'> ✅  here to add</InputLabel>
						<Input value={input} onChange={(event) => setInput(event.target.value)}/> */}
						<TextField
							id="outlined-full-width"
							label="✅ ⦿here to add"
							style={{ margin: 7 }}
							// placeholder="Placeholder"
							// helperText="Full width!"
							// fullWidth
							// margin="normal"
							// InputLabelProps={{
							// 	shrink: true,
							// }}
							multiline
							variant="outlined"
							value={input}
							onChange={(event) => setInput(event.target.value)}
						/>

						{/* <InputLabel style={{ marginRight:50 }}>User</InputLabel> */}
						<Input
							id="input-with-icon-adornment"
							placeholder="user name"
							style={{ margin: 7 }}
							// defaultValue="private"
							// input={username}
							value={username}
							startAdornment={
								<InputAdornment position="start">
								<AccountCircle />
								</InputAdornment>
							}
							onChange={(event) => setUsername(event.target.value)}
						/>

						<Button 
							disabled={!input} 
							type="submit" 
							onClick={addTodo} 
							variant="contained" 
							color="primary"
						>
							Add
						</Button>
					</FormControl>


				</form>

				<ul>
					{todos.map(todo => (
						<Todo todo={todo}/>
					))}
				</ul>

		</div>
		</Paper>
    </ThemeProvider>
	);
}

export const light = {
	palette: {
	  type: "light"
	}
  };
  export const dark = {
	palette: {
	  type: "dark"
	}
  };

export default App;
