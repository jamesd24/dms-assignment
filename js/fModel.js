fModel.API_KEY = "&api_key=6b25d31307a2e05fc11c95bbcd005601"
fModel.numPhotos = 0;
fModel.infoCount = 0;
fModel.photos = [];
fModel.photoReady;

fModel.getIntPic = function(callback){
	fModel.photoReady = callback;
	var interStr="http://api.flickr.com/services/rest/?method=flickr.interestingness.getList&per_page=20&format=json&nojsoncallback=1"+fModel.API_KEY;
	interStr = fAuth.sign(interStr);
	$.get(interStr, function(data){
		//console.log(data);
		getPhotos(data);
		});
}

fModel.searchPic = function(callback){
	var goBox=$('#goBox').val();
	goBox = "&text="+goBox;
	goBox = goBox.trim();
	var searchStr="http://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&per_page=20&format=json&nojsoncallback=1"+fModel.API_KEY+goBox;
	searchStr = fAuth.sign(searchStr);
	$.get(searchStr, function(data){
		//console.log(data);
		getPhotos(data);
		});
}
	

function getPhotos(data){
	fModel.photos = [];
	fModel.infoCount = 0;
	fModel.numPhotos = data.photos.photo.length;
	var photoArray = data.photos.photo;
	for (var i=0; i < data.photos.photo.length; i++){
		var id = data.photos.photo[i].id;
		var newPhoto = {id: id, description: data.photos.photo[i].title};
		fModel.photos.push(newPhoto);
		callGetSize(id, newPhoto);
	}
}

function callGetSize(photoId, photoObj){
	var getSizeStr = "http://api.flickr.com/services/rest/?method=flickr.photos.getSizes&format=json&nojsoncallback=1"+ fModel.API_KEY + "&photo_id="+photoId;
	getSizeStr = fAuth.sign(getSizeStr);
	$.get(getSizeStr, function(data){
		var url = data.sizes.size[data.sizes.size.length-1].source;
		for (var i = 0; i <  data.sizes.size.length; i++){
			if (data.sizes.size[i].label == "Large")
				url = data.sizes.size[i].source; 
			else if (data.sizes.size[i].label == "Small")
				photoObj.thumb = data.sizes.size[i].source;
		}
		photoObj.url = url;
		fModel.infoCount ++;
		//console.log(fModel.infoCount);
		if (fModel.numPhotos == fModel.infoCount) {
			fModel.photoReady(fModel.photos);
		}
		});
}

