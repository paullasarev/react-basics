var CategoryList = React.createClass({
  render: function () {
    var self = this;

    var categories = this.props.categories.map(function(category, key) {
      return (
        <div className="category" key={key}>
          <img className="category__img" src={category.img}/>
          <div className="category__description">{category.description}</div>
        </div>
      );

    });

    return (
      <div className="category-list">
        {categories}
      </div>
    );
  }
})