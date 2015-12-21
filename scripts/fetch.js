function fetch_feed(keyword) {
	url = 'http://www.dictionaryapi.com/api/v1/references/thesaurus/xml/'+$.trim(keyword)+'?key=69ea97b9-a59f-48a5-88ae-5148c070672e'
	if(!!keyword)
	{
		chrome.extension.sendRequest({'action' : 'fetch_feed', 'url' : url }, 
    function(response) {
		if(response)
      display_stories(response);
	  else {
		  display_error(url);
	  }
    }
  );
	}
	else {
 		display_no_selection();
	}
}

function display_error(keyword)
{
	$('#loader').hide();
	 $('#popup').append("<p id='error'>An error occurred! Try Again!</p>");
	 document.getElementById('save').value = 'Search Again'; 
}
function display_no_selection()
{
	$('#loader').hide();
	 $('#popup').append("<p id='error'>You did not select any word!</p>");
	 document.getElementById('save').value = 'Search Again'; 
}

function display_stories(feed_data) {
	$('#loader').hide();
  var xml_doc = $.parseXML(feed_data);
  $xml = $(xml_doc);
    var items = $xml.find("entry");
	document.getElementById('save').value = 'Search Again'; 
  items.each(function(index, element) {
    var post = parse_post(element);
    var item = '';
    var class2 = '';
    item += '<div class="post">'
    item += '<div class="item">\
              <h4>' + post.title +' - <span class="label">'+ post.label +'</span></h4>\
             <p> <span class="description"><b>Definition: </b></span>' + post.meaning + '</p>\
			 <p class="value"><span class="description"><b>Usage: </b></span>' + post.example + '</p>\
		<p class="value"><span class="description"><b>Synonyms: </b></span>' + post.synonym + '</p>\
		<p class="value"><span class="description"><b>Related Words: </b></span><i>' + post.related + '<i></p>\
			  \
            </div>\
          ';
    item += '</div>';
    $('#popup').append(item);
    // TODO why isn't jQuery's .on defined?
    var $item = $('div[id="' + post.id + '"]')
    console.log('$item', $item)
  });
  var sug_items = $xml.find("entry_list");
  console.log(sug_items);
  sug_items.each(function(index, element) {
    var post = parse_post(element);
    var item = '';
    var class2 = '';
	
	if(post.suggestion)
	{
		item += '<div class="post">'
		item += '<div class="item">\
				  <h4>Word not found!</h4>\
				 <p> <span class="description"><b>Check suggestions below</b></span></p>\
				 <p class="value">' + post.suggestion + '</p>\
				  \
				</div>\
			  ';
		item += '</div>';
	}
    
    $('#popup').append(item);
    // TODO why isn't jQuery's .on defined?
    var $item = $('div[id="' + post.id + '"]')
    console.log('$item', $item)
  });
}

// This callback function is called when the content script has been 
// injected and returned its results
function onPageDetailsReceived(pageDetails)  { 
    document.getElementById('summary').innerText = pageDetails.summary; 
	document.getElementById('keyword').value = pageDetails.summary; 
	
	 fetch_feed(document.getElementById('summary').value);
	return;
}
function research() {
	event.preventDefault();
	var keyword = document.getElementById('keyword').value;
	document.getElementById('save').value = 'searching'; 
	$('#loader').show();
	  $('.post').html('');
	  $('#error').hide();
	fetch_feed(keyword);
	return;
}
// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    // Cache a reference to the status display SPAN
    statusDisplay = document.getElementById('status-display');
    // Handle the bookmark form submit event with our addBookmark function
   // document.getElementById('addbookmark').addEventListener('submit', addBookmark);
    // Get the event page
    chrome.runtime.getBackgroundPage(function(eventPage) {
        // Call the getPageInfo function in the event page, passing in 
        // our onPageDetailsReceived function as the callback. This injects 
        // content.js into the current tab's HTML
        eventPage.getPageDetails(onPageDetailsReceived);
		
    });
	document.getElementById('re-search').addEventListener('submit', research);
});
