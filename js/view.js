view.displayPhotos = function(photos){
	var htmlStr = "";
	for (var i = 0; i < photos.length; i++){
	// Construct the html string for each thumbnail
	htmlStr += '<figure><a href="'+photos[i].url+'" data-lightbox="defualt" title="'
				+photos[i].description+'"><img class="thumbImg" src="'+photos[i].thumb+'" alt="'
				+photos[i].description+'"></a><figcaption>'+photos[i].description+'</figcaption></figure>';
	}
	$('#thumbnails').html(htmlStr);
}