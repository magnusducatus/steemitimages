function uploadImageToIpfs(){
	let div = document.createElement('div');
	div.innerHTML = `<input id="golosimagesSelector" type="file" multiple>`
	document.getElementsByTagName('body')[0].appendChild(div);
	document.getElementById('golosimagesSelector').click();
}