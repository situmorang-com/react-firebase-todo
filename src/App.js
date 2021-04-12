import { useState } from 'react';
import './App.css';
import { Button,FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from './Todo';

function App() {
	const [ todos, setTodos ] = useState([ 'Contoh 1', 'contoh2' ]);
	const [ input, setInput ] = useState('');
	console.log('🚀', input);

	const addTodo = (event) => {
		// this will fire off when clicking submit button
		event.preventDefault(); // stop page refress when clicking submit on FORM
		console.log('Submitted');
		setTodos([ ...todos, input ]);
		setInput(''); // clear up the input after hitting submit
	};

	return (
		<div className="App">
			<h1>Hello World</h1>
			<form>

				<FormControl>
					<InputLabel> Write A Todo</InputLabel>
					<Input value={input} onChange={(event) => setInput(event.target.value)}/>
				</FormControl>

				<Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
					Add Todo
				</Button>
				{/* <button type="submit" onClick={addTodo}>Add Todo</button> */}
			</form>

			<ul>{todos.map(todo => (
				<Todo text={todo}/>
			))}
			</ul>
		</div>
	);
}

export default App;
