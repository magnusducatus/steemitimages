hljs.initHighlightingOnLoad();
initLang('en');
let ipfs,
    host;

let modalChange = new Modal(document.getElementById('modalChange'));

function initConnection(connection) {
    localStorage.ApiProtocol = connection.api.protocol;
    localStorage.ApiPort = connection.api.port;
    localStorage.ApiAddress = connection.api.address;
    localStorage.GateProtocol = connection.gateway.protocol;
    localStorage.GatePort = connection.gateway.port;
    localStorage.GateAddress = connection.gateway.address;
    ipfs = window.IpfsApi({
        host: connection.api.address,
        port: connection.api.port,
        protocol: connection.api.protocol
    });
    host = `${ connection.gateway.protocol }://${ connection.gateway.address }:${ connection.gateway.port }/ipfs/`;
};
const connectionDefault = {
        api: {
            protocol: `http`,
            port: `5001`,
            address: `13.59.234.79`
        },
        gateway: {
            protocol: `http`,
            port: `7777`,
            address: `13.59.234.79`
        }
    },
    connectionNew = {
        api: {
            protocol: `http`,
            port: `5001`,
            address: `13.59.234.79`
        },
        gateway: {
            protocol: `http`,
            port: `7777`,
            address: `13.59.234.79`
        }
    };
localStorage.connectionOption == 'custom' ? initConnection({
    api: {
        protocol: localStorage.ApiProtocol,
        port: localStorage.ApiPort,
        address: localStorage.ApiAddress
    },
    gateway: {
        protocol: localStorage.GateProtocol,
        port: localStorage.GatePort,
        address: localStorage.GateAddress
    }
}) : initConnection(connectionDefault);
swal.setDefaults({
    buttonsStyling: true,
    confirmButtonText: `<span class="icon-checkmark"></span> ${ document.getElementById('ok').innerHTML }`,
    confirmButtonColor: '#5cb85c',
    cancelButtonText: `<span class="icon-cross"></span> ${ document.getElementById('cancel').innerHTML }`,
    cancelButtonColor: '#d9534f',
});


golos.config.set('websocket', 'wss://ws.testnet.golos.io');
golos.config.set('chain_id', '5876894a41e6361bde2e73278f07340f2eb8b41c2facd29099de9deef6cdb679');


const hosts = ['http://91.201.41.253:5001/ipfs/', 'http://91.201.41.253:7777/ipfs/'];


function setPlaceholderIPFS(status) {
    let con;
    status == 'default' ? con = connectionDefault : con = {
        api: {
            protocol: localStorage.ApiProtocol,
            port: localStorage.ApiPort,
            address: localStorage.ApiAddress
        },
        gateway: {
            protocol: localStorage.GateProtocol,
            port: localStorage.GatePort,
            address: localStorage.GateAddress
        }
    };
    document.getElementById('input-api-protocol').setAttribute('placeholder', con.api.protocol);
    document.getElementById('input-api-address').setAttribute('placeholder', con.api.address);
    document.getElementById('input-api-port').setAttribute('placeholder', con.api.port);
    document.getElementById('input-gateway-protocol').setAttribute('placeholder', con.gateway.protocol);
    document.getElementById('input-gateway-address').setAttribute('placeholder', con.gateway.address);
    document.getElementById('input-gateway-port').setAttribute('placeholder', con.gateway.port);
}
setPlaceholderIPFS(localStorage.connectionOption);

let arrIpfs = [],
    arrTablTd = [],
    arrGolos = new Set(),
    arrJson = [];

setInterval(checkOnline, 3000);

function checkOnline() {
    const hash = 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG';
    fetch(host + hash)
        .then(res => {
            let span = document.getElementById('node-status');
            span.className = 'badge badge-success  mx-1';
            span.innerHTML = ' online';
        }).catch((err) => {
            let span = document.getElementById('node-status');
            span.className = 'badge badge-danger  mx-1';
            span.innerHTML = ' offline';
        })
}

function copyToGolos() {
    let tr = document.getElementById('tr' + this.id),
        but = document.getElementsByClassName(this.id),
        elem;
    if (arrGolos.delete(this.id)) {
        tr.setAttribute('class', '');
        this.className = 'btn btn-success';
        this.innerHTML = '<span class="icon-checkmark"></span> Select to save';
        elem = true;

    } else {}
    if (!elem) {
        arrGolos.add(this.id);
        tr.setAttribute('class', 'table-success');
        this.className = 'btn btn-danger';
        this.innerHTML = '<span class="icon-cross"></span> Select to unsave';
    }
    let uploadGolos = document.getElementById('upload-golos');
    arrGolos.size > 0 ? uploadGolos.removeAttribute('hidden') : uploadGolos.setAttribute('hidden', 'true')
}

function copyLink(e) {
    document.getElementsByClassName('td3-input' + e.target.id)[0].select();
    try {
        document.execCommand('copy');
        swal({
	        position: 'top-end',
	        title: document.getElementById('link-buffer').innerHTML,
	        type: 'success',
	        showConfirmButton: false,
	        timer: 1500,
	        toast:true,
	        animation: 'slide-from-top'
    	});
    } catch (err) {
        swal('Links not correctly works', err);
    }
}

function handleChange(e) {
    let map = new Map([
        ['viewer-links', host + this.id],
        ['html-embed-medium', '<a href="' + host + this.id + '"><img src="' + host + this.id + '" alt="' + this.id + '" border="0"></a><br /><a target="_blank" href="' + host + this.id + '">загрузить</a><br />'],
        ['bbcode-embed-medium', '[url=' + host + this.id + '][img]' + host + this.id + '[/img][/url][url=' + host + this.id + ']загрузить[/url]'],
        ['github-embed-medium', '[!' + host + this.id + '](' + host + this.id + ')'],
    ]);
    let link = map.get(e.target.value);
    document.getElementsByClassName('td3-input' + this.id)[0].value = link;
}

function arrayBufToB64(buffer) {
    let binary = '',
        bytes = new Uint8Array(buffer),
        len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

function copyLinkGolos(e) {
    this.id = e.target.id;
    document.getElementById(this.id).value = this.id;
    document.getElementById(this.id).select();
    try {
        document.execCommand('copy');
        swal({
	        position: 'top-end',
	        title: document.getElementById('link-buffer').innerHTML,
	        type: 'success',
	        showConfirmButton: false,
	        timer: 1500,
	        toast:true,
	        animation: 'slide-from-top'
    	});
    } catch (err) {
        swal('Links not correctly works', err);
    }
}

function progressCalc() {
    let result = arrProgress.length * 100 / progressLength;
    document.getElementById('loaderDiv').style.display = 'block';
    document.getElementById('loader').style.display = 'block';
    document.getElementById('progressBar').innerHTML = `<div class="progress">
        <div class="progress-bar" role="progressbar" style="width: ${ result }%;" aria-valuenow="${ arrProgress.length }" aria-valuemin="0" aria-valuemax="${ progressLength }">${ result.toFixed(0) }%</div>
        </div>`;
}
//data sending to ipfs
function sendToIpfs(data) {
    const tb = document.getElementById('tbody');

    const files = [{
        path: data.name,
        content: data.body
    }];
    progressCalc();
    ipfs.files.add(files, function(err, file) {
        if (err) {
            swal('Error');
            document.getElementById('loaderDiv').style.display = 'none';

        } else {
            arrProgress.push(file);
            progressCalc();
            for (let i = 0; i < file.length; i++) {
                arrTablTd.push(file);
                let tr = document.createElement('tr');
                tr.id = 'tr' + file[i].hash + '';
                let td1 = document.createElement('td');
                img = document.createElement('img');
                a1 = document.createElement('a');
                a1.href = host + file[i].hash;
                a1.target = '_blank';
                a1.className = "d-flex align-items-center flex-column";
                img.src = 'data:image/jpeg;base64,' + arrayBufToB64(data.body);
                img.heigth = 100;
                img.width = 100;
                a1.appendChild(img);
                
                let td2 = document.createElement('td');
                td2.className = "text-center table-size-cell"
                const result = file[i].size / 1000000;
                td2.innerHTML = result.toFixed(2);
                let td3 = document.createElement('td');
                td3.className = "text-center";




                let td3div2 = document.createElement('div');
                td3div2.className = 'form-group';
                let td3p1 = document.createElement('p');
                td3.appendChild(td3div2);
                td3div2.appendChild(td3p1);

                let td3select = document.createElement('select');
                td3select.className = "form-control";
                td3select.id = file[i].hash;
                td3select.onchange = handleChange;


                let td3opt1 = document.createElement('option');
                td3opt1.value = 'viewer-links';
                td3opt1.innerHTML = 'Links for view';
                let td3opt2 = document.createElement('option');
                td3opt2.value = 'html-embed-medium';
                td3opt2.innerHTML = 'HTML-code fullsize with link';
                let td3opt3 = document.createElement('option');
                td3opt3.value = 'bbcode-embed-medium';
                td3opt3.innerHTML = 'BB-code fullsize with link';
                let td3opt4 = document.createElement('option');
                td3opt4.value = 'github-embed-medium';
                td3opt4.innerHTML = 'GitHub fullsize with link'

                td3p1.appendChild(td3select);

                td3select.appendChild(td3opt1);
                td3select.appendChild(td3opt2);
                td3select.appendChild(td3opt3);
                td3select.appendChild(td3opt4);




                let input3div1 = document.createElement('div');
                input3div1.className = 'input-group mb-3';
                let input3input1 = document.createElement('input');
                input3input1.onclick = copyLink;
                input3input1.className = 'form-control td3-input' + file[i].hash;
                input3input1.value = host + file[i].hash;
                input3input1.type = 'text';
                input3input1.id = file[i].hash;
                td3.appendChild(input3div1);
                input3div1.appendChild(input3input1);




                let td4 = document.createElement('td');
                td4div1 = document.createElement('div');
                td4div1.className = 'd-flex d-flex flex-column-reverse';
                let td4but1 = document.createElement('button');
                td4but1.className = 'btn btn-info';
                td4but1.type = 'button';
                td4but1.innerHTML = '<span class="icon-new-tab"></span> Copy link';
                td4but1.id = file[i].hash;
                td4but1.onclick = copyLink;
                let td4br = document.createElement('br');
                td4but2 = document.createElement('button');
                td4but2.className = 'btn btn-success', file[i].hash;
                td4but2.type = 'button';
                td4but2.innerHTML = '<span class="icon-checkmark"></span> Select to save';
                td4but2.id = file[i].hash;
                td4but2.onclick = copyToGolos;
                td4.appendChild(td4div1);
                td4div1.appendChild(td4but1);
                td4div1.appendChild(td4br);
                td4div1.appendChild(td4but2);

                td1.appendChild(a1);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);

                tb.appendChild(tr);
            }
            let tab = document.getElementById('table');
            arrTablTd.length > 0 || arrJson.length > 0 ? tab.removeAttribute('hidden') : tab.setAttribute('hidden', 'true')
            if (arrProgress.length == progressLength) {
                document.getElementById('progressBar').removeChild(document.getElementsByClassName('progress')[0]);
                document.getElementById('loader').style.display = 'none';
                document.getElementById('loaderDiv').style.display = 'none';
                arrProgress = [];
                document.getElementsByTagName('body').style = `margin-bottom: 60px;`;
            }
        }
    });

}
let arrProgress = [];
let progressLength = '';

function iter() {
    document.getElementsByTagName('body').style = `background: #fff;width: 100%;height: 100%;position: fixed;display: block;top: 0;opacity: 0.8;`;
    progressLength = arrIpfs.length;
    for (let i = 0; i < arrIpfs.length; i++) {
        sendToIpfs(arrIpfs[i]);
    }
    if (arrIpfs.length != 0) swal({
        position: 'top-end',
        title: document.getElementById('added-true').innerHTML,
        type: 'success',
        showConfirmButton: false,
        timer: 1500,
        toast:true,
        animation: 'slide-from-top'
    });
    arrIpfs = [];
}
const upload = document.getElementById('upload-btn');
upload.addEventListener("click", iter, false);

function retrieveImageFromClipboardAsBase64(pasteEvent, callback, imageFormat) {
    if (pasteEvent.clipboardData == false) {
        if (typeof(callback) == "function") {
            callback(undefined);
        }
    }

    let items = pasteEvent.clipboardData.items;

    if (items == undefined) {
        if (typeof(callback) == "function") {
            callback(undefined);
        }
    }

    for (let i = 0; i < items.length; i++) {
        // Skip content if not image
        if (items[i].type.indexOf("image") == -1) continue;
        // Retrieve image on clipboard as blob
        let blob = items[i].getAsFile();

        // Create an abstract canvas and get context
        let mycanvas = document.createElement("canvas"),
            ctx = mycanvas.getContext('2d');

        // Create an image
        let img = new Image();

        // Once the image loads, render the img on the canvas
        img.onload = function() {
            // Update dimensions of the canvas with the dimensions of the image
            mycanvas.width = this.width;
            mycanvas.height = this.height;

            // Draw the image
            ctx.drawImage(img, 0, 0);

            // Execute callback with the base64 URI of the image
            if (typeof(callback) == "function") {
                callback(mycanvas.toDataURL(
                    (imageFormat || "image/png")
                ));
            }
        };

        // Crossbrowser support for URL
        let URLObj = window.URL || window.webkitURL;

        // Creates a DOMString containing a URL representing the object given in the parameter
        // namely the original Blob
        img.src = URLObj.createObjectURL(blob);
    }
}

function retrieveImageFromClipboardAsBlob(pasteEvent, callback) {
    if (pasteEvent.clipboardData == false) {
        if (typeof(callback) == "function") {
            callback(undefined);
        }
    }

    let items = pasteEvent.clipboardData.items;

    if (items == undefined) {
        if (typeof(callback) == "function") {
            callback(undefined);
        }
    }

    for (let i = 0; i < items.length; i++) {
        // Skip content if not image
        if (items[i].type.indexOf("image") == -1) continue;
        // Retrieve image on clipboard as blob
        let blob = items[i].getAsFile();

        if (typeof(callback) == "function") {
            callback(blob);
        }
    }
}
//init Dropzone
Dropzone.options.dropzone = {
    //accept file mime-type
    acceptedFiles: 'image/jpeg, image/jpg, image/png',
    dictDefaultMessage: `<div class="d-flex justify-content-center">
        <div class="text-left">
        <br>Drag&Drop files here or click to select files.
                            <div class="text-center">OR</div>
    1. Click on the window you want to capture.
    <br>2. Press <span id="step0"><kbd>Alt</kbd> + <kbd>Print Screen</kbd></span>.
    <br>3. Turn back to this page.
    <br>4. Press <span id="step1"><kbd>Ctrl</kbd> + <kbd>V</kbd></span> to upload the image.
    <br><button id="instruction-for"type="button" class="btn btn-link">instruction for <span id="step2"><span class="icon-appleinc"> Mac</span></span></button></div>
    </div>`,
    autoProcessQueue: false,
    init: function() {
        window.addEventListener("paste", (pasteEvent) => {
            //var items = pasteEvent.clipboardData.items;
            retrieveImageFromClipboardAsBlob(pasteEvent, (file) => {
                //let myD = new Dropzone('#dropzone');
                retrieveImageFromClipboardAsBase64(pasteEvent, (imageDataBase64) => {
                    // If there's an image, open it in the browser as a new window :)
                    if (imageDataBase64) {
                        // data:image/png;base64,iVBORw0KGgoAAAAN......
                        //window.open(imageDataBase64);
                        file.status = "added";
                        this.emit('addedfile', file);
                        this.emit("thumbnail", file, imageDataBase64);
                    }
                });
            }, false);

        }, false);
        this.on('dragenter', function(event) {
            document.getElementById('dropzone').style.border = '5px dashed #80A6FF';
            document.getElementById('dropzone').style.background = '#696969'
            document.getElementById('dropzone').style.color = 'white';

        });
        this.on('dragover', function(event) {
            document.getElementById('dropzone').style.border = '5px dashed #80A6FF';
            document.getElementById('dropzone').style.background = '#696969';
            document.getElementById('dropzone').style.color = 'white';
        });
        this.on('drop', function() {
            document.getElementById('dropzone').style.border = '2px dashed #80A6FF';
            document.getElementById('dropzone').style.background = ' #FFFFFF';
            document.getElementById('dropzone').style.color = 'black';
        });
        this.on('dragleave', function() {
            document.getElementById('dropzone').style.border = '2px dashed #80A6FF';
            document.getElementById('dropzone').style.background = ' #FFFFFF';
            document.getElementById('dropzone').style.color = 'black';
        });
        let mark = true;
        document.getElementById('instruction-for').addEventListener('click', (e) => {
            e.stopPropagation();
            mark = !mark;
            let steps = {
                true: ['<kbd>Alt</kbd> + <kbd>Print Screen</kbd>', '<kbd>Ctrl</kbd> + <kbd>V</kbd>', '<span class="icon-appleinc"> Mac</span>'],
                false: ['<kbd>Shift</kbd> + <kbd>Ctrl</kbd> + <kbd>Cmd</kbd> + <kbd>3</kbd>', '<kbd>Cmd</kbd> + <kbd>V</kbd>', '<span class="icon-windows"> Windows</span>']
            }
            for (let i = 0; i < 3; i++) {
                document.getElementById('step' + i).innerHTML = steps[mark][i];
            }

        })
        this.on("addedfile", function(file) {
            //second check for mime-type
            if (file.type != 'image/jpeg' || file.type != 'image/jpg' || file.type != 'image/png') {

            } else this.removeFile(file);
            //entity for send to IPFS
            let fileList = file;
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
                arrIpfs.push(obj);
                let uploadBtn = document.getElementById('upload-btn');
                uploadBtn.style.display = "block";
            };
            reader.readAsArrayBuffer(fileList);
            // Create the remove button
            let removeButton = Dropzone.createElement('<button class="btn btn-danger icon-cancel-circle"></button>');
            // Capture the Dropzone instance as closure.
            var _this = this;
            //remove all files
            document.getElementById("upload-btn").addEventListener("click", function() {
                let elem = document.getElementsByClassName('elementIpfs');
                for (let i = 0; i < elem.length; i++) {
                    document.getElementById('dropzone').removeChild(elem[i]);
                }
                _this.removeAllFiles();
                arrIpfs = [];
                let uploadBtn = document.getElementById('upload-btn');
                uploadBtn.style.display = "none";
            });
            // Listen to the click event
            removeButton.addEventListener("click", function(e) {
                // Make sure the button click doesn't submit the form:
                e.preventDefault();
                e.stopPropagation();

                // Remove the file preview.
                _this.removeFile(file);
                let uploadBtn = document.getElementById('upload-btn');

                for (let i = 0; i < arrIpfs.length; i++) {
                    file.name == arrIpfs[i].name ? arrIpfs.splice(i, 1) : '';
                }
                arrIpfs.length > 0 ? uploadBtn.style.display = "block" : uploadBtn.style.display = "none";
            });

            // Add the button to the file preview element.
            file.previewElement.appendChild(removeButton);
            file.previewElement.setAttribute('class', 'dz-preview dz-processing dz-success dz-complete dz-image-preview elementIpfs');
            file.previewElement.setAttribute('align', 'center');
        });
    }

};
let constPermlik = 'golos-save-url-test1';
// if permlink NOW be equal to BEFORE, before will change 
// if parentPerm == perm - ok
function sendRequest(wifPar, authorPar, status) {
    this.body = ''; // post text
    this.jsonMetadata = {
        app: 'golosimages/0.1',
        canonical: `https://golosimages.com#${ username }/${ constPermlik }`,
        app_account: 'golosapps',
        data: []
    };
    arrGolos.forEach((value) => {
        this.jsonMetadata.data.push(host + value);
        this.body += '<p><img src="' + host + value + '"></img>';
    });
    this.jsonMetadata = JSON.stringify(this.jsonMetadata);
    this.author = authorPar; // post author
    this.wif = wifPar; // // private posting key
    //this.permlink = 'testphotook'; // post url-adress
    //this.parentPermlink = 'photo'; // main tag
    constPermlik != this.permlink ? this.parentAuthor = '' : this.parentAuthor = 'golos';
    constPermlik != this.permlink ? this.parentPermlink = 'post' : this.parentPermlink = this.permlink;
    if (status == 'comment') {
        this.parentAuthor = this.author;
        this.parentPermlink = constPermlik;
        this.permlink = String(Math.floor(Math.random() * (10000 - 1 + 1)) + 1);
    } else {
        this.parentAuthor = '';
        this.parentPermlink = 'ipfsimage';
        this.permlink = constPermlik;
    }
    this.title = 'IPFS images'; // post title

    golos.broadcast.comment(this.wif, this.parentAuthor, this.parentPermlink, this.author, this.permlink, this.title, this.body, this.jsonMetadata, function(err, result) {
        if (!err) {
            arrGolos.clear();

            let uploadGolos = document.getElementById('upload-golos');
            arrGolos.size > 0 ? uploadGolos.removeAttribute('hidden') : uploadGolos.setAttribute('hidden', 'true')

            swal({
                position: 'top-end',
                html: document.getElementById('image-added').innerHTML,
                showConfirmButton: false,
                toast: true,
                timer: 1500

            })
        } else console.error(err);
    }); // add post
}

function uploadToGolos() {
    auth(() => {
        golos.api.getContent(username, constPermlik, function(err, result) {
            result.id == 0 ? sendRequest(wif['posting'], username, 'post') : sendRequest(wif['posting'], username, 'comment');
            if (err) swal(err);
        });
    });
}
//get comments
function getComments() {
    golos.api.getContentReplies('golos', constPermlik, function(err, result) {});
}

function renderTableFromJson() {
    const tb = document.getElementById('tbody_golos'),
        tab = document.getElementById('table_golos');
    document.getElementById('thead_golos').innerHTML = `
                                <th class="text-center">${document.getElementById('table-preview').innerHTML}</th>
                                <th class="text-center">${document.getElementById('table-size').innerHTML}</th>
                                <th class="text-center">${document.getElementById('table-hash').innerHTML}</th>
                                <th class="text-center"></th>`;
    tb.innerHTML = '';
    arrTablTd.length > 0 || arrJson.length > 0 ? tab.removeAttribute('hidden') : tab.setAttribute('hidden', 'true');
    for (let i = 0; i < arrJson.length; i++) {
        let tr = document.createElement('tr');
        tr.className = ' ' + arrJson[i] + ' ';
        let td1 = document.createElement('td');
        img = document.createElement('img');
        a1 = document.createElement('a');
        a1.href = arrJson[i];
        a1.target = '_blank';
        a1.className = "d-flex align-items-center flex-column";
        img.src = arrJson[i];
        img.heigth = 100;
        img.width = 100;


        a1.appendChild(img);
        //img.onclick = handle;
        let td2 = document.createElement('td');
        td2.className = "text-center table-size-cell";
        td3 = document.createElement('td');
        td3.className = "text-center";
        //td2.onclick = handle; 
        let td3div2 = document.createElement('div');
        td3div2.className = 'form-group';
        let td3p1 = document.createElement('p');
        td3.appendChild(td3div2);
        td3div2.appendChild(td3p1);

        let td3select = document.createElement('select');
        td3select.className = "form-control";
        td3select.id = arrJson[i];
        td3select.onchange = handleChange;

        let td3opt1 = document.createElement('option');
        td3opt1.value = 'viewer-links';
        td3opt1.innerHTML = 'Links for view';
        let td3opt2 = document.createElement('option');
        td3opt2.value = 'html-embed-medium';
        td3opt2.innerHTML = 'HTML-code fullsize with link';
        let td3opt3 = document.createElement('option');
        td3opt3.value = 'bbcode-embed-medium';
        td3opt3.innerHTML = 'BB-code fullsize with link';
        let td3opt4 = document.createElement('option');
        td3opt4.value = 'github-embed-medium';
        td3opt4.innerHTML = 'GitHub fullsize with link';

        td3p1.appendChild(td3select);

        td3select.appendChild(td3opt1);
        td3select.appendChild(td3opt2);
        td3select.appendChild(td3opt3);
        td3select.appendChild(td3opt4);

        let input3div1 = document.createElement('div');
        input3div1.className = 'input-group mb-3';
        let input3input1 = document.createElement('input');
        input3input1.className = 'form-control td3-input' + arrJson[i];
        input3input1.value = arrJson[i];
        input3input1.type = 'text';
        input3input1.id = arrJson[i];

        td3.appendChild(input3div1);
        input3div1.appendChild(input3input1);


        let td4 = document.createElement('td');
        td4div1 = document.createElement('div');
        td4div1.className = 'd-flex justify-content-around';
        let td4but1 = document.createElement('button');
        td4but1.className = 'btn btn-info';
        td4but1.type = 'button';
        td4but1.innerHTML = '<span class="icon-checkmark"></span> Copy link';
        td4but1.id = arrJson[i];
        td4but1.onclick = copyLink;

        td4.appendChild(td4div1);
        td4div1.appendChild(td4but1);

        td1.appendChild(a1);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        //tr.appendChild(td3);
        tb.appendChild(tr);
    }
    arrJson = [];

}

function getPostJson(authorPar, permlinkPar, result) {

    this.postJ = JSON.parse(result.json_metadata);
    for (let i in this.postJ.data) arrJson.push(this.postJ.data[i]);
    if (result.children == 0) {
        swal({
            type: 'success',
            position: 'top-end',
            html: document.getElementById('check-table-for-records').innerHTML,
            toast: true,
            showConfirmButton: false,
            timer: 1500
        });
        renderTableFromJson();
    } else {
        golos.api.getContentReplies(authorPar, permlinkPar, function(err, result) {
            for (let s in result) {
                if (result[s].author == authorPar) {
                    let arr = JSON.parse(result[s].json_metadata);
                    for (let i in arr.data) arrJson.push(arr.data[i]);
                } else continue;
            }
            renderTableFromJson();
        });
    }
}

function noRecordsIpfs(){
    document.getElementById('thead_golos').innerHTML = `<tr><th class="text-center"> ${document.getElementById('table-preview').innerHTML} </th></tr>`
    document.getElementById('table_golos').removeAttribute('hidden');
    let tb = document.getElementById('tbody_golos');
    tb.innerHTML = '';
    tb.innerHTML = `<tr><td class="text-center">${document.getElementById('no-records-IPFS').innerHTML}</td></tr>`;
  /*  swal({
        html: document.getElementById('no-records-IPFS').innerHTML
    })*/
}
document.getElementById('golos-urls').addEventListener('click', function() {
    auth(() => {
        golos.api.getContent(username, constPermlik, function(err, result) {
            result.id == 0 ? noRecordsIpfs() : getPostJson(username, constPermlik, result);
            if (err) swal(err);
        });
    }, ['posting', 'active']);
});

document.getElementById('upload-golos').addEventListener('click', uploadToGolos, false);

document.getElementById('aboutGolosImagesCallBtn').addEventListener('click', () => {
    swal({
        title: document.getElementById('about-html-title').innerHTML,
        html: document.getElementById('about-html').innerHTML,
        type: 'info',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-success btn-lg',
        confirmButtonText: document.getElementById('button-cool').innerHTML,
        position: 'top',
        showCloseButton: true
    });
}, false);
document.getElementById('integration').addEventListener('click', function() {
    swal({
        title: document.getElementById('integration-html-title').innerHTML,
        html: document.getElementById('integration-html').innerHTML,
        type: 'info',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-success btn-lg',
        confirmButtonText: `<span class="icon-checkmark"></span> ${ document.getElementById('cool').innerHTML }`,
        position: 'top',
        showCloseButton: true
    });

});
//inputs[i].addEventListener('onchange',()=>{alert(2)})

let inputs = document.getElementById('modalChange').getElementsByTagName('input');
//for(let i in inputs) inputs[i].addEventListener('click',()=>{console.log(2)});
for(let i = 0; i < inputs.length; i++) inputs[i].addEventListener('input',(e)=>{
    e.target.setAttribute('class','form-control');
});
document.getElementById('change-port').addEventListener('click', function() {
    modalChange.show();
    document.getElementById('change-node-cancel').addEventListener('click', function() {
        modalChange.hide();
    });
    document.getElementById('change-node-close').addEventListener('click', function() {
        modalChange.hide();
    });
    document.getElementById('change-node-default').addEventListener('click', function() {
        initConnection(connectionDefault);
        localStorage.connectionOption = 'default';
        setPlaceholderIPFS(localStorage.connectionOption);
        let elem = document.getElementById('modalChange').getElementsByTagName('input');
        for (let i in elem) {
            elem[i].value = '';
        }
        modalChange.hide();
    });
    document.getElementById('change-node-ok').addEventListener('click', async () => {
        let {
            obj: full,
            sendObj: result
        } = await getInputsFromChange(),
            good = {
                api: '',
                gateway: ''
            };
        for (let i in result) {
            result[i].length != 3 && result[i].length > 0 ? good[i] = false : good[i] = true;
        }
        for (let i in full) {
            if (full[i].some((item) => {
                    return item.value == '' && !good[i]
                })) {
                full[i].forEach((item) => {
                    if (item.value == '') item.setAttribute('class', 'form-control is-invalid');
                    else item.setAttribute('class', 'form-control');
                });
            }
        }
        if (good.api && good.gateway) {
            for (let i in full) {
                full[i].forEach((item) => {
                    let arr = item.id.split('-'),
                        conn = connectionNew[arr[1]];
                    if (item.value != '') conn[arr[2]] = item.value;
                });
            }
            initConnection(connectionNew);
            localStorage.connectionOption = 'custom';
            let elem = document.getElementById('modalChange').getElementsByTagName('input');
            for (let i in elem) {
                elem[i].value = '';
            }
            setPlaceholderIPFS(localStorage.connectionOption);
            modalChange.hide();
        } else {
            swal({
                title: `${ document.getElementById('modal-error').innerHTML }`,
                type: 'error',
                showConfirmButton: false,
                position: 'center',
                timer: 2000,
                animation: 'slide-from-top'
            });
        }
    });
});
async function getInputsFromChange() {
    let obj = {
        api: [],
        gateway: [],
    };
    sendObj = {
        api: [],
        gateway: []
    };
    let arr = [],
        ss = document.getElementById('modalChange').getElementsByTagName('input');

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