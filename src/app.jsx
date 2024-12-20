class Todo extends React.Component {
    render() {
        let checked = (this.props.done == 'true');

        return(
            <div className="todo">
                <span>
                    <input type="checkbox" checked={checked} /> {this.props.name}
                </span>
            </div>
        );
    }
}

ReactDOM.render(
    <Todo name="one" done="false" />,
    document.getElementById('root')  
);