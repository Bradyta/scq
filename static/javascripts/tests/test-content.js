describe('Todo-item component', function(){
  before('load Component', function() {
    this.renderedComponent =  <Card />
  });

  it("isElement <Card />", function(){
    assert(TestUtils.isElement(this.renderedComponent) == true);
  });
  it("isElement(<Fake/> == fake", function(){
    assert(TestUtils.isElement(<Fake />) == false);
  });
});
