
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
}, connectionNew = {
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
initConnection(connectionDefault);

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
async function handleChangeAddress(){

        let ss = await swal({
            title: 'Hosts',
            html: `<div id="change-port-html">
                        <p>
                        <div class="input-group mb-3">
                        <input id="input-api-protocol" type="text" class="form-control" placeholder="protocol">
                        <input id="input-api-address" type="text" class="form-control" placeholder="address">
                        <input id="input-api-port" type="text" class="form-control" placeholder="port">
                        </div>
                        </p>
                        <p>
                        <div class="input-group mb-3">
                        <input id="input-gateway-protocol" type="text" class="form-control" placeholder="protocol">
                        <input id="input-gateway-address" type="text" class="form-control" placeholder="address">
                        <input id="input-gateway-port" type="text" class="form-control" placeholder="port">
                        </div>
                        </p>
                        </div>`,
            type: 'info',
            buttonsStyling: true,
            position: 'top',
            showCloseButton: true,
            showCancelButton: true,
            preConfirm: async () => {
                let {
                    obj: full,
                    sendObj: result
                } = await getInputsFromChange(),
                    good = {
                        api: '',
                        gateway: ''
                    }
                for (let i in result) {
                    result[i].length != 3 && result[i].length > 0 ? good[i] = false : good[i] = true;
                }
                console.log(full);
                for (let i in full) {
                    if (full[i].some((item) => {
                            return item.value == '' && !good[i]
                        })) {
                        console.log(i, full[i], false);
                        full[i].forEach((item) => {
                            if (item.value == '') item.setAttribute('class', 'form-control is-invalid');
                            else item.setAttribute('class', 'form-control');
                        });
                    }
                }
                if (good.api && good.gateway) {
                    for (let i in full) {
                        full[i].forEach((item) => {
                            console.log('true', full[i]);
                            let arr = item.id.split('-'),
                                conn = connectionNew[arr[1]];
                            if (item.value != '') conn[arr[2]] = item.value;
                        });
                    }
                    return true;
                } else {
                    console.log(false);
                    return new Promise(resolve => {
                        swal.showValidationError(`Please enter full gateway or&and api inputs`);
                        resolve();
                    })
                }
            }
        });
        initConnection(connectionNew)
    }


    async function getInputsFromChange() {
        let obj = {
            api: [],
            gateway: [],
        }
        sendObj = {
            api: [],
            gateway: []
        }
        let arr = [];
        let ss = document.getElementById('change-port-html').getElementsByTagName('input');

        for (let i = 0; i < ss.length; i++) {
            obj[ss[i].id.split('-')[1]].push(ss[i]);

        }
        for (let i in sendObj) {
            sendObj[i] = obj[i].filter((item) => {
                if (item.value != '') return item;
            });
        }
        return {
            sendObj,
            obj
        };
    }
document.getElementById('default-node').addEventListener('click', () => {
initConnection(connectionDefault);
})