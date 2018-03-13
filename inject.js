function uploadImageToIpfs(){
	let div = document.createElement('div');
	div.innerHTML = `<input id="golosimagesSelector" name="myFile" type="file" multiple>`
	document.getElementsByTagName('body')[0].appendChild(div);
}