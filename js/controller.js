var fModel = {};
var view = {};
var controller = {};
var fAuth = {};

controller.username = "";
controller.fullname = "";



var login = false;


$(function (){
    fModel.setAlbumPhotos(controller.photoReady);
	//fModel.getIntPic(controller.photoReady);
	$('#photoScreen').hide();
	
	
	//Register Continue to Next screen button
	$('#continue').click(function(){
		$('#splashScreen').hide();
		$('#photoScreen').fadeIn(1000);
	});
	
	//Register back to splash screen button
	$('#back').click(function(){
		$('#photoScreen').hide();
		$('#splashScreen').fadeIn(1000);
		//Reset PhotoData and TextBox Data on Back Button Click
		$('#goBox').val("");
        fModel.setAlbumPhotos(controller.photoReady);
	});
	
	//Register goButton for searching
	$('#goButton').click(function (){		
		fModel.searchPic(controller.photoReady);
		});
	
	//Register resetButton for setting data back to default
	$('#resetButton').click(function (){
		$('#goBox').val("");
		fModel.setAlbumPhotos(controller.photoReady);
		});
		
	//Register enter button for goBox test field
	$('#goBox').keydown(function (e){
    if(e.keyCode == 13){
		fModel.searchPic(controller.photoReady);
    }
	});
	//Register Login button for flickr login
	$('#loginButton').click(function (){
		fAuth.login();
		login = true;
		$(function () {
			$("#d").dialog({
				modal: true,
				show: {
					effect: "blind",
					duration: 1000
				},
				hide: {
					effect: "explode",
					duration: 1000
				}
			});
		});

	});
	$('#d').bind('dialogclose', function(event){
	if(login == true){
			fAuth.getToken();
			controller.setLogin();
			login = false;
		}
	});
    //Register sortButton for sorting products by likes
    $('#sortButton').click(function (){
        fModel.sortPhotos(controller.photoReady,
        $('#selectSortBox option:selected').val());
    });
});
controller.photoReady = function(photos){
	view.displayPhotos(photos);
};
controller.setLogin = function(){
		controller.fullname = fAuth.fullname;
		console.log(controller.fullname);
};