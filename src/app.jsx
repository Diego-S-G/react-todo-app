// npx babel --watch src --out-dir . --presets react-app/prod roda no terminal e aí pode rodar no browser

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
        let id = this.props.id || this.state._id;

        if(id == "" || id == undefined) {
            fetch('http://localhost:3000/todos', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: this.state.text, done: this.state.done })
            }).then(response => response.json()).then(data => this.setState(state => ({ _id: data._id })));
        } else {
            fetch(`http://localhost:3000/todos/${id}`, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: this.state.text, done: this.state.done }) 
            });
        }
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
            todos: []
        };

        this.newTodo = this.newTodo.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:3000/todos')
            .then(response => response.json())
            .then(data => {
                this.setState(state => ({
                    todos: data.todos
                }));
            });
    }

    newTodo(event) {
        event.preventDefault(); // previne o comportamento padrão do link, ent n vai ter '#' na url

        let todos = this.state.todos;
        todos.push({ _id: '', text: 'New Item', done: false });

        this.setState(state => ({
            todos: todos
        }));

    }

    render() {
        const todoList = this.state.todos.map((todo) => {
            return (
                <Todo id={todo._id} key={todo._id.toString()} text={todo.text} done={todo.done} />
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