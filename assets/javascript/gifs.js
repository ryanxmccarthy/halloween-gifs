var topics = ['werewolf', 'vampire', 'moon', 'bat', 'witch', 'owl', 'black cat', 'crow', 'poltergeist']

$(document).ready(function() {
	function generateButtons() {
		for (var i = 0; i < topics.length; i++) {
			var name = topics[i]
			var button = $('<button>');
			button.text(name)
			button.attr('class', 'topicButton')
			button.attr('data-topic', name)
			$('#buttons').append(button)
		}
	}

	generateButtons();

	$(document).on('click', '.topicButton', function() {
		$('#gifs').text('');
		var topic = $(this).attr('data-topic');
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";

	    $.ajax({
	    	url: queryURL,
	    	method: 'GET'
	    }).done(function(response) {
	    	var result = response.data;
	    	for (var i = 0; i < result.length; i++) {
	    		var gifDiv = $('<div>');
	    		var rating = result[i].rating;
	    		var p = $('<p>').text('Rating: ' + rating);
	    		var topicGif = $('<img>');
	    		topicGif.attr('src', result[i].images.fixed_height_still.url);
	    		topicGif.attr('data-still', result[i].images.fixed_height_still.url)
	    		topicGif.attr('data-animate', result[i].images.fixed_height.url)
	    		topicGif.attr('data-state', 'still')
	    		topicGif.attr('class', 'gif')
	    		gifDiv.prepend(p);
	    		gifDiv.prepend(topicGif);
	    		$('#gifs').prepend(gifDiv)
	    	}
	    })
	})

	//pauses and unpauses gifs
	$(document).on('click', '.gif', function() {
		var state = $(this).attr('data-state')
		if (state === 'still') {
			$(this).attr('src', $(this).attr('data-animate'))
			$(this).attr('data-state', 'animate')
		} else if (state === 'animate') {
			$(this).attr('src', $(this).attr('data-still'))
			$(this).attr('data-state', 'still')
		}
	})

	//adds new topic button to page
	$('#add').on('click', function() {
		if ($('#topic').val() === '') {
			alert("Enter a topic")
		} else {
			$('#buttons').empty()
			var topic = $('#topic').val().trim()
			topics.push(topic)
			$('#topic').val('')
			generateButtons();
		}
	})
})