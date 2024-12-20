class Todo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            done: (this.props.done == "true" && props.done),
            text: props.text
        };

        this.handleClick = this.handleClick.bind(this); // garante que dentro da função handleClick o this seja o mesmo que o this da classe Todo
    }

    handleClick(event) {
        this.setState(state => ({ // esse this se n tivesse bind la no event handler perderia o contexto creio
            done: !state.done
        }));
    }

    render() {
        return(
            <div className="todo">
                <span>
                    <input type="checkbox" checked={this.state.done} onClick={this.handleClick} /> 
                    <input type="text" value={this.state.text} />
                </span>
            </div>
        );
    }
}

ReactDOM.render(
    <Todo text="Todo 1" done="false" />,
    document.getElementById('root')  
);