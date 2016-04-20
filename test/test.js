var React = require('react/addons'),
    assert = require('assert'),
    TestUtils = React.addons.TestUtils;

'use strict';

function getSurvey(url) {
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        cache: false,
        timeout: 30000,
        error: function error() {
            return {};
        },
        success: function success(data) {
            console.log(data);
            return data;
        }
    });
}

function sendSurvey(url) {}
"use strict";

/*
*
* Multiple Choice
* Get the length of how many options there are, and initialize an array of that size to hold false at each
* index, then check to see if the answer was previously answered, if it is we set the previous answers that
* were marked to true in the array. Set the final response state as this.state.data
*/
var MultipleChoice = React.createClass({
    displayName: "MultipleChoice",

    getInitialState: function getInitialState() {
        return {
            data: []
        };
    },

    componentDidMount: function componentDidMount() {
        this.setState({
            data: this.props.questionState
        });
    },

    componentDidUpdate: function componentDidUpdate() {
        componentHandler.upgradeDom();
    },
    /*if a checkbox is checked/unchecked, send which option got checked (i) and whether it was true or false in
    this.state.data, then use that info to flip it's value in the this.state.data array'*/
    handleChange: function handleChange(i, value) {
        var NewValue = null;
        if (value == 0) {
            NewValue = 1;
        } else {
            NewValue = 0;
        }
        var changeAnswer = this.state.data;
        changeAnswer[i] = NewValue;
        this.setState({
            data: changeAnswer
        });
    },

    /*made keys for each tag, or react put up warnings, we iterate through each option attaching an iterator i that we
    use to simultaneously index this.state.data, if it's true we render a checked checkbox, else we render it unchecked
    unchecked*/
    render: function render() {
        var _this = this;

        var questionID = this.props.questionID;
        var renderedOptions = this.props.options.map(function (option, i) {
            var inputKey = String(questionID) + "." + option + "." + i + "." + "input";
            var labelKey = String(questionID) + "." + option + "." + i + "." + "label";
            var spanKey = String(questionID) + "." + option + "." + i + "." + "span";
            if (_this.state.data[i] == 1) {
                return React.createElement(
                    "label",
                    { className: "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect", key: labelKey, id: labelKey },
                    React.createElement("input", {
                        type: "checkbox",
                        value: _this.state.data[i],
                        name: option,
                        key: inputKey,
                        id: inputKey,
                        className: "mdl-checkbox__input",
                        onChange: _this.handleChange.bind(_this, i, _this.state.data[i]),
                        checked: true }),
                    React.createElement(
                        "span",
                        { className: "mdl-checkbox__label", key: spanKey, id: spanKey },
                        " ",
                        option,
                        " "
                    )
                );
            } else {
                return React.createElement(
                    "label",
                    { className: "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect", key: labelKey, id: labelKey },
                    React.createElement("input", {
                        type: "checkbox",
                        value: _this.state.data[i],
                        name: option,
                        key: inputKey,
                        id: inputKey,
                        className: "mdl-checkbox__input",
                        onChange: _this.handleChange.bind(_this, i, _this.state.data[i]) }),
                    React.createElement(
                        "span",
                        { className: "mdl-checkbox__label", key: spanKey, id: spanKey },
                        " ",
                        option,
                        " "
                    )
                );
            }
        });
        var footerKey = String(this.props.surveyID) + "." + "footer";
        return React.createElement(
            "div",
            { className: "options mdl-card__supporting-text mdl-color-text--grey-600", key: footerKey },
            renderedOptions,
            React.createElement(Footer, {
                prevHandler: this.props.prevHandler,
                nextHandler: this.props.nextHandler,
                onSubmit: this.props.onSubmit,
                key: footerKey,
                id: footerKey,
                surveyData: this.state.data,
                questionID: this.props.questionID,
                response_format: this.props.response_format,
                questionNum: this.props.questionNum,
                numQuestions: this.props.numQuestions,
                responseSize: this.props.responseSize })
        );
    }
});
/*
*
*
* Single Choice
* This is the same as multiple choice, but the handlers are different
* so that once a new option is chosen all other options are set to false
* since it simulates a radio form
*/
var SingleChoice = React.createClass({
    displayName: "SingleChoice",


    getInitialState: function getInitialState() {
        return {
            data: []
        };
    },

    componentDidMount: function componentDidMount() {
        this.setState({
            data: this.props.questionState
        });
    },

    componentDidUpdate: function componentDidUpdate() {
        componentHandler.upgradeDom();
    },

    handleChange: function handleChange(i, value) {
        var NewValue = null;
        var length = Object.keys(this.props.options).length;
        var questionObj = [];
        var changeAnswer = this.state.data;
        for (var iter = 0; iter < length; iter++) {
            changeAnswer[iter] = 0;
        }
        changeAnswer[i] = 1;
        this.setState({
            data: changeAnswer
        });
    },

    render: function render() {
        var _this2 = this;

        var surveyID = String(this.props.surveyID);
        var questionID = this.props.questionID;
        var renderedOptions = this.props.options.map(function (option, i) {
            var inputKey = String(questionID) + "." + option + "." + i + "." + "input";
            var labelKey = String(questionID) + "." + option + "." + i + "." + "label";
            var spanKey = String(questionID) + "." + option + "." + i + "." + "span";
            var divKey = String(questionID) + "." + option + "." + i + "." + "div";
            if (_this2.state.data[i] == 1) {
                return React.createElement(
                    "div",
                    { key: divKey, id: divKey },
                    React.createElement(
                        "label",
                        { className: "mdl-radio mdl-js-radio mdl-js-ripple-effect", key: labelKey, id: labelKey },
                        React.createElement("input", {
                            type: "radio",
                            className: "mdl-radio__button",
                            name: surveyID,
                            key: inputKey,
                            id: inputKey,
                            value: i,
                            onChange: _this2.handleChange.bind(_this2, i, _this2.state.data[i]),
                            checked: true }),
                        React.createElement(
                            "span",
                            { className: "mdl-radio__label", key: spanKey, id: spanKey },
                            " ",
                            option,
                            " "
                        )
                    )
                );
            } else {
                return React.createElement(
                    "div",
                    { key: divKey, id: divKey },
                    React.createElement(
                        "label",
                        { className: "mdl-radio mdl-js-radio mdl-js-ripple-effect", key: labelKey, id: labelKey },
                        React.createElement("input", {
                            type: "radio",
                            className: "mdl-radio__button",
                            name: surveyID,
                            value: i,
                            key: inputKey,
                            id: inputKey,
                            onChange: _this2.handleChange.bind(_this2, i, _this2.state.data[i]) }),
                        React.createElement(
                            "span",
                            { className: "mdl-radio__label", key: spanKey, id: spanKey },
                            " ",
                            option,
                            " "
                        )
                    )
                );
            }
        });
        var footerKey = String(this.props.surveyID) + "." + "footer";
        return React.createElement(
            "div",
            {
                className: "mdl-card__supporting-text mdl-color-text--grey-600", key: footerKey },
            renderedOptions,
            React.createElement(Footer, {
                prevHandler: this.props.prevHandler,
                nextHandler: this.props.nextHandler,
                onSubmit: this.props.onSubmit,
                key: footerKey,
                surveyData: this.state.data,
                questionID: this.props.questionID,
                response_format: this.props.response_format,
                questionNum: this.props.questionNum,
                numQuestions: this.props.numQuestions,
                responseSize: this.props.responseSize })
        );
    }
});
/*
*
*
* Free
* Same as the other cards, but simpler, we just take whatever is in the
* textfield and get it to POST after all the previous question answer checking
*/
var FreeResponse = React.createClass({
    displayName: "FreeResponse",


    getInitialState: function getInitialState() {
        return {
            answer: 'Change me!'
        };
    },

    componentDidMount: function componentDidMount() {
        this.setState({
            answer: this.props.questionState
        });
    },

    componentDidUpdate: function componentDidUpdate() {
        componentHandler.upgradeDom();
    },

    handleChange: function handleChange(e) {
        this.setState({ answer: e.target.value });
    },

    render: function render() {
        var questionID = this.props.questionID;
        var inputKey = String(questionID) + "." + "input";
        var labelKey = String(questionID) + "." + "label";
        var spanKey = String(questionID) + "." + "span";
        var divKey = String(questionID) + "." + "div";
        var textareaKey = String(questionID) + "." + "textarea";
        var footerKey = String(this.props.surveyID) + "." + "footer";
        return React.createElement(
            "div",
            {
                className: "mdl-card__supporting-text mdl-color-text--grey-600", key: divKey },
            React.createElement("textarea", {
                className: "mdl-textfield__input",
                type: "text",
                rows: "4",
                id: "test",
                placeholder: "Your answer",
                value: this.state.answer,
                onChange: this.handleChange }),
            React.createElement("br", null),
            React.createElement(Footer, {
                key: footerKey,
                prevHandler: this.props.prevHandler,
                nextHandler: this.props.nextHandler,
                onSubmit: this.props.onSubmit,
                surveyData: this.state.answer,
                questionID: this.props.questionID,
                response_format: this.props.response_format,
                questionNum: this.props.questionNum,
                numQuestions: this.props.numQuestions,
                responseSize: this.props.responseSize })
        );
    }
});
/*
*Rating slider
*Nothing special here either relative to the other ones.
*/
var Rating = React.createClass({
    displayName: "Rating",

    getInitialState: function getInitialState() {
        return {
            answer: null
        };
    },

    componentDidMount: function componentDidMount() {
        this.setState({
            answer: this.props.questionState
        });
    },

    componentDidUpdate: function componentDidUpdate() {
        componentHandler.upgradeDom();
    },

    handleChange: function handleChange(e) {
        this.setState({ answer: e.target.value });
    },
    render: function render() {
        var questionID = this.props.questionID;
        var inputKey = String(questionID) + "." + "input";
        var spanKey = String(questionID) + "." + "span";
        var divKey = String(questionID) + "." + "div";
        var footerKey = String(this.props.surveyID) + "." + "footer";
        return React.createElement(
            "div",
            { className: "mdl-card__supporting-text mdl-color-text--grey-600", key: divKey },
            React.createElement(
                "div",
                { key: divKey },
                React.createElement("input", { className: "mdl-slider mdl-js-slider",
                    type: "range",
                    key: inputKey,
                    min: "0",
                    max: "10",
                    value: this.state.answer,
                    step: "1",
                    onChange: this.handleChange
                }),
                React.createElement(
                    "span",
                    { id: "sliderStatus", key: spanKey },
                    this.state.answer
                )
            ),
            React.createElement(Footer, {
                prevHandler: this.props.prevHandler,
                key: footerKey,
                nextHandler: this.props.nextHandler,
                onSubmit: this.props.onSubmit,
                surveyData: this.state.answer,
                questionID: this.props.questionID,
                response_format: this.props.response_format,
                questionNum: this.props.questionNum,
                numQuestions: this.props.numQuestions,
                responseSize: this.props.responseSize })
        );
    }
});
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//called in <Card>, an mdl title card that just renders the title text.
var TitleSection = React.createClass({
    displayName: "TitleSection",

    render: function render() {
        return React.createElement(
            "div",
            { className: "mdl-card__title mdl-card--expand mdl-color--primary" },
            React.createElement(
                "h2",
                { className: "mdl-card__title-text white_text" },
                " ",
                this.props.titleText,
                " "
            )
        );
    }
});

var Card = React.createClass({
    displayName: "Card",

    /*Since our children are dynamic the mdl needs to be reprocessed after every render else it looks like regular html, so everytime Card updates
    with new props (which happens every time next or previous is clicked) we upgrade all our components to mdl again*/

    multipleChoiceResponseState: function multipleChoiceResponseState() {
        var length = Object.keys(this.props.options).length;
        var questionObj = [];
        var responseState = this.props.responseState;
        var responseStateLength = Object.keys(responseState).length;
        var prevAnswers = [];

        for (var i = 0; i < length; i++) {
            questionObj[i] = 0;
        }

        for (var i = responseStateLength - 1; i >= 0; i--) {
            if (responseState[i].question_id == this.props.questionID) {
                prevAnswers = responseState[i].response_data;
                for (var i2 = 0; i2 < length; i2++) {
                    if (prevAnswers[i2] == 1) {
                        questionObj[i2] = 1;
                    }
                }
            }
        }
        return questionObj;
    },

    singleChoiceResponseState: function singleChoiceResponseState() {
        var length = Object.keys(this.props.options).length;
        var questionObj = [];
        var responseState = this.props.responseState;
        var responseStateLength = Object.keys(responseState).length;
        var prevAnswers = [];
        for (var i = 0; i < length; i++) {
            questionObj[i] = 0;
        }
        for (var i = responseStateLength - 1; i >= 0; i--) {
            if (responseState[i].question_id == this.props.questionID) {
                prevAnswers = responseState[i].response_data;
                for (var i2 = 0; i2 < length; i2++) {
                    if (prevAnswers[i2] == 1) {
                        questionObj[i2] = 1;
                    }
                }
            }
        }
        return questionObj;
    },

    freeResponseResponseState: function freeResponseResponseState() {
        var responseState = this.props.responseState;
        var responseStateLength = Object.keys(responseState).length;
        var prevAnswer = "Change Me!";
        for (var i = responseStateLength - 1; i >= 0; i--) {
            if (responseState[i].question_id == this.props.questionID) {
                prevAnswer = responseState[i].response_data;
            }
        }
        return prevAnswer;
    },

    ratingResponseState: function ratingResponseState() {
        var responseState = this.props.responseState;
        var responseStateLength = Object.keys(responseState).length;
        var prevAnswer = 5;
        for (var i = responseStateLength - 1; i >= 0; i--) {
            if (responseState[i].question_id == this.props.questionID) {
                prevAnswer = responseState[i].response_data;
            }
        }
        return prevAnswer;
    },

    /* Our children are dynamic so I wanted to make sure we're including keys where we can, questionID's are unique and by adding .card we'll ensure
    they're unique from further children down the line, otherwise this layer just looks to generate the correct type of question card based off of 
    this.props.response_format as well as a <TitleSection> component which is passed this.props.title*/
    render: function render() {
        var cardType = "";
        var key = String(this.props.questionID) + "." + "card";
        if (this.props.response_format == "multipleChoice") {
            cardType = React.createElement(MultipleChoice, _extends({ key: key, questionState: this.multipleChoiceResponseState() }, this.props));
        } else if (this.props.response_format == "rating") {
            cardType = React.createElement(Rating, _extends({ key: key, questionState: this.ratingResponseState() }, this.props));
        } else if (this.props.response_format == "trueOrFalse") {
            cardType = React.createElement(SingleChoice, _extends({ key: key, questionState: this.singleChoiceResponseState() }, this.props));
        } else if (this.props.response_format == "freeResponse") {
            cardType = React.createElement(FreeResponse, _extends({ key: key, questionState: this.freeResponseResponseState() }, this.props));
        } else {
            console.log("not Valid card type");
            return undefined;
        }
        return React.createElement(
            "div",
            { className: "updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--12-col-desktop" },
            React.createElement(
                "div",
                null,
                React.createElement(TitleSection, { titleText: this.props.title }),
                cardType
            )
        );
    }
});
"use strict";

/*
* Page is the overall container that gets mounted into our HTML file
*/
module.exports = React.createClass({
    displayName: 'Page',
    //if we're not logged in we want to render a Welcome menu
    render: function render() {
        if (!loggedIn()) {
            return React.createElement(Welcome, null);
        }
        /*data is a variable defined in dashboard.html as var data = {% raw survey_json %}
        which is a json of the unaswered_surveys list from the db, we map it out so each item
        is a survey that gets it's own SurveyDiv react component'*/
        else {
                routesObject = this.props.routes;
                if (data.length == 0) {
                    return React.createElement(
                        "div",
                        null,
                        "You don't have any open surveys right now. You can ",
                        React.createElement(
                            "a",
                            { href: "/rawdump" },
                            "view"
                        ),
                        " survey results or ",
                        React.createElement(
                            "a",
                            { href: "/surveys" },
                            "create"
                        ),
                        " your own survey using the bar on the left."
                    );
                }
                var itemNodes = data.map(function (item) {
                    return React.createElement(SurveyDiv, {
                        key: item.id,
                        questions: item.questions,
                        routes: routesObject,
                        surveyID: item.id,
                        department: item.department,
                        creator: item.creator,
                        isInstructor: item.isInstructor });
                });
                var answeredSurveys;
                if (itemNodes.length < 10) {
                    var ids = user_data[0].answered_surveys;
                    ids.length = 10 - itemNodes.length;
                    answeredSurveys = ids.map(function (id, idx) {
                        return React.createElement(ResponseCard, { surveyID: id, key: idx });
                    });
                }
                //return the surveyDiv's in an mdl-grid with a SurveyCreationCard below it (This will probably change after Survey Creation is migrated)
                return React.createElement(
                    "div",
                    { className: "mdl-grid mdl-cell--12-col content" },
                    React.createElement(
                        "div",
                        { className: "mainDiv" },
                        itemNodes,
                        answeredSurveys
                    )
                );
            }
    }
});

var SurveyDiv = React.createClass({
    displayName: "SurveyDiv",


    /* SurveyDiv contains the overarching json we're looking to submit through ajax as well as a secondary functionality that makes the card disappear after Submit is pressed
    getInitialState initializes our response json in it's state as well as other information we need to know to make everything work */
    getInitialState: function getInitialState() {
        return {
            length: 0,
            showCard: true,
            iter: 0,
            responseSize: 0,
            response: {
                survey_id: 0,
                question_responses: []
            },
            responded: false
        };
    },

    componentDidMount: function componentDidMount() {
        this.setState({
            length: Object.keys(this.props.questions).length,
            response: {
                survey_id: this.props.surveyID,
                question_responses: []
            }
        });
    },

    //handler is called in footer.jsx, it receives data about the card that's currently being rendered updating the response state one last time before posting through ajax
    handleSurveySubmit: function handleSurveySubmit(survey, questionID, response_format) {
        var response = this.state.response;
        var question_responses_object = {
            response_format: response_format,
            question_id: questionID,
            response_data: survey
        };

        //iterate through our question_responses looking to see if the question has previously been answered before, if so we replace the previous answer state by splicing and pushing
        var length = Object.keys(response.question_responses).length;
        for (var i = length - 1; i >= 0; i--) {
            if (response.question_responses[i].question_id == questionID) {
                response.question_responses.splice(i, 1);
            }
        }
        response.question_responses.push(question_responses_object);
        this.setState({ response: response });

        $.ajax({
            url: this.props.routes.response,
            contentType: 'application/json',
            type: 'POST',
            data: JSON.stringify(response),
            success: function (data) {
                this.setState({ responded: true });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(this.state.response);
                console.error("/api/response", status, err.toString());
            }.bind(this)
        });
    },

    //called in the ajax success function, sets showCard to false which will make the SurveyDiv stop rendering
    removeCard: function removeCard() {
        this.setState({ showCard: false });
    },

    /*nextQuestion and prevQuestion have similar functionality to submit, just without the ajax, we check to see if it's been previously answered
    with a for loop looking to match on questionID and then splicing and pushing if we match (otherwise just pushing) but we also increment or decrement
    this.state.iter*/
    nextQuestion: function nextQuestion(survey, questionID, response_format) {
        var response = this.state.response;
        var question_responses_object = {
            response_format: response_format,
            question_id: questionID,
            response_data: survey
        };

        var length = Object.keys(response.question_responses).length;
        for (var i = length - 1; i >= 0; i--) {
            if (response.question_responses[i].question_id == questionID) {
                response.question_responses.splice(i, 1);
            }
        }

        response.question_responses.push(question_responses_object);

        this.setState({ response: response });
        this.setState({ responseSize: Object.keys(this.state.response.question_responses).length });

        var iter = this.state.iter;

        this.setState({ iter: iter + 1 });
    },

    prevQuestion: function prevQuestion(survey, questionID, response_format) {
        var response = this.state.response;
        var question_responses_object = {
            response_format: response_format,
            question_id: questionID,
            response_data: survey
        };

        var length = Object.keys(response.question_responses).length;
        for (var i = length - 1; i >= 0; i--) {
            if (response.question_responses[i].question_id == questionID) {
                response.question_responses.splice(i, 1);
            }
        }

        response.question_responses.push(question_responses_object);

        this.setState({ response: response });
        this.setState({ responseSize: Object.keys(this.state.response.question_responses).length });

        var iter = this.state.iter;

        this.setState({ iter: iter - 1 });
    },

    render: function render() {
        if (this.state.responded) {
            return React.createElement(ResponseCard, this.props);
        } else
            /*if showCard state is true, then we render <Card>, questionID, title, options, response_format vary depending on this.state.iter
            which is manipulated by the previous and next buttons so we can have all the survey's questions on one card.*/
            if (this.state.showCard == true) {
                return React.createElement(
                    "div",
                    { className: "surveyDiv" },
                    React.createElement(Card, {
                        routes: this.props.routes,
                        questionNum: this.state.iter,
                        questionID: this.props.questions[this.state.iter].id,
                        responseSize: this.state.responseSize,
                        numQuestions: Object.keys(this.props.questions).length,
                        title: this.props.questions[this.state.iter].title,
                        options: this.props.questions[this.state.iter].options,
                        response_format: this.props.questions[this.state.iter].response_format,
                        surveyID: this.props.surveyID,
                        department: this.props.department,
                        creator: this.props.creator,
                        isInstructor: this.props.isInstructor,
                        removeHandler: this.removeCard,
                        nextHandler: this.nextQuestion,
                        prevHandler: this.prevQuestion,
                        onSubmit: this.handleSurveySubmit,
                        responseState: this.state.response.question_responses })
                );
            } else {
                return React.createElement("div", null);
            }
    }
});

function loggedIn() {
    return document.cookie.indexOf("user") > -1;
}
"use strict";

var Welcome = React.createClass({
	displayName: "Welcome",

	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(About, null),
			React.createElement(Login, null)
		);
	}
});

var About = React.createClass({
	displayName: "About",

	render: function render() {
		return React.createElement(
			"div",
			{ className: "updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--8-col" },
			React.createElement(
				"p",
				null,
				"Campus Consensus is a survey and data collection system developed for improving student-faculty relationships at universities being developed at University Colorado at Boulder. Our platform allows students and faculty to ask questions and offer short surveys to improve instructional quality, align student and faculty interests, and express consensus about campus issues."
			),
			React.createElement(
				"p",
				null,
				"Students in the same class or department can learn about how other students feel about the quality of the course or what is working and what is not. Similarly, faculty can get fine-grain information about how their instruction is being received by their students."
			),
			React.createElement(
				"p",
				null,
				"Our data will be available to the entire campus in an anonymous form. The project is being developed by computer science seniors at University of Colorado Boulder."
			),
			React.createElement(
				"p",
				null,
				"Please contact our project leads with any questions:"
			),
			React.createElement(
				"ul",
				null,
				React.createElement(
					"li",
					null,
					"antsankov [at] gmail [dot] com"
				),
				React.createElement(
					"li",
					null,
					"michael [dot] skirpan [at] colorado [dot] edu"
				)
			)
		);
	}
});

var Login = React.createClass({
	displayName: "Login",

	render: function render() {
		return React.createElement(
			"div",
			{ className: "updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col" },
			React.createElement(
				"form",
				{ action: "/register/culdap", method: "post" },
				React.createElement(
					"label",
					null,
					"CU Login Name"
				),
				React.createElement("input", { type: "text", name: "username", required: true }),
				React.createElement(
					"label",
					null,
					"Password"
				),
				React.createElement("input", { type: "password", name: "password", required: true }),
				React.createElement("input", { type: "submit", id: "loginbtn", name: "login", value: "Log In", "class": "button" })
			)
		);
	}
});
"use strict";

/*
* Page with the Card for the creation of surveys
* is passing survey[0].questions
*/

//can pass variables
var SurveysPage = React.createClass({
    displayName: "SurveysPage",


    /*eventually we'll make some interface to change these states, but
    item_id and item_name should be the same*/
    getInitialState: function getInitialState() {
        return {
            numQuestion: 0,
            item_id: "",
            item_type: "Group",
            item_name: "",
            questions: [{ title: "", response_format: "", options: [] }]
        };
    },

    /*update title of survey*/
    updateTitle: function updateTitle(surveyTitle) {
        this.setState({ item_name: surveyTitle });
    },

    /*checks that all the required fields are filled*/
    checkSurvey: function checkSurvey(survey) {
        //check group
        if (survey.item_id == "") {
            alert("Specify a group to post to");
            return false;
        }
        //check title
        if (survey.item_name == "") {
            alert("Complete the Survey Title");
            return false;
        }
        //check questions
        for (var i = 0; i < survey.questions.length; i++) {
            if (survey.questions[i].title == "") {
                alert("Every Question should have a title.");
                return false;
            }
            //two options minimum
            if (survey.questions[i].response_format == "multipleChoice" || survey.questions[i].response_format == "trueOrFalse") {
                if (survey.questions[i].options.length < 2) {
                    alert("Add at least two options.");
                    return false;
                }
            }
            //options must have titles
            for (var i2 = 0; i2 < survey.questions[i].options.length; i2++) {
                if (survey.questions[i].options[i2].title == "") {
                    alert("Options should have a title");
                    return false;
                }
            }
        }
        return true;
    },

    setRecipient: function setRecipient(surveyRecipient, recipientType) {
        this.setState({
            item_type: recipientType,
            item_id: surveyRecipient
        });
    },
    /*onChange of just about anything, we get an array of json's holding
    each question's data and update our state'*/
    updateQuestions: function updateQuestions(questionObj, questionKey) {
        var length = this.state.questions.length;
        var questions = this.state.questions;
        var optionsLength;
        for (var i = length - 1; i >= 0; i--) {
            if (questionKey == questions[i].key) {
                questions[i].title = questionObj.title;
                questions[i].response_format = questionObj.response_format;
                optionsLength = questionObj.options.length;
                questions[i].options = questionObj.options;
            }
        }
        this.setState({ questions: questions });
    },

    /*when we click finish survey, we prune the key field off of each question
    json we've made, and then we generate the final Options arrays for each
    option filed in a question, then we post a final json to the api*/

    handleSubmit: function handleSubmit() {

        var surveyObj = {
            item_id: this.state.item_id,
            item_type: this.state.item_type,
            item_name: this.state.item_name,
            questions: this.state.questions
        };

        var test = this.checkSurvey(surveyObj);

        if (test == true) {
            var questions = this.state.questions;
            var questionsLength = questions.length;
            var optionsLength;
            var finalOptions = [];
            for (var i = questionsLength - 1; i >= 0; i--) {
                delete questions[i].key;
                finalOptions = [];
                optionsLength = questions[i].options.length;
                for (var i2 = optionsLength - 1; i2 >= 0; i2--) {
                    finalOptions.push(questions[i].options[i2].title);
                }
                questions[i].options = finalOptions;
            }

            surveyObj.questions = questions;

            $.ajax({
                url: this.props.routes.surveys,
                contentType: 'application/json',
                type: 'POST',
                data: JSON.stringify(surveyObj),
                success: function (data) {
                    location.reload();
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error("/api/response", status, err.toString());
                }.bind(this)
            });
        }
    },

    //mdl in new questions, this probably needs to be moved or repeated
    componentDidUpdate: function componentDidUpdate() {
        componentHandler.upgradeDom();
    },

    /*this handles adding a new question, we push these nodes
            {
                "title" : "",
                "response_format" : "",
                "options":[],
                "key": null
            }
    to the questions array state, updating the key before pushing*/
    handleAdding: function handleAdding(newQuestion) {
        var numQuestion = this.state.numQuestion;
        numQuestion = numQuestion + 1;
        newQuestion.key = numQuestion;
        var currQuestions = this.state.questions;
        var newQuestions = currQuestions.push(newQuestion);
        this.setState({
            numQuestion: numQuestion,
            questions: currQuestions
        });
    },

    render: function render() {
        return React.createElement(
            "div",
            { className: "updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--12-col-desktop" },
            React.createElement(
                "div",
                null,
                React.createElement(TitleSection, { titleText: "Create a Survey" }),
                React.createElement(
                    "div",
                    { style: { paddingLeft: "30px" }, className: "mdl-card__supporting-text mdl-color-text--grey-600" },
                    React.createElement(SearchCard, { routes: this.props.routes, setRecipient: this.setRecipient }),
                    React.createElement(SurveyTitleCreation, { titleSurvey: this.state.item_name, updateTitle: this.updateTitle }),
                    React.createElement(
                        "h4",
                        null,
                        "Questions:"
                    )
                ),
                React.createElement(QuestionDiv, { questions: this.state.questions, updateQuestions: this.updateQuestions }),
                React.createElement(AddQuestion, { onAdding: this.handleAdding }),
                React.createElement(FinishSurvey, { onSubmit: this.handleSubmit })
            )
        );
    }
});

/*map out a react component for each question we want*/
var QuestionDiv = React.createClass({
    displayName: "QuestionDiv",


    render: function render() {
        if (this.props.questions.length > 0) {
            var questionNodes = this.props.questions.map(function (question) {
                var fieldsKey = question.key + ".question";
                return React.createElement(Fields, { questionKey: question.key, key: fieldsKey, updateQuestions: this.props.updateQuestions });
            }.bind(this));
        } else {
            return React.createElement("div", null);
        }
        return React.createElement(
            "div",
            { className: "commentList" },
            questionNodes
        );
    }
});

/*
* Fields controls the overarching data for a question
*/
var Fields = React.createClass({
    displayName: "Fields",


    //set initial value
    getInitialState: function getInitialState() {
        return {
            title: '',
            response_format: 'multipleChoice',
            options: []
        };
    },

    //updates this.state.title
    handleTitleChange: function handleTitleChange(event) {
        this.setState({ title: event.target.value });
        this.updateTitle(event.target.value);
    },

    //updates this.state.response_format
    handleResponseFormatChange: function handleResponseFormatChange(event) {
        this.setState({ response_format: event.target.value });
        this.updateResponseFormat(event.target.value);
    },

    //updates this.state.options
    onOptionsChange: function onOptionsChange(options) {
        this.setState({ options: options });
        this.updateOptions(options);
    },

    updateTitle: function updateTitle(title) {
        var questionObj = {
            title: title,
            response_format: this.state.response_format,
            options: this.state.options
        };
        this.props.updateQuestions(questionObj, this.props.questionKey);
    },

    updateResponseFormat: function updateResponseFormat(response_format) {
        var questionObj = {
            title: this.state.title,
            response_format: response_format,
            options: this.state.options
        };
        this.props.updateQuestions(questionObj, this.props.questionKey);
    },

    updateOptions: function updateOptions(options) {
        var questionObj = {
            title: this.state.title,
            response_format: this.state.response_format,
            options: options
        };
        this.props.updateQuestions(questionObj, this.props.questionKey);
    },

    render: function render() {
        return React.createElement(
            "div",
            { className: "mdl-card__supporting-text mdl-color-text--grey-600" },
            React.createElement(
                "div",
                { className: "mdl-textfield mdl-js-textfield" },
                React.createElement("input", { className: "mdl-textfield__input",
                    type: "text",
                    id: "question_title",
                    value: this.state.title,
                    onChange: this.handleTitleChange }),
                React.createElement(
                    "label",
                    { className: "mdl-textfield__label" },
                    "Question title"
                )
            ),
            React.createElement(
                "p",
                null,
                "Type:",
                React.createElement(
                    "select",
                    {
                        id: "mySelect",
                        onChange: this.handleResponseFormatChange,
                        value: this.state.value },
                    React.createElement(
                        "option",
                        { value: "multipleChoice" },
                        "Multiple Choice"
                    ),
                    React.createElement(
                        "option",
                        { value: "trueOrFalse" },
                        "Single Choice"
                    ),
                    React.createElement(
                        "option",
                        { value: "rating" },
                        "Rating Scale"
                    ),
                    React.createElement(
                        "option",
                        { value: "freeResponse" },
                        "Free Response"
                    )
                )
            ),
            React.createElement(OptionsDiv, { response_format: this.state.response_format, onOptionsChange: this.onOptionsChange, questionKey: this.props.questionKey })
        );
    }
});

//depending on this.state.response_format we want to change our options field
//formats
var OptionsDiv = React.createClass({
    displayName: "OptionsDiv",


    render: function render() {
        if (this.props.response_format == "multipleChoice") {

            return React.createElement(
                "div",
                null,
                React.createElement(CheckboxQuestion, { onOptionsChange: this.props.onOptionsChange, questionKey: this.props.questionKey })
            );
        } else if (this.props.response_format == "trueOrFalse") {
            return React.createElement(
                "div",
                null,
                React.createElement(CheckboxQuestion, { onOptionsChange: this.props.onOptionsChange, questionKey: this.props.questionKey })
            );
        } else if (this.props.response_format == "rating") {
            return React.createElement("p", null);
        } else if (this.props.response_format == "freeResponse") {
            return React.createElement("p", null);
        } else {
            return React.createElement("p", { onChange: this.changeHandler });
        }
    }
});

/* controls the data for our options fields*/
var CheckboxQuestion = React.createClass({
    displayName: "CheckboxQuestion",


    getInitialState: function getInitialState() {
        return {
            numOptions: 0,
            options: []
        };
    },
    /*called when add option is clicked, pushes a node with a key and blank
    title that we update ourselves, we prune the key in the highest layer
    when we no longer need it for organization*/
    addOption: function addOption() {
        var options = this.state.options;
        var numOptions = this.state.numOptions;
        var optionObject = {
            key: numOptions,
            title: ''
        };
        options.push(optionObject);
        this.setState({
            numOptions: numOptions + 1,
            options: options
        });
    },

    //whenever we change an option we update it's corresponding index in
    //our options array, and also send data up to Fields
    onOptionChange: function onOptionChange(newTitle, key) {
        var options = this.state.options;
        var length = options.length;
        for (var i = length - 1; i >= 0; i--) {
            if (options[i].key == key) {
                options[i].title = newTitle;
            }
        }
        this.setState({
            options: options
        });
        this.props.onOptionsChange(options);
    },

    render: function render() {
        var _this = this;

        var renderedOptions = this.state.options.map(function (option, i) {
            var optionKey = _this.props.questionKey + ".question." + option.key + ".option";
            var liKey = _this.props.questionKey + ".question." + option.key + ".li";
            return React.createElement(
                "li",
                { className: "mdl-list__item", key: liKey },
                React.createElement(CheckboxOption, { key: optionKey, keyProp: option.key, onOptionChange: _this.onOptionChange })
            );
        });

        return React.createElement(
            "div",
            null,
            React.createElement(
                "ul",
                { className: "no_bullets mdl-list" },
                renderedOptions,
                React.createElement(
                    "li",
                    { className: "mdl-list__item" },
                    React.createElement(
                        "p",
                        null,
                        React.createElement(
                            "button",
                            { className: "mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab", onClick: this.addOption },
                            React.createElement(
                                "i",
                                { className: "material-icons" },
                                "add"
                            )
                        ),
                        "    ADD OPTION"
                    )
                )
            )
        );
    }
});

/*this layer could be merged into MultipleChoiceQuestion fairly easily, renders a text field for every option that we want, onChange it sends data to MultipleChoiceQuestion which starts the chain of it's propagation to the highest layer*/

var CheckboxOption = React.createClass({
    displayName: "CheckboxOption",


    getInitialState: function getInitialState() {
        return {
            title: ''
        };
    },

    handleChange: function handleChange(event) {
        this.setState({ title: event.target.value });
        this.props.onOptionChange(event.target.value, this.props.keyProp);
    },

    render: function render() {
        return React.createElement(
            "div",
            { className: "mdl-textfield mdl-js-textfield" },
            React.createElement(
                "p",
                null,
                "Enter an option:  ",
                React.createElement("input", { className: "mdl-textfield__input",
                    type: "text",
                    onChange: this.handleChange,
                    value: this.state.title })
            )
        );
    }
});

/*Called onClick of Add Question button, sends a default JSON to SurveysPage to be added questions state*/
var AddQuestion = React.createClass({
    displayName: "AddQuestion",

    /*
    * Adding questions
    */
    addQuestion: function addQuestion() {
        this.props.onAdding({
            "title": "",
            "response_format": "",
            "options": [],
            "key": null
        });
    },

    render: function render() {
        return React.createElement(
            "button",
            { onClick: this.addQuestion, className: "mdl-cell mdl-cell--4-col mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" },
            "ADD QUESTION"
        );
    }
});

/*called onClick of Finish Survey button, triggers handleSubmit in SurveysPage
which cleans the data and uses ajax to POST it*/
var FinishSurvey = React.createClass({
    displayName: "FinishSurvey",


    render: function render() {
        var style = {
            position: "absolute"
        };
        return React.createElement(
            "button",
            { onClick: this.props.onSubmit, className: "mdl-cell mdl-cell--4-col mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent right_button" },
            "FINISH SURVEY"
        );
    }
});

var SurveyTitleCreation = React.createClass({
    displayName: "SurveyTitleCreation",

    //set initial value
    getInitialState: function getInitialState() {
        return {
            item_name: ''
        };
    },

    //updates this.state.title
    handleTitleChange: function handleTitleChange(event) {
        this.setState({ item_name: event.target.value });
        this.props.updateTitle(event.target.value);
    },

    render: function render() {
        return React.createElement(
            "h4",
            null,
            "Survey Title:",
            React.createElement("input", { className: "mdl-textfield__input",
                type: "text",
                value: this.state.item_name,
                onChange: this.handleTitleChange })
        );
    }
});
"use strict";

/*
*
* Footer
* Contains a combination of Next, Previous, and Submit buttons either active or inactive when they're inapplicable
*/
var Footer = React.createClass({
    displayName: "Footer",

    render: function render() {
        //first question, survey not filled out, survey is longer than one question previous is inactive, submit is inactive
        if (this.props.questionNum == 0 && this.props.responseSize != this.props.numQuestions && this.props.numQuestions != 1) {
            return React.createElement(
                "div",
                { className: "mdl-grid mdl-card__title mdl-card--expand mdl-300" },
                React.createElement(
                    "button",
                    { className: "mdl-cell mdl-cell--4-col mdl-button mdl-js-button mdl-button--raised", disabled: true },
                    "Previous"
                ),
                React.createElement(Progress, {
                    questionNum: this.props.questionNum,
                    numQuestions: this.props.numQuestions,
                    responseSize: this.props.responseSize }),
                React.createElement(NextButton, {
                    nextHandler: this.props.nextHandler,
                    surveyData: this.props.surveyData,
                    questionID: this.props.questionID,
                    response_format: this.props.response_format }),
                React.createElement("div", { className: "mdl-cell mdl-cell--2-col" }),
                React.createElement(
                    "button",
                    { className: "surveySubmit mdl-cell mdl-cell--8-col mdl-button mdl-js-button mdl-button--raised", disabled: true },
                    "Submit"
                ),
                React.createElement("div", { className: "mdl-cell mdl-cell--2-col" })
            );
        }
        //survey is one question long
        else if (this.props.questionNum == 0 && this.props.numQuestions == 1) {
                return React.createElement(
                    "div",
                    { className: "mdl-grid mdl-card__title mdl-card--expand mdl-300" },
                    React.createElement(
                        "button",
                        { className: "mdl-cell mdl-cell--4-col mdl-button mdl-js-button mdl-button--raised", disabled: true },
                        "Previous"
                    ),
                    React.createElement(Progress, {
                        questionNum: this.props.questionNum,
                        numQuestions: this.props.numQuestions,
                        responseSize: this.props.responseSize }),
                    React.createElement(
                        "button",
                        { className: "mdl-cell mdl-cell--4-col mdl-button mdl-js-button mdl-button--raised", disabled: true },
                        "Next"
                    ),
                    React.createElement("div", { className: "mdl-cell mdl-cell--2-col" }),
                    React.createElement(SubmitButton, {
                        onSubmit: this.props.onSubmit,
                        surveyData: this.props.surveyData,
                        questionID: this.props.questionID,
                        response_format: this.props.response_format }),
                    React.createElement("div", { className: "mdl-cell mdl-cell--2-col" })
                );
            }
            // first question, survey is filled out, previous is inactive, but we can submit
            else if (this.props.questionNum == 0 && this.props.responseSize == this.props.numQuestions) {
                    return React.createElement(
                        "div",
                        { className: "mdl-grid mdl-card__title mdl-card--expand mdl-300" },
                        React.createElement(
                            "button",
                            { className: "mdl-cell mdl-cell--4-col mdl-button mdl-js-button mdl-button--raised", disabled: true },
                            "Previous"
                        ),
                        React.createElement(Progress, {
                            questionNum: this.props.questionNum,
                            numQuestions: this.props.numQuestions,
                            responseSize: this.props.responseSize }),
                        React.createElement(NextButton, {
                            nextHandler: this.props.nextHandler,
                            surveyData: this.props.surveyData,
                            questionID: this.props.questionID,
                            response_format: this.props.response_format }),
                        React.createElement("div", { className: "mdl-cell mdl-cell--2-col" }),
                        React.createElement(SubmitButton, {
                            onSubmit: this.props.onSubmit,
                            surveyData: this.props.surveyData,
                            questionID: this.props.questionID,
                            response_format: this.props.response_format }),
                        React.createElement("div", { className: "mdl-cell mdl-cell--2-col" })
                    );
                }
                //if we're on the last question for the first time we want to be able to submit but not go to the next question
                else if (this.props.questionNum == this.props.numQuestions - 1) {
                        return React.createElement(
                            "div",
                            { className: "mdl-grid mdl-card__title mdl-card--expand mdl-300" },
                            React.createElement(PrevButton, {
                                prevHandler: this.props.prevHandler,
                                surveyData: this.props.surveyData,
                                questionID: this.props.questionID,
                                response_format: this.props.response_format }),
                            React.createElement(Progress, {
                                questionNum: this.props.questionNum,
                                numQuestions: this.props.numQuestions,
                                responseSize: this.props.responseSize }),
                            React.createElement(
                                "button",
                                { className: "mdl-cell mdl-cell--4-col mdl-button mdl-js-button mdl-button--raised", disabled: true },
                                "Next"
                            ),
                            React.createElement("div", { className: "mdl-cell mdl-cell--2-col" }),
                            React.createElement(SubmitButton, {
                                onSubmit: this.props.onSubmit,
                                surveyData: this.props.surveyData,
                                questionID: this.props.questionID,
                                response_format: this.props.response_format }),
                            React.createElement("div", { className: "mdl-cell mdl-cell--2-col" })
                        );
                    }
                    //if we return to the last question at some point after backtracking it actually requires a different condition since responseSize grows
                    else if (this.props.questionNum == this.props.numQuestions && this.props.responseSize == this.props.numQuestions) {
                            return React.createElement(
                                "div",
                                { className: "mdl-grid mdl-card__title mdl-card--expand mdl-300" },
                                React.createElement(PrevButton, {
                                    prevHandler: this.props.prevHandler,
                                    surveyData: this.props.surveyData,
                                    questionID: this.props.questionID,
                                    response_format: this.props.response_format }),
                                React.createElement(Progress, {
                                    questionNum: this.props.questionNum,
                                    numQuestions: this.props.numQuestions,
                                    responseSize: this.props.responseSize }),
                                React.createElement(
                                    "button",
                                    { className: "mdl-cell mdl-cell--4-col mdl-button mdl-js-button mdl-button--raised", disabled: true },
                                    "Next"
                                ),
                                React.createElement("div", { className: "mdl-cell mdl-cell--2-col" }),
                                React.createElement(SubmitButton, {
                                    onSubmit: this.props.onSubmit,
                                    surveyData: this.props.surveyData,
                                    questionID: this.props.questionID,
                                    response_format: this.props.response_format }),
                                React.createElement("div", { className: "mdl-cell mdl-cell--2-col" })
                            );
                        }
                        //not the first question, not the last question, and survey not filled out, submit is inactive
                        else if (this.props.questionNum != 0 && this.props.questionNum != this.props.numQuestions && this.props.responseSize != this.props.numQuestions) {
                                return React.createElement(
                                    "div",
                                    { className: "mdl-grid mdl-card__title mdl-card--expand mdl-300" },
                                    React.createElement(PrevButton, {
                                        prevHandler: this.props.prevHandler,
                                        surveyData: this.props.surveyData,
                                        questionID: this.props.questionID,
                                        response_format: this.props.response_format }),
                                    React.createElement(Progress, {
                                        questionNum: this.props.questionNum,
                                        numQuestions: this.props.numQuestions,
                                        responseSize: this.props.responseSize }),
                                    React.createElement(NextButton, {
                                        nextHandler: this.props.nextHandler,
                                        surveyData: this.props.surveyData,
                                        questionID: this.props.questionID,
                                        response_format: this.props.response_format }),
                                    React.createElement("div", { className: "mdl-cell mdl-cell--2-col" }),
                                    React.createElement(
                                        "button",
                                        { className: "surveySubmit mdl-cell mdl-cell--8-col mdl-button mdl-js-button mdl-button--raised", disabled: true },
                                        "Submit"
                                    ),
                                    React.createElement("div", { className: "mdl-cell mdl-cell--2-col" })
                                );
                            }
                            //not the first question, not the last question, survey is filled out, all buttons are active
                            else if (this.props.questionNum != 0 && this.props.questionNum != this.props.numQuestions && this.props.responseSize == this.props.numQuestions) {
                                    return React.createElement(
                                        "div",
                                        { className: "mdl-grid mdl-card__title mdl-card--expand mdl-300" },
                                        React.createElement(PrevButton, {
                                            prevHandler: this.props.prevHandler,
                                            surveyData: this.props.surveyData,
                                            questionID: this.props.questionID,
                                            response_format: this.props.response_format }),
                                        React.createElement(Progress, {
                                            questionNum: this.props.questionNum,
                                            numQuestions: this.props.numQuestions,
                                            responseSize: this.props.responseSize }),
                                        React.createElement(NextButton, {
                                            nextHandler: this.props.nextHandler,
                                            surveyData: this.props.surveyData,
                                            questionID: this.props.questionID,
                                            response_format: this.props.response_format }),
                                        React.createElement("div", { className: "mdl-cell mdl-cell--2-col" }),
                                        React.createElement(SubmitButton, {
                                            onSubmit: this.props.onSubmit,
                                            surveyData: this.props.surveyData,
                                            questionID: this.props.questionID,
                                            response_format: this.props.response_format }),
                                        React.createElement("div", { className: "mdl-cell mdl-cell--2-col" })
                                    );
                                }
    }
});

//creates a progress bar that fills up as you answer questions.
var Progress = React.createClass({
    displayName: "Progress",

    render: function render() {
        var progressValue = (this.props.responseSize + 1) / this.props.numQuestions * 100;
        return React.createElement("progress", { id: "myProgress", className: "mdl-cell mdl-cell--4-col bar", value: progressValue, max: "100" });
    }
});

//previous button that takes the questionID and the question response data and format and sends it to prevHandler in SurveyDiv
var PrevButton = React.createClass({
    displayName: "PrevButton",

    clickHandler: function clickHandler() {
        var surveyData = this.props.surveyData;
        var questionID = this.props.questionID;
        var response_format = this.props.response_format;
        this.props.prevHandler(surveyData, questionID, response_format);
    },
    render: function render() {
        return React.createElement(
            "button",
            { onClick: this.clickHandler, className: "mdl-cell mdl-cell--4-col mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" },
            "Previous"
        );
    }
});

//same as previous button but goes to the nextHandler in SurveyDiv
var NextButton = React.createClass({
    displayName: "NextButton",

    clickHandler: function clickHandler() {
        var surveyData = this.props.surveyData;
        var questionID = this.props.questionID;
        var response_format = this.props.response_format;
        this.props.nextHandler(surveyData, questionID, response_format);
    },
    render: function render() {
        return React.createElement(
            "button",
            { onClick: this.clickHandler, className: "mdl-cell mdl-cell--4-col mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" },
            "Next"
        );
    }
});

//Submit button does the same as the next and previous button but sends to the submitHandler in SurveyDiv
var SubmitButton = React.createClass({
    displayName: "SubmitButton",

    clickHandler: function clickHandler() {
        var surveyData = this.props.surveyData;
        var questionID = this.props.questionID;
        var response_format = this.props.response_format;
        this.props.onSubmit(surveyData, questionID, response_format);
    },
    render: function render() {
        return React.createElement(
            "button",
            { onClick: this.clickHandler, className: "surveySubmit mdl-cell mdl-cell--8-col mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--accent" },
            "Submit"
        );
    }
});
"use strict";

var ProfilePage = React.createClass({
  displayName: "ProfilePage",

  getInitialState: function getInitialState() {
    var user_affiliation = user_data[0].primary_affiliation;
    var user_gender = user_data[0].gender;
    var user_ethnicity = user_data[0].ethnicity;
    var user_native_language = user_data[0].native_language;
    var affiliation = _.pull(extra_data[0].primary_affiliation, user_affiliation);
    var gender = _.pull(extra_data[0].gender, user_gender);
    var ethnicity = _.pull(extra_data[0].ethnicity, user_ethnicity);
    var native_language = _.pull(extra_data[0].native_language, user_native_language);
    var user_status = null;
    var status = null;
    if (user_affiliation == "Student" || user_affiliation == "Both") {
      var user_status = user_data[0].status;
      var status = _.pull(extra_data[0].status, user_status);
    }
    return {
      username: user_data[0].username,
      email: user_data[0].email,
      dob: user_data[0].dob,
      user_affiliation: user_affiliation,
      user_gender: user_gender,
      user_ethnicity: user_ethnicity,
      user_native_language: user_native_language,
      user_status: user_status,
      affiliation: affiliation,
      gender: gender,
      ethnicity: ethnicity,
      native_language: native_language,
      status: status,
      edit: false
    };
  },
  handleChange: function handleChange(key) {
    return function (e) {
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  },
  handleClick: function handleClick(event) {
    this.setState({ edit: !this.state.edit });
  },
  render: function render() {
    var style = {
      listStyleType: "none",
      fontSize: "20px"
    };
    var academic_year = null;
    if (this.state.user_affiliation != "Faculty") {
      academic_year = React.createElement(
        "li",
        null,
        "Academic Year: ",
        this.state.user_status
      );
    }
    if (this.state.edit == false) {
      return React.createElement(
        "ul",
        { style: style },
        React.createElement(
          "button",
          { type: "button", onClick: this.handleClick },
          "edit"
        ),
        React.createElement("br", null),
        React.createElement(
          "li",
          null,
          "Username: ",
          this.state.username
        ),
        React.createElement(
          "li",
          null,
          "Affiliation: ",
          this.state.user_affiliation
        ),
        React.createElement(
          "li",
          null,
          "Email: ",
          this.state.email
        ),
        React.createElement(
          "li",
          null,
          "Birth Date: ",
          this.state.dob
        ),
        React.createElement(
          "li",
          null,
          "Gender: ",
          this.state.user_gender
        ),
        React.createElement(
          "li",
          null,
          "Ethnicity: ",
          this.state.user_ethnicity
        ),
        React.createElement(
          "li",
          null,
          "Native Language: ",
          this.state.user_native_language
        ),
        academic_year
      );
    } else {
      var academic_year_options = null;
      if (this.state.user_affiliation != "Faculty") {
        academic_year_options = React.createElement(
          "li",
          null,
          "Academic Year: ",
          React.createElement(
            "select",
            { name: "status" },
            React.createElement(
              "option",
              { value: this.state.user_status },
              this.state.user_status
            ),
            React.createElement(
              "option",
              { value: this.state.status[0] },
              this.state.status[0]
            ),
            React.createElement(
              "option",
              { value: this.state.status[1] },
              this.state.status[1]
            ),
            React.createElement(
              "option",
              { value: this.state.status[2] },
              this.state.status[2]
            ),
            React.createElement(
              "option",
              { value: this.state.status[3] },
              this.state.status[3]
            ),
            React.createElement(
              "option",
              { value: this.state.status[4] },
              this.state.status[4]
            )
          )
        );
      }
      return React.createElement(
        "ul",
        { style: style },
        React.createElement(
          "form",
          { action: "/profile", method: "post" },
          React.createElement(
            "button",
            { type: "button", onClick: this.handleClick },
            "edit"
          ),
          React.createElement("br", null),
          "Username: ",
          React.createElement("input", { name: "username", value: this.state.username, readOnly: true }),
          React.createElement("br", null),
          "Affiliation(s): ",
          React.createElement(
            "select",
            { name: "primary_affiliation" },
            React.createElement(
              "option",
              { value: this.state.user_affiliation },
              this.state.user_affiliation
            ),
            React.createElement(
              "option",
              { value: this.state.affiliation[0] },
              this.state.affiliation[0]
            ),
            React.createElement(
              "option",
              { value: this.state.affiliation[1] },
              this.state.affiliation[1]
            )
          ),
          React.createElement("br", null),
          "Email: ",
          React.createElement("input", { type: "email", name: "email", value: this.state.email, onChange: this.handleChange('email'), required: true }),
          React.createElement("br", null),
          "Birth Date: ",
          React.createElement("input", { type: "date", name: "dob", value: this.state.dob, onChange: this.handleChange('dob'), required: true }),
          React.createElement("br", null),
          "Gender: ",
          React.createElement(
            "select",
            { name: "gender" },
            React.createElement(
              "option",
              { value: this.state.user_gender },
              this.state.user_gender
            ),
            React.createElement(
              "option",
              { value: this.state.gender[0] },
              this.state.gender[0]
            ),
            React.createElement(
              "option",
              { value: this.state.gender[1] },
              this.state.gender[1]
            ),
            React.createElement(
              "option",
              { value: this.state.gender[2] },
              this.state.gender[2]
            )
          ),
          React.createElement("br", null),
          "Ethnicity: ",
          React.createElement(
            "select",
            { name: "ethnicity" },
            React.createElement(
              "option",
              { value: this.state.user_ethnicity },
              this.state.user_ethnicity
            ),
            React.createElement(
              "option",
              { value: this.state.ethnicity[0] },
              this.state.ethnicity[0]
            ),
            React.createElement(
              "option",
              { value: this.state.ethnicity[1] },
              this.state.ethnicity[1]
            ),
            React.createElement(
              "option",
              { value: this.state.ethnicity[2] },
              this.state.ethnicity[2]
            ),
            React.createElement(
              "option",
              { value: this.state.ethnicity[3] },
              this.state.ethnicity[3]
            ),
            React.createElement(
              "option",
              { value: this.state.ethnicity[4] },
              this.state.ethnicity[4]
            ),
            React.createElement(
              "option",
              { value: this.state.ethnicity[5] },
              this.state.ethnicity[5]
            ),
            React.createElement(
              "option",
              { value: this.state.ethnicity[6] },
              this.state.ethnicity[6]
            )
          ),
          React.createElement("br", null),
          "Native Language: ",
          React.createElement(
            "select",
            { name: "native_language" },
            React.createElement(
              "option",
              { value: this.state.user_native_language },
              this.state.user_native_language
            ),
            React.createElement(
              "option",
              { value: this.state.native_language[0] },
              this.state.native_language[0]
            ),
            React.createElement(
              "option",
              { value: this.state.native_language[1] },
              this.state.native_language[1]
            ),
            React.createElement(
              "option",
              { value: this.state.native_language[2] },
              this.state.native_language[2]
            ),
            React.createElement(
              "option",
              { value: this.state.native_language[3] },
              this.state.native_language[3]
            ),
            React.createElement(
              "option",
              { value: this.state.native_language[4] },
              this.state.native_language[4]
            ),
            React.createElement(
              "option",
              { value: this.state.native_language[5] },
              this.state.native_language[5]
            ),
            React.createElement(
              "option",
              { value: this.state.native_language[6] },
              this.state.native_language[6]
            ),
            React.createElement(
              "option",
              { value: this.state.native_language[7] },
              this.state.native_language[7]
            ),
            React.createElement(
              "option",
              { value: this.state.native_language[8] },
              this.state.native_language[8]
            ),
            React.createElement(
              "option",
              { value: this.state.native_language[9] },
              this.state.native_language[9]
            ),
            React.createElement(
              "option",
              { value: this.state.native_language[10] },
              this.state.native_language[10]
            ),
            React.createElement(
              "option",
              { value: this.state.native_language[11] },
              this.state.native_language[11]
            )
          ),
          React.createElement("br", null),
          academic_year_options,
          React.createElement("br", null),
          React.createElement("input", { type: "submit", value: "submit" })
        )
      );
    }
  }
});
"use strict";

var ProfileGroups = React.createClass({
    displayName: "ProfileGroups",

    getInitialState: function getInitialState() {
        return {
            currentGroups: [],
            pendingGroups: user_data[0].pending_groups
        };
    },

    subscribeGroup: function subscribeGroup(groupID) {
        var subJSON = {
            "id": groupID,
            "action": "sub"
        };
        console.log(subJSON);
        $.ajax({
            url: this.props.routes.subscribe,
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify(subJSON),
            success: function (data) {
                this.refreshData();
            }.bind(this),
            error: function (xhr, status, err) {
                console.log('error');
            }.bind(this)
        });
    },

    unsubscribeGroup: function unsubscribeGroup(groupID) {
        var unsubJSON = {
            "id": groupID,
            "action": "unsub"
        };
        console.log(unsubJSON);
        $.ajax({
            url: this.props.routes.subscribe,
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify(unsubJSON),
            success: function (data) {
                this.refreshData();
            }.bind(this),
            error: function (xhr, status, err) {
                console.log('error');
            }.bind(this)
        });
    },

    removePendingGroup: function removePendingGroup(groupID) {
        var removeJSON = {
            "id": groupID,
            "action": "remove_pending"
        };
        console.log(removeJSON);
        $.ajax({
            url: this.props.routes.subscribe,
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify(removeJSON),
            success: function (data) {
                this.refreshDataPending();
            }.bind(this),
            error: function (xhr, status, err) {
                console.log('error');
            }.bind(this)
        });
    },

    refreshData: function refreshData() {
        $.ajax({
            url: this.props.routes.groups,
            type: 'GET',
            dataType: "json",
            success: function (data) {
                var currentGroups = this.state.currentGroups;
                currentGroups = data;
                console.log('success');
                this.setState({
                    currentGroups: data
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log('error');
            }.bind(this)
        });
    },

    refreshDataPending: function refreshDataPending() {
        $.ajax({
            url: this.props.routes.subscribe,
            type: 'GET',
            dataType: "json",
            success: function (data) {
                var pendingGroups = this.state.pendingGroups;
                pendingGroups = data;
                console.log('success');
                this.setState({
                    pendingGroups: data
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log('error');
            }.bind(this)
        });
    },

    componentDidMount: function componentDidMount() {
        $.ajax({
            url: this.props.routes.groups,
            type: 'GET',
            dataType: "json",
            success: function (data) {
                var currentGroups = this.state.currentGroups;
                currentGroups = data;
                this.setState({
                    currentGroups: data
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log('error');
            }.bind(this)
        });
    },

    render: function render() {
        var _this = this;

        var renderedGroups = this.state.currentGroups.map(function (group, i) {
            if (_this.state.currentGroups.length > 0) {
                return React.createElement(SubscribedGroupDiv, { key: group.id, unsubscribeGroup: _this.unsubscribeGroup, groupID: group });
            } else {
                return React.createElement("div", { key: group.id });
            }
        });

        var renderedPendingGroups = this.state.pendingGroups.map(function (group, i) {
            if (_this.state.pendingGroups.length > 0) {
                return React.createElement(PendingGroupDiv, { key: group.id, subscribeGroup: _this.subscribeGroup, removePendingGroup: _this.removePendingGroup, groupID: group });
            } else {
                return React.createElement("div", { key: group.id });
            }
        });

        return React.createElement(
            "div",
            { className: "mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col" },
            React.createElement(
                "div",
                { className: "mdl-card__title mdl-card--expand mdl-color--primary" },
                React.createElement(
                    "h2",
                    { className: "mdl-card__title-text white_text" },
                    " My Groups "
                )
            ),
            React.createElement(
                "div",
                { className: "mdl-cell mdl-cell--12-col" },
                React.createElement(
                    "ul",
                    { className: "mdl-list" },
                    renderedGroups
                )
            ),
            React.createElement(
                "div",
                { className: "mdl-card__title mdl-card--expand mdl-color--primary" },
                React.createElement(
                    "h2",
                    { className: "mdl-card__title-text white_text" },
                    " Pending Groups "
                )
            ),
            React.createElement(
                "div",
                { className: "mdl-cell mdl-cell--12-col" },
                React.createElement(
                    "ul",
                    { className: "mdl-list" },
                    renderedPendingGroups
                )
            )
        );
    }
});

var SubscribedGroupDiv = React.createClass({
    displayName: "SubscribedGroupDiv",


    clickHandler: function clickHandler() {
        var id = this.props.groupID;
        this.props.unsubscribeGroup(id);
    },

    render: function render() {
        var li_key = this.props.groupID + "." + "li";
        var span_key = this.props.groupID + "." + "span";
        var i_key = this.props.groupID + "." + "i";
        var i_key2 = this.props.groupID + "." + "i2";
        var a_key = this.props.groupID + "." + "a";
        var ul_key = this.props.groupID + "." + "ul";
        return React.createElement(
            "li",
            { className: "mdl-list__item", key: li_key },
            React.createElement(
                "span",
                { className: "groupListItem mdl-list__item-primary-content", key: span_key },
                React.createElement(
                    "i",
                    { className: "groupListItem material-icons", key: i_key },
                    "group"
                ),
                this.props.groupID
            ),
            React.createElement(
                "button",
                { className: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent", onClick: this.clickHandler },
                "Unsubscribe"
            )
        );
    }
});

var PendingGroupDiv = React.createClass({
    displayName: "PendingGroupDiv",


    clickSub: function clickSub() {
        var id = this.props.groupID;
        this.props.subscribeGroup(id);
        this.props.removePendingGroup(id);
    },

    clickRemove: function clickRemove() {
        var id = this.props.groupID;
        this.props.removePendingGroup(id);
    },

    render: function render() {
        var li_key = this.props.groupID + "." + "li";
        var span_key = this.props.groupID + "." + "span";
        var i_key = this.props.groupID + "." + "i";
        var i_key2 = this.props.groupID + "." + "i2";
        var a_key = this.props.groupID + "." + "a";
        var ul_key = this.props.groupID + "." + "ul";
        return React.createElement(
            "li",
            { className: "mdl-list__item", key: li_key },
            React.createElement(
                "span",
                { className: "groupListItem mdl-list__item-primary-content", key: span_key },
                React.createElement(
                    "i",
                    { className: "groupListItem material-icons", key: i_key },
                    "group"
                ),
                this.props.groupID
            ),
            React.createElement(
                "button",
                { className: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent", onClick: this.clickSub },
                "Subscribe"
            ),
            React.createElement(
                "button",
                { className: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent", onClick: this.clickRemove },
                "Remove"
            )
        );
    }
});
"use strict";

var GroupsPage = React.createClass({
  displayName: "GroupsPage",

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        null,
        React.createElement(CreateGroup, null),
        React.createElement(BrowseGroups, null)
      )
    );
  }
});

var CreateGroup = React.createClass({
  displayName: "CreateGroup",

  render: function render() {
    var style = {
      marginTop: "5px",
      marginBottom: "5px"
    };

    return React.createElement(
      "div",
      { style: style },
      React.createElement(
        "h3",
        null,
        "Create a group"
      ),
      React.createElement(
        "div",
        { className: "mdl-grid" },
        React.createElement("div", { className: "mdl-cell mdl-cell--1-col" }),
        React.createElement(
          "div",
          { className: "mdl-cell mdl-cell--11-col" },
          React.createElement(
            "form",
            { action: "/api/groups", method: "POST" },
            React.createElement(
              "div",
              { className: "mdl-textfield\r mdl-js-textfield\r mdl-textfield--floating-label" },
              React.createElement("input", { style: { fontSize: "24px" },
                type: "text", name: "groupname",
                className: "mdl-textfield__input" }),
              React.createElement(
                "label",
                { className: "mdl-textfield__label",
                  htmlFor: "groupname" },
                "Group name"
              )
            ),
            React.createElement(GroupMembers, null),
            React.createElement("input", { className: "mdl-button\r mdl-js-button\r mdl-button--raised\r mdl-js-ripple-effect",
              type: "submit", value: "Create" })
          )
        )
      )
    );
  }
});

var GroupMembers = React.createClass({
  displayName: "GroupMembers",

  getInitialState: function getInitialState() {
    return {
      members: [user_data[0].username]
    };
  },

  newMember: function newMember(e) {
    this.setState(function (state) {
      state.members.push(e.target.value);
    });
  },
  render: function render() {
    var memberlist = [];
    var count = this.state.members.length;
    var element = function element(key, user) {
      return React.createElement(
        "div",
        { key: key },
        React.createElement(
          "div",
          { className: "mdl-textfield", key: i },
          React.createElement("input", { type: "text",
            name: "members",
            className: "mdl-textfield__input memberlist",
            defaultValue: user })
        )
      );
    };

    memberlist.push(React.createElement(
      "div",
      { key: 0 },
      React.createElement(
        "div",
        { className: "mdl-textfield", key: 0 },
        React.createElement("input", { type: "text",
          name: "members",
          className: "mdl-textfield__input memberlist",
          defaultValue: this.state.members[0],
          readOnly: true })
      )
    ));

    for (var i = 1; i < count; i++) {
      memberlist.push(element(i, this.state.members[i]));
    }
    memberlist.push(React.createElement(
      "div",
      { className: "mdl-textfield", key: i },
      React.createElement("input", { type: "text",
        name: "person",
        className: "mdl-textfield__input memberlist",
        defaultValue: "",
        onChange: this.newMember })
    ));
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h4",
        null,
        "Members"
      ),
      "Add initial members here, but anyone can join",
      memberlist
    );
  }
});

var BrowseGroups = React.createClass({
  displayName: "BrowseGroups",

  findGroups: function findGroups() {
    var outer_this = this;
    $.ajax({
      url: '/api/search'
    }).then(function (data) {
      data = JSON.parse(data);
      outer_this.setState({
        relevant: data['relevant'],
        popular: data['popular']
      });
    });
  },

  componentDidMount: function componentDidMount() {
    this.findGroups();
  },

  getInitialState: function getInitialState() {
    return {
      search: "",
      relevant: [],
      popular: [],
      searchResults: [],
      subscribed: user_data[0].subscribed_groups
    };
  },

  handleChange: function handleChange(event) {
    var _this = this;

    var query = event.target.value;
    var groupQuery = {
      searchstring: query,
      search_type: 'Group',
      requestedfields: ['id']
    };

    $.ajax({
      url: '/api/search',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(groupQuery)
    }).then(function (data) {
      data = JSON.parse(data).map(function (d) {
        return d.id;
      });
      _this.setState({
        searchResults: data
      });
    });
    this.setState({
      search: query
    });
  },

  subscribe: function subscribe(groupID) {
    var _this2 = this;

    var data = {
      "id": groupID,
      "action": "sub"
    };

    $.ajax({
      url: '/api/subscribe',
      data: JSON.stringify(data),
      type: 'POST'
    }).then(function () {
      _this2.setState({
        subscribed: _this2.state.subscribed + groupID
      });
    });
  },

  render: function render() {
    var _this3 = this;

    var moreGroups = "";
    var groupList = function groupList(groups) {
      return React.createElement(
        GroupList,
        { subbed: _this3.state.subscribed,
          subscribe: _this3.subscribe,
          groups: groups },
        " "
      );
    };
    if (this.state.search == "") {
      moreGroups = React.createElement(
        "div",
        null,
        React.createElement(
          "h4",
          null,
          "Popular groups"
        ),
        groupList(this.state.popular),
        React.createElement(
          "h4",
          null,
          "Groups you might be interested in"
        ),
        groupList(this.state.relevant)
      );
    } else {
      moreGroups = React.createElement(
        "div",
        null,
        React.createElement(
          "h4",
          null,
          "Search results"
        ),
        groupList(this.state.searchResults)
      );
    }
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h3",
        null,
        "Browse groups"
      ),
      React.createElement(
        "div",
        { className: "mdl-grid" },
        React.createElement("div", { className: "mdl-cell mdl-cell--1-col" }),
        React.createElement(
          "div",
          { className: "mdl-cell mdl-cell--11-col" },
          React.createElement(GroupSearch, {
            search: this.state.search,
            handleChange: this.handleChange,
            results: this.state.searchResults }),
          moreGroups
        )
      )
    );
  }
});

var GroupSearch = React.createClass({
  displayName: "GroupSearch",

  render: function render() {
    return(
      //style={{display: "inline"}}
      React.createElement(
        "span",
        {
          className: "mdl-textfield\r mdl-js-textfield\r mdl-textfield--floating-label" },
        React.createElement("input", { style: { fontSize: "24px" },
          type: "text", name: "search",
          className: "mdl-textfield__input",
          value: this.props.search,
          onChange: this.props.handleChange }),
        React.createElement(
          "label",
          { className: "mdl-textfield__label",
            htmlFor: "search" },
          "Search"
        )
      )
    );
  }
});

var GroupList = React.createClass({
  displayName: "GroupList",

  render: function render() {
    var _this4 = this;

    var groups = this.props.groups.map(function (val, idx) {
      var disabled = _this4.props.subbed.indexOf(val) >= 0;
      var input = React.createElement("input", {
        className: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent",
        type: "submit",
        onClick: function onClick() {
          return _this4.props.subscribe(val);
        },
        disabled: disabled,
        value: "Subscribe" });
      return React.createElement(
        "div",
        { style: { marginBottom: "20px" },
          key: idx },
        input,
        React.createElement(
          "h5",
          { style: { display: "inline",
              verticalAlign: "text-bottom",
              marginLeft: "10px" } },
          val
        )
      );
    });
    return React.createElement(
      "div",
      null,
      groups
    );
  }
});
"use strict";

var SearchCard = React.createClass({
    displayName: "SearchCard",

    getInitialState: function getInitialState() {
        return {
            search_item: "",
            search_item_type: "Group",
            requestedfields: ["id"],
            search_results: [],
            recipient: "",
            showResults: 0
        };
    },

    handleSearchItemChange: function handleSearchItemChange(event) {
        this.setState({ search_item: event.target.value });
    },

    onSearch: function onSearch() {

        this.setState({ showResults: 1 });
        var searchObj = {
            "searchtype": this.state.search_item_type,
            "searchstring": this.state.search_item,
            "requestedfields": this.state.requestedfields
        };

        $.ajax({
            url: this.props.routes.search,
            contentType: 'application/json',
            type: 'POST',
            dataType: "json",
            data: JSON.stringify(searchObj),
            success: function (data) {
                this.setState({ search_results: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error("/api/response", status, err.toString());
            }.bind(this)
        });
    },

    handleSearchItemTypeChange: function handleSearchItemTypeChange(event) {
        this.setState({ search_item_type: event.target.value });
        if (event.target.value == "Group") {
            this.setState({ requestedfields: ["id"] });
        } else if (event.target.value == "User") {
            this.setState({ requestedfields: ["username"] });
        }
    },

    setRecipient: function setRecipient(surveyRecipient) {
        this.setState({ recipient: surveyRecipient });
        this.props.setRecipient(surveyRecipient, this.state.search_item_type);
        this.setState({ showResults: 0 });
    },

    render: function render() {
        var _this = this;

        var renderedSearchResults = this.state.search_results.map(function (result) {
            if (_this.state.search_results.length > 0 && _this.state.showResults == 1) {
                if (_this.state.search_item_type == "Group") {
                    return React.createElement(GroupResultDiv, { key: result.id, setRecipient: _this.setRecipient, resultInfo: result });
                } else if (_this.state.search_item_type == "User") {
                    return React.createElement(UserResultDiv, { key: result.username, setRecipient: _this.setRecipient, resultInfo: result });
                }
            }
        });
        /*
                Put this back in if we want to be able to send to users
                    <!-- <p className="mdl-cell mdl-cell--12-col">Type:
                            <select
                            id="UserOrGroupSelect"
                            onChange={this.handleSearchItemTypeChange}
                            value={this.state.value}>
                                <option value="Group">Group</option>
                                <option value="User">User</option>
                            </select>
                    </p> -->
        */
        return React.createElement(
            "div",
            { className: "mdl-grid mdl-card__title mdl-card--expand mdl-300" },
            React.createElement(
                "div",
                { className: "mdl-cell mdl-cell--12-col" },
                "Post to Group: ",
                this.state.recipient
            ),
            React.createElement(
                "span",
                null,
                React.createElement(
                    "div",
                    { className: "mdl-textfield mdl-js-textfield mdl-cell mdl-cell--8-col" },
                    React.createElement("input", { className: "mdl-textfield__input",
                        type: "text",
                        value: this.state.search_item,
                        onChange: this.handleSearchItemChange }),
                    React.createElement(
                        "label",
                        { className: "mdl-textfield__label" },
                        "Search for group here..."
                    )
                ),
                React.createElement(
                    "button",
                    { className: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent mdl-cell mdl-cell--4-col", onClick: this.onSearch },
                    "SEARCH"
                )
            ),
            React.createElement("div", { className: "mdl-cell mdl-cell--12-col" }),
            renderedSearchResults
        );
    }
});

var GroupResultDiv = React.createClass({
    displayName: "GroupResultDiv",


    getInitialState: function getInitialState() {
        return {
            showResult: 1
        };
    },

    setRecipient: function setRecipient() {
        this.props.setRecipient(this.props.resultInfo.id);
        this.setState({ showResult: 0 });
    },

    render: function render() {
        if (this.state.showResult == 1) {
            return React.createElement(
                "button",
                { className: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent mdl-cell mdl-cell--4-col", onClick: this.setRecipient },
                this.props.resultInfo.id
            );
        } else {
            return React.createElement("div", null);
        }
    }

});

var UserResultDiv = React.createClass({
    displayName: "UserResultDiv",


    getInitialState: function getInitialState() {
        return {
            showResult: 1
        };
    },

    setRecipient: function setRecipient() {
        this.props.setRecipient(this.props.resultInfo.username);
        this.setState({ showResult: 0 });
    },

    render: function render() {
        if (this.state.showResult == 1) {
            return React.createElement(
                "button",
                { className: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent mdl-cell mdl-cell--4-col", onClick: this.setRecipient },
                this.props.resultInfo.username
            );
        } else {
            return React.createElement("div", null);
        }
    }
});
"use strict";

var ResponseCard = React.createClass({
    displayName: "ResponseCard",


    getInitialState: function getInitialState() {
        return {
            results: 0,
            iter: 0,
            length: 0
        };
    },

    componentDidMount: function componentDidMount() {
        $.ajax({
            url: "/api/results/" + this.props.surveyID,
            dataType: "json",
            type: 'GET',
            success: function (results) {
                this.setState({ results: results });
                this.setState({ length: results.length });
                console.log(results);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error("/api/results", status, err.toString());
            }.bind(this)
        });
    },

    nextQuestion: function nextQuestion() {
        var iter = this.state.iter;

        this.setState({
            iter: iter + 1
        });
    },

    prevQuestion: function prevQuestion() {
        var iter = this.state.iter;

        this.setState({
            iter: iter - 1
        });
    },

    render: function render() {
        if (this.state.results != 0) {
            return React.createElement(
                "div",
                { className: "updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--12-col-desktop" },
                React.createElement(TitleSection, { titleText: this.state.results[this.state.iter].title }),
                React.createElement(ChartDiv, {
                    questionID: this.state.results[this.state.iter].id,
                    question_format: this.state.results[this.state.iter].response_format,
                    response_data: this.state.results[this.state.iter].response_data }),
                React.createElement(ResponseFooter, {
                    nextQuestion: this.nextQuestion,
                    prevQuestion: this.prevQuestion,
                    currQuestion: this.state.iter,
                    numQuestions: this.state.length })
            );
        } else {
            return React.createElement("div", null);
        }
    }
});

var ChartDiv = React.createClass({
    displayName: "ChartDiv",


    getInitialState: function getInitialState() {
        return {
            questionID: 0
        };
    },

    componentDidMount: function componentDidMount() {
        this.setState({
            questionID: this.props.questionID
        });
        this.updateChart(this.props.response_data.labels, this.props.response_data.series, this.props.question_format);
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({
            questionID: nextProps.questionID
        });
        this.updateChart(nextProps.response_data.labels, nextProps.response_data.series, nextProps.question_format);
    },

    updateChart: function updateChart(labels, series, question_format, questionID) {
        var chartCSS = "#chart" + this.state.questionID + "-chart";
        if (question_format == "rating") {
            var data = {
                series: series,
                labels: labels
            };
            var options = {
                seriesBarDistance: 15
            };
            new Chartist.Bar(chartCSS, data, options);
        } else if (question_format == "multipleChoice") {
            var data = {
                series: series,
                labels: labels
            };
            var options = {
                seriesBarDistance: 15
            };
            new Chartist.Bar(chartCSS, data, options);
        } else if (question_format == "trueOrFalse") {
            var data = {
                series: series,
                labels: labels
            };

            new Chartist.Pie(chartCSS, data);
        }
    },

    render: function render() {
        var chartName = "chart" + this.state.questionID + "-chart";
        return React.createElement("div", { className: "ct-chart ct-golden-section", id: chartName });
    }
});

var ResponseFooter = React.createClass({
    displayName: "ResponseFooter",


    render: function render() {

        if (this.props.currQuestion == 0 && this.props.numQuestions != 1) {
            return React.createElement(
                "div",
                { className: "mdl-cell mdl-cell--12-col mdl-card__title mdl-card--expand mdl-300" },
                React.createElement(
                    "button",
                    { onClick: this.props.prevQuestion, className: "mdl-cell mdl-cell--4-col mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent", disabled: true },
                    "Previous"
                ),
                React.createElement(Progress, { responseSize: this.props.currQuestion, numQuestions: this.props.numQuestions }),
                React.createElement(
                    "button",
                    { onClick: this.props.nextQuestion, className: "mdl-cell mdl-cell--4-col mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" },
                    "Next"
                )
            );
        } else if (this.props.currQuestion > 0 && this.props.currQuestion < this.props.numQuestions - 1) {
            return React.createElement(
                "div",
                { className: "mdl-cell mdl-cell--12-col mdl-card__title mdl-card--expand mdl-300" },
                React.createElement(
                    "button",
                    { onClick: this.props.prevQuestion, className: "mdl-cell mdl-cell--4-col mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" },
                    "Previous"
                ),
                React.createElement(Progress, { responseSize: this.props.currQuestion, numQuestions: this.props.numQuestions }),
                React.createElement(
                    "button",
                    { onClick: this.props.nextQuestion, className: "mdl-cell mdl-cell--4-col mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" },
                    "Next"
                )
            );
        } else if (this.props.currQuestion == this.props.numQuestions - 1 && this.props.numQuestions != 1) {
            return React.createElement(
                "div",
                { className: "mdl-cell mdl-cell--12-col mdl-card__title mdl-card--expand mdl-300" },
                React.createElement(
                    "button",
                    { onClick: this.props.prevQuestion, className: "mdl-cell mdl-cell--4-col mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" },
                    "Previous"
                ),
                React.createElement(Progress, { responseSize: this.props.currQuestion, numQuestions: this.props.numQuestions }),
                React.createElement(
                    "button",
                    { onClick: this.props.nextQuestion, className: "mdl-cell mdl-cell--4-col mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent", disabled: true },
                    "Next"
                )
            );
        } else if (this.props.numQuestions == 1) {
            return React.createElement(
                "div",
                { className: "mdl-cell mdl-cell--12-col mdl-card__title mdl-card--expand mdl-300" },
                React.createElement(
                    "button",
                    { onClick: this.props.prevQuestion, className: "mdl-cell mdl-cell--4-col mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent", disabled: true },
                    "Previous"
                ),
                React.createElement(Progress, { responseSize: this.props.currQuestion, numQuestions: this.props.numQuestions }),
                React.createElement(
                    "button",
                    { onClick: this.props.nextQuestion, className: "mdl-cell mdl-cell--4-col mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent", disabled: true },
                    "Next"
                )
            );
        }
    }
});
"use strict";

var HelpPage = React.createClass({
    displayName: "HelpPage",


    render: function render() {
        return React.createElement(
            "div",
            { className: "mdl-cell mdl-cell--12-col" },
            React.createElement(GroupsHelp, null),
            React.createElement(SurveysHelp, null),
            React.createElement(Censorship, null),
            React.createElement(InformationCollection, null)
        );
    }
});

var GroupsHelp = React.createClass({
    displayName: "GroupsHelp",


    getInitialState: function getInitialState() {
        return {
            expanded: "false"
        };
    },

    expand: function expand() {
        this.setState({
            expanded: "true"
        });
    },

    contract: function contract() {
        this.setState({
            expanded: "false"
        });
    },

    render: function render() {
        if (this.state.expanded == "true") {
            return React.createElement(
                "div",
                { className: "mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col" },
                React.createElement(
                    "div",
                    { className: "mdl-card__title mdl-color--primary" },
                    React.createElement(
                        "div",
                        { className: "mdl-cell mdl-cell--6-col" },
                        React.createElement(
                            "h2",
                            { className: "mdl-card__title-text white_text" },
                            "Groups"
                        )
                    ),
                    React.createElement("div", { className: "mdl-layout-spacer" }),
                    React.createElement(
                        "div",
                        { className: "mdl-cell mdl-cell--1-col" },
                        React.createElement(
                            "button",
                            { onClick: this.contract, className: "mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" },
                            React.createElement(
                                "i",
                                { className: "material-icons" },
                                "remove"
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "mdl-card__supporting-text" },
                    "Upon creation surveys are sent to a group to be answered by it's members. Groups are user created and in order to respond to a survey you must be subscribed to the group the survey was sent to."
                ),
                React.createElement(
                    "div",
                    { className: "mdl-card__title mdl-color--accent" },
                    React.createElement(
                        "h2",
                        { className: "mdl-card__title-text" },
                        "Group Creation"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "mdl-card__supporting-text" },
                    "First navigate to the Group page through the navigation bar. You will see several fields, you'll need to enter a unique group name at the top as well as  users that you wish to invite to your new group upon creation in the fields below. Additional fields to invite users will appear as you fill them out. Click Submit when you're finished!"
                ),
                React.createElement(
                    "div",
                    { className: "mdl-card__title mdl-color--accent" },
                    React.createElement(
                        "h2",
                        { className: "mdl-card__title-text" },
                        "Group Management"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "mdl-card__supporting-text" },
                    "First navigate to the Profile page through the navigation bar. You'll see a My Groups section as well as a Subscribe to a Group section at the bottom of the page. If you want to unsubscribe from a group and no longer be able to see or reply to that groups surveys, click the orange Unsubscribe button to the right of the group. If you wish to see and be able to responsd to a groups surveys you must enter the groups name into the field labeled \"GroupID here...\" and then click the orange Subscribe button."
                )
            );
        } else {
            return React.createElement(
                "div",
                { className: "mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col" },
                React.createElement(
                    "div",
                    { className: "mdl-card__title mdl-color--primary" },
                    React.createElement(
                        "div",
                        { className: "mdl-cell mdl-cell--6-col" },
                        React.createElement(
                            "h2",
                            { className: "mdl-card__title-text white_text" },
                            "Groups"
                        )
                    ),
                    React.createElement("div", { className: "mdl-layout-spacer" }),
                    React.createElement(
                        "div",
                        { className: "mdl-cell mdl-cell--1-col" },
                        React.createElement(
                            "button",
                            { onClick: this.expand, className: "mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" },
                            React.createElement(
                                "i",
                                { className: "material-icons" },
                                "add"
                            )
                        )
                    )
                )
            );
        }
    }
});

var SurveysHelp = React.createClass({
    displayName: "SurveysHelp",


    getInitialState: function getInitialState() {
        return {
            expanded: "false"
        };
    },

    expand: function expand() {
        this.setState({
            expanded: "true"
        });
    },

    contract: function contract() {
        this.setState({
            expanded: "false"
        });
    },

    render: function render() {
        if (this.state.expanded == "true") {
            return React.createElement(
                "div",
                { className: "mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col" },
                React.createElement(
                    "div",
                    { className: "mdl-card__title mdl-color--primary" },
                    React.createElement(
                        "div",
                        { className: "mdl-cell mdl-cell--6-col" },
                        React.createElement(
                            "h2",
                            { className: "mdl-card__title-text white_text" },
                            "Surveys"
                        )
                    ),
                    React.createElement("div", { className: "mdl-layout-spacer" }),
                    React.createElement(
                        "div",
                        { className: "mdl-cell mdl-cell--1-col" },
                        React.createElement(
                            "button",
                            { onClick: this.contract, className: "mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" },
                            React.createElement(
                                "i",
                                { className: "material-icons" },
                                "remove"
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "mdl-card__supporting-text" },
                    "Surveys are a collection of Free Response, Multiple Choice, Single Choice, and Rating questions that can be sent to a group."
                ),
                React.createElement(
                    "div",
                    { className: "mdl-card__title mdl-color--accent" },
                    React.createElement(
                        "h2",
                        { className: "mdl-card__title-text" },
                        "Creating a Survey"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "mdl-card__supporting-text" },
                    "First navigate to the Surveys page through the navigation bar. At the top of the Create a Survey section you'll see a field labeled \"Search for Group here...\", you'll have to search for the group you want the survey to be sent to by typing in at least part of the name of the group and then clicking Search. After searching a number of buttons will appear with group names on them, click the button corresponding to the group you want to send the survey to. Next type in the name for your survey in the field under the label Survey Title. Next start creating your questions, for each question you'll have to fill in a title for the question in the field labeled \"Question title\", then select a question type from the drop down menu right below next to the label \"Type: \", if you choose Single Choice or Multiple Choice you'll need to add options, to add additional options (you need at least two) click the + button next to \"Add Option\", name the options by filling in their fields."
                ),
                React.createElement(
                    "div",
                    { className: "mdl-card__title mdl-color--accent" },
                    React.createElement(
                        "h2",
                        { className: "mdl-card__title-text" },
                        "Responding to a Survey"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "mdl-card__supporting-text" },
                    "First navigate to the Home page through the navigation bar. If you belong to a Group which has a survey you have yet to respond to it will be displayed on the page. Fill in your answers to each question and push Next until you've answered every question upon which you can click Submit. At any time you can traverse to other questions and change your answers, upon submission however your answers will be final."
                ),
                React.createElement(
                    "div",
                    { className: "mdl-card__title mdl-color--accent" },
                    React.createElement(
                        "h2",
                        { className: "mdl-card__title-text" },
                        "Question Types"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "mdl-card__supporting-text" },
                    React.createElement(
                        "ul",
                        { className: "mdl-list" },
                        React.createElement(
                            "li",
                            { className: "mdl-list__item" },
                            "Multiple Choice: A question with multiple checkboxes, you can choose more than one answer"
                        ),
                        React.createElement(
                            "li",
                            { className: "mdl-list__item" },
                            "Single Choice: A question with multiple checkboxes, you can only choose one answer"
                        ),
                        React.createElement(
                            "li",
                            { className: "mdl-list__item" },
                            "Rating Scale: A question with a slider, you can drag the slider to answer the question with some value between 0 and 10"
                        ),
                        React.createElement(
                            "li",
                            { className: "mdl-list__item" },
                            "Free Response: A question with a textbox, you type in your response to the question"
                        )
                    )
                )
            );
        } else {
            return React.createElement(
                "div",
                { className: "mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col" },
                React.createElement(
                    "div",
                    { className: "mdl-card__title mdl-color--primary" },
                    React.createElement(
                        "div",
                        { className: "mdl-cell mdl-cell--6-col" },
                        React.createElement(
                            "h2",
                            { className: "mdl-card__title-text white_text" },
                            "Surveys"
                        )
                    ),
                    React.createElement("div", { className: "mdl-layout-spacer" }),
                    React.createElement(
                        "div",
                        { className: "mdl-cell mdl-cell--1-col" },
                        React.createElement(
                            "button",
                            { onClick: this.expand, className: "mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" },
                            React.createElement(
                                "i",
                                { className: "material-icons" },
                                "add"
                            )
                        )
                    )
                )
            );
        }
    }
});

var Censorship = React.createClass({
    displayName: "Censorship",


    getInitialState: function getInitialState() {
        return {
            expanded: "false"
        };
    },

    expand: function expand() {
        this.setState({
            expanded: "true"
        });
    },

    contract: function contract() {
        this.setState({
            expanded: "false"
        });
    },

    render: function render() {
        if (this.state.expanded == "true") {
            return React.createElement(
                "div",
                { className: "mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col" },
                React.createElement(
                    "div",
                    { className: "mdl-card__title mdl-color--primary" },
                    React.createElement(
                        "div",
                        { className: "mdl-cell mdl-cell--6-col" },
                        React.createElement(
                            "h2",
                            { className: "mdl-card__title-text white_text" },
                            "Censorship Policy"
                        )
                    ),
                    React.createElement("div", { className: "mdl-layout-spacer" }),
                    React.createElement(
                        "div",
                        { className: "mdl-cell mdl-cell--1-col" },
                        React.createElement(
                            "button",
                            { onClick: this.contract, className: "mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" },
                            React.createElement(
                                "i",
                                { className: "material-icons" },
                                "remove"
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "mdl-card__supporting-text" },
                    "TBD"
                )
            );
        } else {
            return React.createElement(
                "div",
                { className: "mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col" },
                React.createElement(
                    "div",
                    { className: "mdl-card__title mdl-color--primary" },
                    React.createElement(
                        "div",
                        { className: "mdl-cell mdl-cell--6-col" },
                        React.createElement(
                            "h2",
                            { className: "mdl-card__title-text white_text" },
                            "Censorship Policy"
                        )
                    ),
                    React.createElement("div", { className: "mdl-layout-spacer" }),
                    React.createElement(
                        "div",
                        { className: "mdl-cell mdl-cell--1-col" },
                        React.createElement(
                            "button",
                            { onClick: this.expand, className: "mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" },
                            React.createElement(
                                "i",
                                { className: "material-icons" },
                                "add"
                            )
                        )
                    )
                )
            );
        }
    }
});

var InformationCollection = React.createClass({
    displayName: "InformationCollection",


    getInitialState: function getInitialState() {
        return {
            expanded: "false"
        };
    },

    expand: function expand() {
        this.setState({
            expanded: "true"
        });
    },

    contract: function contract() {
        this.setState({
            expanded: "false"
        });
    },

    render: function render() {
        if (this.state.expanded == "true") {
            return React.createElement(
                "div",
                { className: "mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col" },
                React.createElement(
                    "div",
                    { className: "mdl-card__title mdl-color--primary" },
                    React.createElement(
                        "div",
                        { className: "mdl-cell mdl-cell--6-col" },
                        React.createElement(
                            "h2",
                            { className: "mdl-card__title-text white_text" },
                            "Information Collection Policy"
                        )
                    ),
                    React.createElement("div", { className: "mdl-layout-spacer" }),
                    React.createElement(
                        "div",
                        { className: "mdl-cell mdl-cell--1-col" },
                        React.createElement(
                            "button",
                            { onClick: this.contract, className: "mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" },
                            React.createElement(
                                "i",
                                { className: "material-icons" },
                                "remove"
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "mdl-card__supporting-text" },
                    "TBD"
                )
            );
        } else {
            return React.createElement(
                "div",
                { className: "mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col" },
                React.createElement(
                    "div",
                    { className: "mdl-card__title mdl-color--primary" },
                    React.createElement(
                        "div",
                        { className: "mdl-cell mdl-cell--6-col" },
                        React.createElement(
                            "h2",
                            { className: "mdl-card__title-text white_text" },
                            "Information Collection Policy"
                        )
                    ),
                    React.createElement("div", { className: "mdl-layout-spacer" }),
                    React.createElement(
                        "div",
                        { className: "mdl-cell mdl-cell--1-col" },
                        React.createElement(
                            "button",
                            { onClick: this.expand, className: "mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" },
                            React.createElement(
                                "i",
                                { className: "material-icons" },
                                "add"
                            )
                        )
                    )
                )
            );
        }
    }
});
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
