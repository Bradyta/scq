describe('Some sanity tests', function(){
  before('load Component', function() {
    this.renderedComponent =  <Card />
  });

  it("isElement <Card />", function(){
    assert(TestUtils.isElement(this.renderedComponent) == true);
  });
});