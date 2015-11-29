var CategoryPage = React.createClass({
  getDefaultProps: function () {
    return {
      categories: [
        {name:'Food', img:'http://fakeimg.pl/350x200/?text=food', description:'Food goods'},
        {name:'Computers', img:'http://fakeimg.pl/350x200/?text=computer', description:'Computers and peripherial'},
      ],
    }
  },

  render: function () {
    return (
      <div className="page">
        <div className="page__header">
          <Header />
        </div>
        <div className="page__content">
          <CategoryList categories={this.props.categories}/>
        </div>
      </div>
    );
  }
})