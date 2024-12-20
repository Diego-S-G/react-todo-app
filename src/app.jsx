class Todo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            done: (this.props.done == "true" && props.done),
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
                    <input type="text" value={this.state.text} onChange={this.handleChange} onBlur={this.handleSubmit} />
                </span>
            </div>
        );
    }
}

ReactDOM.render(
    <Todo text="Todo 1" done="false" />,
    document.getElementById('root')
);