fModel.API_ID = "&api_id=1462321683993268";
fModel.Secret = "ba49cc24256c5e930e7251ff78d69bee";
fModel.getImages = "https://graph.facebook.com/362925810453628/photos?fields=name,images,likes&limit=50";
fModel.photos = [];
fModel.photoReady;


//Get an array of photos from the group
fModel.setAlbumPhotos = function(callback){
    fModel.photoReady = callback;
    fModel.photos = [];
    $.get(fModel.getImages, function(data){
        for (var i=0; i < data.data.length; i++){
            var id = data.data[i].id;
            var newPhoto = {id: id, description: data.data[i].name};
            setPhotoUrl(data.data[i],newPhoto);
            setLikeCount(data.data[i],newPhoto);
            fModel.photos.push(newPhoto);
        }
        //console.log(fModel.photos);
        fModel.photoReady(fModel.photos);
    });
};

function setPhotoUrl(fBPhoto, photoObj){
    photoObj.url = fBPhoto.images[0].source;
    for (var i=0; i < fBPhoto.images.length; i++){
        //Check all source strings to find the thumbnail image.
        if(fBPhoto.images[i].source.indexOf('s320x320') > -1){
            photoObj.thumb = fBPhoto.images[i].source;
        }
        else{
            photoObj.thumb = fBPhoto.images[0].source;
        }
    }
}

function setLikeCount(fbPhoto, photoObj){
    if(fbPhoto.likes != null){
        photoObj.likes = fbPhoto.likes.data.length;
    }
    else{
        photoObj.likes = 0;
    }
}

fModel.sortPhotos = function (callback, order) {
    fModel.photoReady = callback;

    if(order == "asc"){
        fModel.photos.sort(function(a,b){
            return a.likes- b.likes
        });
    }
    else{
        fModel.photos.sort(function(a,b){
            return b.likes- a.likes
        });
    }
    //console.log(fModel.photos);
    fModel.photoReady(fModel.photos);
};

fModel.searchPhotos = function (callback, search){

};