document.addEventListener('DOMContentLoaded', function() {
	function uploadImageToIpfs(cb){
		window.cb = cb;
		window.ipfs = window.IpfsApi({
		    host: '91.201.41.253',
		    port: '5001',
		    protocol: 'http'
		});
		let div = document.createElement('div');
		div.innerHTML = '<input id="golosimagesSelector" type="file" multiple accept=".png,.jpg,.jpeg" onchange="handleFiles(this.files)" hidden="true"/>';
		(document.head||document.documentElement).appendChild(div);
		document.getElementById('golosimagesSelector').click();
	}
	let len;
	let arrIpfs;
	function handleFiles(files){
		arrIpfs = [];
		let fileList = files;
		len = fileList.length;
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
			    sendToIpfs(obj)
			};
			reader.readAsArrayBuffer(fileList[i]);
		}
	}
	function sendToIpfs(data) {
	    ipfs.files.add(data.body, function(err, file) {
	        if (err) console.log('Error');
	        else {
	        	file[0].path = `https://ipfs.io/ipfs/${file[0].hash}`
	        	arrIpfs.push(file);
	        	if(arrIpfs.length == len) cb(arrIpfs);
	        }
	    })
	}
}