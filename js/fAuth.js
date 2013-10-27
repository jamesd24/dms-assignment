fAuth.secret = "c1f674a117e13739";
fAuth.API_KEY = "&api_key=6b25d31307a2e05fc11c95bbcd005601";
var frob = "&frob=";
fAuth.username = "";
fAuth.fullname = "";

fAuth.sign = function(request){
	//Obtain URL Parametres
	var urlBits = request.split("?");
	var params = urlBits[1].split("&");
	//Sort URL Parametres
	params = params.sort();
	//Remove "=" from URL Parametres
	for(var i=0; i<params.length; i++){
		params[i] = params[i].replace("=","");
	}
	//Concatenate all URL Parametres
	var stringToSign = params.join("");
	//Add secret
	stringToSign = fAuth.secret+stringToSign;
	//MD5 Hash Function
	var sig = CryptoJS.MD5(stringToSign);
	//Return Request
	return request = request + "&api_sig="+sig;
};
fAuth.login = function(){
	var fobStr = "http://api.flickr.com/services/rest/?method=flickr.auth.getFrob&format=json&nojsoncallback=1"+fAuth.API_KEY;
	fobStr = fAuth.sign(fobStr);
	$.get(fobStr, function(data){
		frob = frob + data.frob._content;
		fAuth.authWindow();
		});
};
fAuth.authWindow = function(){
	authUrl = "http://api.flickr.com/services/auth/?&perms=read"+frob+fAuth.API_KEY;
	authUrl = fAuth.sign(authUrl);
	window.open(authUrl);
};

fAuth.getToken = function(){
	tokStr = "http://api.flickr.com/services/rest/?method=flickr.auth.getToken&format=json&nojsoncallback=1"+frob+fAuth.API_KEY;
	tokStr = fAuth.sign(tokStr);
	frob = "&frob=";
	$.get(tokStr, function(data){
		alert("Hello, "+data.auth.user.fullname);
		fAuth.username = data.auth.user.username;
		fAuth.fullname = data.auth.user.fullname;
		console.log(fAuth.fullname);
		});
};