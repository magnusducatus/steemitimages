
function uploadImageToIpfs(cb){
	initConnection(connectionDefault)
	window.cb = cb;
	let div = document.createElement('div');
	div.innerHTML = '<input id="golosimagesSelector" type="file" multiple accept=".png,.jpg,.jpeg" onchange="handleFiles(this.files)" hidden="true"/>';
	(document.head||document.documentElement).appendChild(div);
	document.getElementById('golosimagesSelector').click();
}
const connectionDefault = {
    api :{
        protocol:`http`,
        port:`5001`,
        address:`91.201.41.253`
    },
    gateway: {
        protocol:`http`,
        port:`7777`,
        address:`91.201.41.253`
    }
}

let len, arrIpfs,ipfs;
localStorage.connectionCustoms ? initConnection(localStorage.connectionCustoms) : initConnection(connectionDefault);


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
        	file[0].path = `${host}`
        	arrIpfs.push(file);
        	if(arrIpfs.length == len) cb(arrIpfs);
        }
    })
}
function initConnection(connection){
		ipfs = window.IpfsApi({
	        host: connection.api.address,
	        port: connection.api.port,
	        protocol: connection.api.protocol
				 });
		host = `${connection.gateway.protocol}://${connection.gateway.address}:${connection.gateway.port}/ipfs/`;
	};
