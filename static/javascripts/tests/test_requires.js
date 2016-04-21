var React = require('react'),
    assert = require('assert'),
    TestUtils = require('react-addons-test-utils'),
    jsdom = require('jsdom');

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.parentWindow;


