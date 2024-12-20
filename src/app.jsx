class Todo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            done: props.done,
            text: props.text
        };

        this.handleClick = this.handleClick.bind(this); // garante que dentro da função handleClick o this seja o mesmo que o this da classe Todo
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick(event) {
        this.setState( // esse this se n tivesse bind la no event handler perderia o contexto creio
            state => ({
                done: !state.done
            }),
            function (event) {
                this.handleSubmit(event)
            }
        );
    }

    handleChange(event) {
        let text = event.target.value;

        this.setState(state => ({
            text: text
        }));
    }

    handleSubmit(event) {
        console.log('You successfully submitted!')

        // this.setState(state => ({
        // }));
    }

    render() {
        return (
            <div className="todo">
                <span>
                    <input type="checkbox" checked={this.state.done} onClick={this.handleClick} />
                    <input type="text" value={this.state.text}  className={(this.state.done) ? 'done' : 'not-done'} 
                                                                onChange={this.handleChange} onBlur={this.handleSubmit} />
                </span>
            </div>
        );
    }
}

class TodoList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            todos: [
                { _id: 1, text: 'Learn React', done: false },
                { _id: 2, text: 'Learn Redux', done: true },
                { _id: 3, text: 'Learn GraphQL', done: false },
            ]
        };

        this.newTodo = this.newTodo.bind(this);
    }

    newTodo(event) {
        event.preventDefault(); // previne o comportamento padrão do link, ent n vai ter '#' na url

        let todos = this.state.todos;
        todos.push({ _id: todos.length + 1, text: 'New Item', done: false });

        this.setState(state => ({
            todos: todos
        }));

    }

    render() {
        const todoList = this.state.todos.map((todo) => {
            return (
                <Todo key={todo._id.toString()} text={todo.text} done={todo.done} />
            );
        });

        return (
            <React.Fragment>
                <h1>React ToDo App</h1>
                {todoList}
                <div className="new-item-button">
                    <a href="#" onClick={this.newTodo}>Add ToDo Item</a>
                </div>
            </React.Fragment>
        );
    }
}

ReactDOM.render(
    <TodoList />,
    document.getElementById('root')
);