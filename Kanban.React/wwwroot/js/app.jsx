class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: props.card };
        this.onClickRemove = this.onClickRemove.bind(this);
        this.onClickUpdate = this.onClickUpdate.bind(this);
        this.onClickOk = this.onClickOk.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
    }

    onClickRemove(e) {
        this.props.onRemove(this.state.data);
    }

    createEditForm() {
        var element = document.createElement("div");
        element.setAttribute('class', 'edit-form');
        var inputTitle = this.createTitleInput();
        element.appendChild(inputTitle);

        var taDescription = this.createDescrptionTextArea();
        element.appendChild(taDescription);

        var btnOk = this.createBtn("Ok");
        btnOk.addEventListener('click', this.onClickOk);
        element.appendChild(btnOk);

        var btnCancel = this.createBtn("Cancel");
        btnCancel.addEventListener('click', (e) => {
            console.log("cancel");
        });
        element.appendChild(btnCancel);

        return element;
    }

    createTitleInput(data) {
        var input = document.createElement('input');        
        input.value = this.state.data.title;
        input.addEventListener('change', this.onTitleChange);
        return input;
    }

    createDescrptionTextArea() {
        var ta = document.createElement('textarea');
        ta.value = this.state.data.description;
        ta.addEventListener('change', this.onDescriptionChange);
        return ta;
    }

    createBtn(name) {
        var btn = document.createElement('button');
        btn.textContent = name;
        return btn;
    }

    onClickOk(e) {
        e.preventDefault();
        this.props.onUpdate(this.state.data);
    }

    onTitleChange(e) {
        var val = e.target.value;
        const _data = this.state.data;
        _data.title = val;

        this.setState({ _data });
    }

    onDescriptionChange(e) {
        var val = e.target.value;
        const _data = this.state.data;
        _data.description = val;

        this.setState({ _data });       
    }

    onClickUpdate(e) {
        var renderData = document.getElementsByClassName("card");

        for (var i = 0; i < renderData.length; i++) {
            if (renderData[i].getAttribute('data-id') == this.state.data.id) {
                var card = renderData[i];
                var formEdit = this.createEditForm();
                var oldElement = card.childNodes[0];
                card.replaceChild(formEdit, oldElement);
            }             
        }

    }


    render() {
        return <div className='card' data-id={this.state.data.id}>
            <div className='card-body'>
                <div className='title-styles'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-7'> <h5 className='card-title'>{this.state.data.title}</h5></div>
                            <div className='col-lg-3'> <button onClick={this.onClickUpdate}>Edit</button></div>
                            <div className='col-lg-2'> <button onClick={this.onClickRemove}>X</button></div>
                        </div>
                    </div>
                </div>  
                
                <p className='card-text'>{this.state.data.description}</p>
            </div>
        </div>;
    }
}

class KanbanForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { title: "", description: "" };

        this.onClickAddEl = this.onClickAddEl.bind(this);
        this.onClickCancel = this.onClickCancel.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
    }

    onTitleChange(e) {
        this.setState({ title: e.target.value });
    }

    onDescriptionChange(e) {
        this.setState({ description: e.target.value })
    }


    onClickAddEl(e) {
        e.preventDefault();
        var cardTitle = this.state.title.trim();
        var cardDescription = this.state.description.trim();
        if (!cardTitle || !cardDescription) {
            return;
        }

        this.props.onCardAddition({ title: cardTitle, description: cardDescription });
        this.setState({ title: "", description: "" });
        var kanbanForm = document.getElementsByClassName("kanban-form")[0].style.display = "none";
        var btnBlock = document.getElementsByClassName("add-task-btn")[0].style.display = "block";

    }

    onClickCancel(e) {
        e.preventDefault();
        this.setState({ title: "", description: "" });
        var kanbanForm = document.getElementsByClassName("kanban-form")[0].style.display = "none";
        var btnBlock = document.getElementsByClassName("add-task-btn")[0].style.display = "block";
    }

    render() {
        return <div className='addition'>
          
            <p>
                <input type="text" className="title_"
                        placeholder="Task title"
                        value={this.state.title}
                        onChange={this.onTitleChange} />
            </p>

            <p>
                <input type="text" className="description_"
                    placeholder="Task description"
                    value={this.state.description}
                    onChange={this.onDescriptionChange} />
            </p>
            <div className='btns-card-form'>
                <button className='add-to-btn' onClick={this.onClickAddEl}>To Do</button>
                <button className='cancel-btn' onClick={this.onClickCancel}>Cancel</button> 
            </div>
             
        </div>;
    }
}

class CardList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { cards: [] };
        this.onRemoveCard = this.onRemoveCard.bind(this);
        this.onUpdateCard = this.onUpdateCard.bind(this);
        this.onAddCard = this.onAddCard.bind(this);
    }

    onUpdateCard(card) {
        if (card) {
            var data = JSON.stringify({ "title": card.title, "description": card.description });
            var xhr = new XMLHttpRequest();

            var xhr = new XMLHttpRequest();
            xhr.open("update", this.props.apiUrl, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onload = function () {
                if (xhr.status == 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send();
        }
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

    onAddCard(card) {      
        if (card) {
            var data = JSON.stringify({ "title": card.title, "description": card.description });
            var xhr = new XMLHttpRequest();
            
            xhr.open("post", this.props.apiUrl, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onload = function () {
                if (xhr.status == 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send(data);         
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
        var update = this.onUpdateCard;
        return <div>
            {
                this.state.cards.map(function (card) {
                    return <Card key={card.id} card={card} onRemove={remove} onUpdate={update} />
                })
            }
        </div>;
    }
}

class Kanban extends React.Component {

    constructor(props) {
        super(props); 
    }

    onClick(e) {
        var btnBlock = e.target.style.display = "none";
        var kanbanForm = document.getElementsByClassName("kanban-form")[0].style.display = "block";
    }
 
    render() {
        return <div className='container'>

            <br />
            <div className='row'>
                <div className='container'>
                    <button className="add-task-btn" onClick={this.onClick}>Add new task</button>
                </div>              
            </div>
            <div className='row kanban-form'>  
                <div className='container'>
                    <KanbanForm onCardAddition={(card) => this.refs.child.onAddCard(card)}/> 
                </div>
            </div>

            <br />
            <div className='row'>
                <div className='col-lg-4 column-style'>
                    <div className='container'>
                        <div className='row column-header'>
                            TO DO
                        </div>
                        <div className='row column-content'>
                            <CardList apiUrl='api/kanban' ref="child" />
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