describe('Dashboard Tests', function(){
  before('render Components', function() {

    this.DashboardRenderTree =  TestUtils.renderIntoDocument(
      <Page routesObject = {
     {"surveys": "/api/surveys",
      "response": "/api/response",
      "search": "/api/search",
      "groups": "/api/groups",
      "subscribe": "/api/subscribe",
      "search": "/api/search"}
     } />)
  });

  it("is Rendering <Page />", function(){
    assert(TestUtils.findRenderedDOMComponentWithClass(this.DashboardRenderTree, 'mainDiv') != null);
  });
  it("is Rendering <SurveyDiv />", function(){
    assert(TestUtils.findRenderedDOMComponentWithClass(this.DashboardRenderTree, 'surveyDiv') != null);
  });
  it("is Rendering <Card />", function(){
    assert(TestUtils.findRenderedDOMComponentWithClass(this.DashboardRenderTree, 'cardDiv') != null);
  });
  it("is Rendering <TitleSection />", function(){
    assert(TestUtils.findRenderedDOMComponentWithClass(this.DashboardRenderTree, 'questionTitleDiv') != null);
  });
  it("is Rendering <TitleSurvey />", function(){
    assert(TestUtils.findRenderedDOMComponentWithClass(this.DashboardRenderTree, 'surveyTitleDiv') != null);
  });
});

describe('Profile Tests', function(){
  before('render Components', function() {
  
  this.ProfilePageRenderTree = TestUtils.renderIntoDocument(
    <ProfilePage routesObject = {
     {"surveys": "/api/surveys",
      "response": "/api/response",
      "search": "/api/search",
      "groups": "/api/groups",
      "subscribe": "/api/subscribe",
      "search": "/api/search"}
     } />)

  this.ProfileGroupsRenderTree = TestUtils.renderIntoDocument(
    <ProfileGroups routesObject = {
     {"surveys": "/api/surveys",
      "response": "/api/response",
      "search": "/api/search",
      "groups": "/api/groups",
      "subscribe": "/api/subscribe",
      "search": "/api/search"}
     } />)
  
  });

  it("is Rendering <ProfilePage />", function(){
    assert(TestUtils.findRenderedDOMComponentWithClass(this.ProfilePageRenderTree, 'profilePageDiv') != null);
  });
  it("is Rendering <ProfileGroups />", function(){
    assert(TestUtils.findRenderedDOMComponentWithClass(this.ProfileGroupsRenderTree, 'profileGroupsDiv') != null);
  });  
  it("is Rendering <SubscribedGroupDiv />", function(){
    assert(TestUtils.findRenderedDOMComponentWithClass(this.ProfileGroupsRenderTree, 'subscribedGroupDiv') != null);
  });  
  it("is Rendering <PendingGroupDiv />", function(){
    assert(TestUtils.findRenderedDOMComponentWithClass(this.ProfileGroupsRenderTree, 'pendingGroupDiv') != null);
  });  
});
