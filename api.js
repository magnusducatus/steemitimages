
function uploadImageToIpfs(cb){
	window.cb = cb;
	window.ipfs = window.IpfsApi({
	    host: '91.201.41.253',
	    port: '5001',
	    protocol: 'http'
	});
	let div = document.createElement('div');
	div.innerHTML = '<input id="golosimagesSelector" type="file" onchange="handleFiles(this.files)" hidden="true"/>';
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
		    obj.body = ipfs.Buffer(data.target.result);
		    //obj.body = data.target.result;
		    obj.name = fileList.name;
		    test(obj)
		};
		reader.readAsArrayBuffer(fileList[i]);
	}
}

function test(data) {
    ipfs.files.add(data.body, function(err, file) {
        if (err) console.log('Error');
        else {
        	if (cb) cb(file);
        	else console.log(file); 
        }
    })
}