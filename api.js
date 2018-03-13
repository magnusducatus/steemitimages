function uploadImageToIpfs(){
	let ipfs = window.IpfsApi({
	    host: '91.201.41.253',
	    port: '5001',
	    protocol: 'http'
	});
	let div = document.createElement('div');
	div.innerHTML = `<input id="golosimagesSelector" type="file" multiple onchange="handleFiles(this.files)>`;
	document.getElementsByTagName('body')[0].appendChild(div);
	document.getElementById('golosimagesSelector').click();

	
}

function handleFiles(files){
	let fileList = files;
	for (var i = 0; i < fileList.length; i++) {
		const reader = new FileReader();
		reader.onload = function(data) {
		    const obj = {
		        name: '',
		        body: '',
		        hash: '',
		    };
		    //!!!!!This is for version without buffer
		    obj.body = ipfs.Buffer(data.target.result);
		    //obj.body = data.target.result;
		    obj.name = fileList.name;
		    test(obj, (file) => {
		    	console.log(file);
		    })
		};
		reader.readAsArrayBuffer(fileList[i]);
	}
}

function test(data, cb) {
    const files = [{
        path: data.name,
        content: data.body
    }];
    ipfs.files.add(files, function(err, file) {
        if (err) console.log('Error');
        else {
        	cb(file);
        }
    })
}