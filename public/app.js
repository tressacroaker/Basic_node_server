//if you are going to update the ski it needs to be in the one ski not the ski page. use a button and say on click and have it convert to a form that you can fill out and you would submit it and use the onchange thing again for each thing like the name, desc, image. do a put requetst and use the updated ski and use the updated ski method as the new ski. running ajax functino when submitting. make sure to use the id for the one ski when changing and referencing it.

var OneSki = React.createClass({
  deleteSki: function(){
    var id = this.props.id;
    $.ajax({
      method: "DELETE",
      url: "/data/" + id,
      success: function(response){
        this.props.getSkis();
      }.bind(this),
      error: function(xhr, status, err){
        console.log(status, err.toString());
      }.bind(this)
    });
  },
  render: function(){
    return(
        <div key={this.props.id}>
          <h1>{this.props.name}</h1>
          <img src={this.props.image}></img>
          <p>{this.props.description}</p>
          <button onClick={this.deleteSki}>DELETE THE SKI</button>
        </div>
    );
  }
});

//each scope has its own this object so you have to change it to self so it doesnt conflict
var SkiList = React.createClass({
  render: function(){
    var self = this;
    var skiNodes = this.props.skidata.map(function(ski){
    return (
      <OneSki
        id={ski._id}
        name={ski.name}
        description={ski.description}
        image={ski.image}
        getSkis={self.props.getSkis}
      />
    );
  })
  return (
    <div>
      {skiNodes}
    </div>
    );
  }
});
//after you call in the ski data below in the skipage you go above and map through it
//new variable with the nodes is how you display it on the view

var SkiPage = React.createClass({

  //after you post this new ski you go below to the get initial state and call in the new ski you jus tposted
  getSkis: function(){
    $.ajax({
      method: "GET",
      url: "/data",
      success: function(response){
        this.setState({listOfSkis: response})
      }.bind(this),
      error: function(xhr, status, err){
        console.log(status, err.toString());
      }.bind(this)
    });
  },
  postSki: function(){
    var newSki = {
      name: this.state.name,
      description: this.state.description,
      image: this.state.image
    }
    $.ajax({
      method: "POST",
      url: "/data",
      data: newSki,
      success: function(response){
        this.getSkis();
      }.bind(this),
      error: function(xhr, status, err){
        console.log(status, err.toString());
      }.bind(this)
    });
  },
  //e signifies the new event that you are calling in. target is the thing you are talking about like th einput box. and then the value
  updateNewSkiName: function(e){
    this.setState({
        name: e.target.value
    });
    console.log(this.state.name);
  },
  updateNewSkiDescription: function(e){
    this.setState({
        description: e.target.value
    });
    console.log(this.state.description);
  },
  updateNewSkiImage: function(e){
    this.setState({
        image: e.target.value
    });
    console.log(this.state.image);
  },
  //after you set the state go down and create a new variable called data and call in the list of skis
  componentDidMount: function(){
    this.getSkis();
  },
  // everytime we type a new letter it is changing so onchange it will update the values below. so you go above and type a set.state to do this
  //running on page load
  getInitialState: function(){
    return {
      listOfSkis: [],
      name: "",
      description: "",
      image: ""
    };
  },
  //after you initiate this state you go back up to the success section and set the state method
  render: function(){
    return(
      <div>
        <form onSubmit={this.postSki}>
        <input onChange={this.updateNewSkiName} type="text" placeholder="Name of skis"/>
        <input onChange={this.updateNewSkiDescription} type="text" placeholder="Ski description"/>
        <input onChange={this.updateNewSkiImage} type="text" placeholder="Image URL"/>
        <button type="submit">Add New Ski</button>
      </form>
        <SkiList skidata={this.state.listOfSkis} getSkis={this.getSkis}/>
      </div>
    )
  }
});

// to represnet that we want to get the skis in that function is why we use this.

ReactDOM.render(
  <SkiPage />,
  document.getElementById('content')
);
