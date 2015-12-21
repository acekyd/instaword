function parse_post(element) {
	console.log('element', element);
  var $element = $(element)
	var post = new Object();
	post.title = $element.find("hw").text();
	post.label = $element.find("fl").text();
	
	//for meanings
	
	post.plenty = []
	var plenty = $element.find("mc")
  for (var i = 0; i < plenty.length; i++)
    post.plenty.push(plenty[i].innerHTML)
  post.meaning = post.plenty.join(', ')
	
	//for example
	
	post.plenty = []
	var plenty = $element.find("vi")
  for (var i = 0; i < plenty.length; i++)
    post.plenty.push(plenty[i].innerHTML)
  post.example = post.plenty.join(', ')

	//for synonym
	
	post.plenty = []
	var plenty = $element.find("syn")
  for (var i = 0; i < plenty.length; i++)
    post.plenty.push(plenty[i].innerHTML)
  post.synonym = post.plenty.join(', ')
	
	//for related
	
	post.plenty = []
	var plenty = $element.find("rel")
  for (var i = 0; i < plenty.length; i++)
    post.plenty.push(plenty[i].innerHTML)
  post.related = post.plenty.join(', ')
  
  //for suggestions
	
	post.plenty = []
	var plenty = $element.find("suggestion")
  for (var i = 0; i < plenty.length; i++)
    post.plenty.push(plenty[i].innerHTML)
  post.suggestion = post.plenty.join(', ')
	
	//console.log(post);
	return post;
}