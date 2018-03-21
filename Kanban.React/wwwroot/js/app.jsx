class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: props.card };
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        this.props.onRemove(this.state.data);
    }

    render() {
        return <div className='card'>
            <div className='card-body'>
                <div className='title-styles'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-10'> <h5 className='card-title'>{this.state.data.title}</h5></div>
                            <div className='col-lg-2'> <button onClick={this.onClick}>X</button></div>
                        </div>
                    </div>
                </div>               
                <p className='card-text'>{this.state.data.description}</p>
            </div>
        </div>;
    }
}

class CardList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { cards: [] };
        this.onRemoveCard = this.onRemoveCard.bind(this);
    }

    onRemoveCard(card) {
        if (card) {
            var url = this.props.apiUrl + "/" + card.id;

            var xhr = new XMLHttpRequest();
            xhr.open("delete", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status == 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send();
        }
    }

    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.props.apiUrl, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ cards: data });
        }.bind(this);
        xhr.send();
    }

    componentDidMount() {
        this.loadData();
    }




    render() {
        var remove = this.onRemoveCard;
        return <div>
            {
                this.state.cards.map(function (card) {
                    return <Card key={card.id} card={card} onRemove={remove} />
                })
            }
        </div>;
    }
}


class KanbanForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { title: "", description: ""};

        this.onSubmit = this.onSubmit.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
    }

    onTitleChange(e) {
        this.setState({ title: e.target.value });
    }

    onDescriptionChange(e) {
        this.setState({ description: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        var cardTitle = this.state.title.trim();
        var cardDescription = this.state.description;
        if (!cardTitle || !cardDescription) {
            return;
        }
        this.props.onPhoneSubmit({ title: cardTitle, description: cardDescription });
        this.setState({ title: "", description: "" });
    }

    render() {
        return <div className='addition'>
            <form onSubmit={this.onSubmit}>
                <p>
                    <input type="text"
                        placeholder="Task title"
                        value={this.state.title}
                        onChange={this.onTitleChange} />
                </p>

                <p>
                    <input type="text"
                        placeholder="Task description"
                        value={this.state.description}
                        onChange={this.onDescriptionChange} />
                </p>


                <input type="submit" value="Add" />
            </form>
        </div>;
    }
}

class Kanban extends React.Component {
    
    render() {
        return <div className='container'>
            <br/>
            <div className='row'>
                <div className='col-lg-4 column-style'>
                    <div className='container'>
                        <div className='row column-header'>
                            TO DO
                        </div>
                        <div className='row column-content'>
                            <CardList apiUrl='api/kanban' />
                        </div>
                    </div>
                </div>

                <div className='col-lg-4 column-style'>
                    <div className='container'>
                        <div className='row column-header'>
                            IN PROGRESS
                        </div>
                        <div className='row column-content'>
                            ...to do cards...
                        </div>
                    </div>
                </div>

                <div className='col-lg-4 column-style'>
                    <div className='container'>
                        <div className='row column-header'>
                            DONE
                        </div>
                        <div className='row column-content'>
                            ...to do cards...
                        </div>
                    </div>
                </div>
            </div>

        </div>;
    }
}

ReactDOM.render(
    <Kanban/>,
    document.getElementById("content")
);