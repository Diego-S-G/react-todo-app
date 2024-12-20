class Todo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            done: (this.props.done == "true" && props.done),
            text: props.text
        };
    }

    render() {
        return(
            <div className="todo">
                <span>
                    <input type="checkbox" checked={this.state.done} /> 
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