class Card extends React.Component {

    constructor(props) {
        super(props);        
        this.state = { data: props.card };        
        this.onClickRemove = this.onClickRemove.bind(this);
        this.onClickUpdate = this.onClickUpdate.bind(this);
        this.onClickOk = this.onClickOk.bind(this);
        this.onClickCancel = this.onClickCancel.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    componentDidMount() {
        this.optionsForSelected();
    }

    onClickRemove(e) {
        this.props.onRemove(this.state.data);
    }

    createEditForm() {
        var editForm = document.createElement("div");
        editForm.classList.add("edit-form");
        editForm.classList.add(this.props.action + "-edit-form");
        editForm.setAttribute("data-id", this.state.data.id);
        var container = this.createDiv('container');

        //input
        var rowInput = this.createDiv('row');
        var colInput = this.createDiv('col-md-12');
        var inputTitle = this.createTitleInput();

        //textarea
        var rowTA = this.createDiv('row');
        var colTA = this.createDiv('col-md-12');
        var taDescription = this.createDescrptionTextArea();

        //btns
        var rowBtns = document.createElement('div');
        rowBtns.classList.add("row");
        rowBtns.classList.add("text-right");
        rowBtns.classList.add("btns-edit");
        var colBtns = this.createDiv('col-md-12');
        var btnOk = this.createBtn("Ok");
        btnOk.setAttribute("data-id", this.state.data.id);
        btnOk.addEventListener('click', this.onClickOk);
        btnOk.classList.add("btn");
        btnOk.classList.add("btn-default");

        var btnCancel = this.createBtn("Cancel");
        btnCancel.setAttribute("data-id", this.state.data.id);
        btnCancel.addEventListener('click', this.onClickCancel);
        btnCancel.classList.add("btn");
        btnCancel.classList.add("btn-default");

        editForm.appendChild(container);

        container.appendChild(rowInput);
        rowInput.appendChild(colInput);
        colInput.appendChild(inputTitle);

        container.appendChild(rowTA);
        rowTA.appendChild(colTA);
        colTA.appendChild(taDescription);

        container.appendChild(rowBtns);
        rowBtns.appendChild(colBtns);
        colBtns.appendChild(btnOk);
        colBtns.appendChild(btnCancel);

        return editForm;
    }

    createDiv(className) {
        var element = document.createElement('div');
        element.classList.add(className);
        return element;
    }

    createTitleInput(data) {
        var input = document.createElement('input');        
        input.value = this.state.data.title;
        input.classList.add("input-edit");
        input.classList.add("form-control");
        input.addEventListener('change', this.onTitleChange);
        return input;
    }

    createDescrptionTextArea() {
        var ta = document.createElement('textarea');
        ta.value = this.state.data.description;
        ta.classList.add("ta-edit");
        ta.classList.add("form-control");
        ta.addEventListener('change', this.onDescriptionChange);
        return ta;
    }

    createBtn(name) {
        var btn = document.createElement('button');
        btn.textContent = name;
        return btn;
    }

    onSelectChange(e) {       
        var val = e.target.value;
        const _data = this.state.data;
        _data.state = this.setStateNum(val);
        this.setState({ data: _data });
        this.props.onChange(this.state.data, val);
    }

    setStateNum(value) {
        switch (value) {            
            case 'in-progress': return 1;
            case 'done': return 2;
            case 'to-do': return 0;
        }
    }

    onClickOk(e) {
        
        var btnValue = e.target.attributes.getNamedItem('data-id').value;
        this.changeCard(btnValue);
        this.props.onUpdate(this.state.data);
      
    }

    onClickCancel(e) {   
        var btnValue = e.target.attributes.getNamedItem('data-id').value;
        this.changeCard(btnValue);
        this.setState({ data: this.getBuffData() });
        
    }

    onTitleChange(e) {
        var val = e.target.value;
        const _data = this.state.data;
        _data.title = val;
        this.setState({ data: _data });
    }

    changeCard(value) {
        var cards = document.getElementsByClassName('card');

        for (const item of cards) {
            if (item.attributes.getNamedItem('data-id').value == value) {
                item.childNodes[0].style.display = 'block';
                item.removeChild(item.childNodes[1]);
            }
        }
    }

    onDescriptionChange(e) {
        var val = e.target.value;
        const _data = this.state.data;
        _data.description = val;
        this.setState({ data: _data });       
    }

    onClickUpdate(e) {
        var renderData = document.getElementsByClassName("card");
        this.setBuffData();
        for (var i = 0; i < renderData.length; i++) {
            if (renderData[i].getAttribute('data-id') == this.state.data.id) {
                var card = renderData[i];                
                var formEdit = this.createEditForm();
                var oldElement = card.childNodes[0].style.display = "none";
                card.appendChild(formEdit);
            }             
        }

    }

    getBuffData() {
        return this.buffer;
    }

    setBuffData() {
        this.buffer = {
            id: this.state.data.id,
            title: this.state.data.title,
            description: this.state.data.description
        };
    }

    optionsForSelected() {
        var comboBox = document.getElementById(this.state.data.id);
       
        var opt_1 = this.createOption("To Do");
        var opt_2 = this.createOption("In Progress");
        var opt_3 = this.createOption("Done");     
        comboBox.appendChild(opt_1);       
        comboBox.appendChild(opt_2);
        comboBox.appendChild(opt_3);
     
    }

    createOption(name) {
        var option = document.createElement("option");       
        var valueName = name.replace(" ", "-").toLowerCase();
        option.value = valueName;
        option.textContent = name;
        var selected = (this.props.action == valueName) ? true : false;
        option.selected = selected;       
        return option;
    }

    render() {
        
        return <div className={"card " + this.props.action + "-card"} data-id={this.state.data.id}>
            <div className='card-body'>
                <div className={"title-styles " + this.props.action + "-title-styles"}>
                    <div className='container'>
                        <div className='row'>                            
                            <div className='col-lg-6 col-xs-6'>
                                <select className="form-control" id={this.state.data.id} onChange={this.onSelectChange}></select>                              
                            </div>
                            <div className='col-lg-6 col-xs-6 text-right'>
                                <button className="btn-edit btn btn-default material-icons" onClick={this.onClickUpdate}>edit</button>
                                <button className="btn-close btn btn-default material-icons" onClick={this.onClickRemove}>delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <h3 className="card-title">{this.state.data.title}</h3>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-12 card-text'>
                            {this.state.data.description}
                        </div>
                    </div>
                </div>         
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
            <div className='container'>
                <br />
                <div className='row'>
                    <div className='col-lg-12'>
                        <input type="text" className="title_"
                            placeholder="Task title"
                            value={this.state.title}
                            onChange={this.onTitleChange} />
                    </div>                    
                </div>
                <br/>
                <div className='row'>
                    <div className='col-lg-12'>
                        <textarea className="description_"
                            placeholder="Task description"
                            value={this.state.description}
                            onChange={this.onDescriptionChange} />
                    </div>                        
                </div>
                <br />
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='btns-card-form'>
                            <button className='add-to-btn btn btn-default' onClick={this.onClickAddEl}>To Do</button>
                            <button className='cancel-btn btn btn-default' onClick={this.onClickCancel}>Cancel</button>
                        </div>
                    </div>                    
                </div>
                <br />
            </div>

        </div>;
    }
}

class CardList extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = { cards: [], action: props.action, cardAction: null };
        this.onRemoveCard = this.onRemoveCard.bind(this);
        this.onUpdateCard = this.onUpdateCard.bind(this);
        this.onChangeCard = this.onChangeCard.bind(this);
        this.onAddCard = this.onAddCard.bind(this);     
    }

    onUpdateCard(card) {
        if (card) {
            var data = JSON.stringify({ "id": card.id, "title": card.title, "description": card.description, "state": card.state  });
           
            var xhr = new XMLHttpRequest();
            xhr.open("post", this.props.apiUrl+"/update", true);
            xhr.setRequestHeader("Content-type", "application / json; charset = utf - 8");
            xhr.onload = function () {
                if (xhr.status == 200) {
                    this.loadDataByAction(this.props.action);
                }
            }.bind(this);
            xhr.send(data);
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
                    this.loadDataByAction(this.props.action);
                }
            }.bind(this);
            xhr.send();
        }
    }

    onChangeCard(card, destinationAction) {
        
        if (card) {
            var data = JSON.stringify({ "id": card.id, "title": card.title, "description": card.description, "state": card.state });            
            var xhr = new XMLHttpRequest();
            xhr.open("post", this.props.apiUrl + "/update", true);
            xhr.setRequestHeader("Content-type", "application / json; charset = utf - 8");
            xhr.onload = function () {
                if (xhr.status == 200) {                   
                    this.loadDataByAction(this.props.action);
                    window.location.reload();
                }
            }.bind(this);
            xhr.send(data);
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
                    this.loadDataByAction(this.props.action);
                }
            }.bind(this);
            xhr.send(data);         
        }
    }

    loadDataByAction(action) {
        var xhr = new XMLHttpRequest();
        var url = this.props.apiUrl + "/" + action

        xhr.open("get", url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ cards: data });
        }.bind(this);
        xhr.send();

        this.setState({ cardAction: action });
    }

    componentDidMount() {
        this.loadDataByAction(this.props.action);
    }


    render() {

        
        var remove = this.onRemoveCard;
        var update = this.onUpdateCard;
        var change = this.onChangeCard;

        var _action = this.state.cardAction;

        if (this.state.cards.length != 0) {
            return <div>
                {                   
                    this.state.cards.map(function (card) {                      
                        return <Card action={_action} key={card.id} card={card} onRemove={remove} onUpdate={update} onChange={change} />
                    })
                }
            </div>;
        }
        else {
            return <p className="text-center">Task list is empty</p>
        }
      
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
                    <button className="add-task-btn btn btn-primary" onClick={this.onClick}>Create new task</button>
                </div>              
            </div>
            <div className='row kanban-form'>  
                <div className='container'>
                    <KanbanForm onCardAddition={(card) => this.refs.child.onAddCard(card)}/> 
                </div>
            </div>

            <br />
            <div className='row'>
                <div className='col-lg-4 col-xs-4 column-style column-to-do'>
                    <div className='container'>
                        <div className='row column-header column-heager-to-do'>TO DO</div>
                        <div className='row column-content column-content-to-do'>
                            <CardList apiUrl='api/kanban' ref="child" action="to-do" />
                        </div>
                        <br />
                    </div>
                </div>
                
                <div className='col-lg-4 col-xs-4  column-style column-in-progress'>
                    <div className='container'>
                        <div className='row column-header column-heager-in-progress'>IN PROGRESS</div>
                        <div className='row column-content column-content-in-progress'>
                            <CardList apiUrl='api/kanban' action="in-progress"  />
                        </div>
                        <br />
                    </div>
                </div>
                
                <div className='col-lg-4 col-xs-4  column-style column-done'>
                    <div className='container'>
                        <div className='row column-header column-header-done'>DONE</div>
                        <div className='row column-content column-content-done'>
                            <CardList apiUrl='api/kanban' action="done" />
                        </div>
                        <br />
                    </div>
                </div>
            </div>

        </div>;
    }
}

ReactDOM.render(
    <Kanban />,
    document.getElementById("content")
);
