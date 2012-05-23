jquery.expectr
==============

A small utility to mock $.get, $.post and $.getJSON calls while developing web apps.

It's supersimple. Let's say you want to do this call in your code:

	$.getJSON("/hello/world", function(data){
		// do something with your json
		alert(data.foo);
	});

I guess you are expecting a json object that looks more or less like this:

	{
		foo: "bar"
	}

So what should you do now? Remember that */hello/world* is not available or not serving that JSON yet.
Just import *jquery.expectr.js* (or the minified version) into your code

	<script src="jquery.expectr.js"></script>

and write down what you expect

	$.expectJSON(
		"/hello/world", // the URL you will call with the regular jQuery.getJSON
		{ foo: "bar" }, // the JSON object you are expecting
		500 // optional, to simulate a delay on the server response
	);

I told you it was supersimple! :)