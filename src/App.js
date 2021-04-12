import { useEffect, useState } from 'react';
import './App.css';
import { Button,FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';


function App() {
	const [ todos, setTodos ] = useState([]);
	const [ input, setInput ] = useState('');

	//when the app loads, we need to listen to database and fetch new todos as they get added/removed
	useEffect(() => {
		db.collection('todos').orderBy('timestamp', 'asc').onSnapshot(snapshot => [
			// console.log(snapshot.docs.map(doc => doc.data()))
			setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
		])
	}, [])

	const addTodo = (event) => {
		// this will fire off when clicking submit button
		event.preventDefault(); // stop page refress when clicking submit on FORM

		db.collection('todos').add({
			todo: input,
			timestamp: firebase.firestore.FieldValue.serverTimestamp()
		})
		setInput(''); // clear up the input after hitting submit
	};

	return (
		<div className="App">
			<h1>Situmorang Todo</h1>
			<form>

				<FormControl>
					<InputLabel> ✅ Click here to add</InputLabel>
					<Input value={input} onChange={(event) => setInput(event.target.value)}/>
				</FormControl>

				<Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
					Add Todo
				</Button>
				{/* <button type="submit" onClick={addTodo}>Add Todo</button> */}
			</form>

			<ul>{todos.map(todo => (
				<Todo todo={todo}/>
			))}
			</ul>
		</div>
	);
}

export default App;
