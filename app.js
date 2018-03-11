initLang('en');
let ipfs = window.IpfsApi({
    host: '91.201.41.253',
    port: '5001',
    protocol: 'http'
});

swal.setDefaults({
    buttonsStyling: true,
    confirmButtonText: '<span class="icon-checkmark"></span> Ok',
    confirmButtonColor: '#5cb85c',
    cancelButtonText: '<span class="icon-cross"></span> Cancel',
    cancelButtonColor: '#d9534f',
});


golos.config.set('websocket', 'wss://ws.testnet3.golos.io');
golos.config.set('chain_id', '5876894a41e6361bde2e73278f07340f2eb8b41c2facd29099de9deef6cdb679');

const host = 'http://91.201.41.253:7777/ipfs/';

let arrIpfs = [];

let arrTablTd = [];

let arrGolos = new Set();

let arrJson = [];

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

function copyToGolos(e) {
    let tr = document.getElementById('tr' + this.id);
    let but = document.getElementsByClassName(this.id);
    let elem;
    if (arrGolos.delete(this.id)) {
        tr.setAttribute('class', '');
        this.className = 'btn btn-success';
        this.innerHTML = '<span class="icon-checkmark"></span> Select to save';
        elem = true;

    } else {
    }
    if ( ! elem) {
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
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
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
    } catch (err) {
        swal('Links not correctly works', err);
    }
}

//data sending to ipfs
function test(data) {
    const tb = document.getElementById('tbody');

    const files = [{
        path: data.name,
        content: data.body
    }];
    /*ipfs.files.add(new node.types.Buffer(data.body), function(err, file) {*/
    ipfs.files.add(files, function(err, file) {
        if (err) swal(err);
        else {
            for (let i = 0; i < file.length; i++) {
                arrTablTd.push(file);
                let tr = document.createElement('tr');
                tr.id = 'tr' + file[i].hash + '';
                let td1 = document.createElement('td');
                let img = document.createElement('img');
                let a1 = document.createElement('a');
                a1.href = host + file[i].hash;
                a1.target = '_blank';
                a1.className = "d-flex align-items-center flex-column";
                img.src = 'data:image/jpeg;base64,' + arrayBufToB64(data.body);
                img.heigth = 100;
                img.width = 100;
                a1.appendChild(img);

                let td2 = document.createElement('td');
                td2.className = "text-center"
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
                td3opt1.innerHTML = 'Links for view'
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
                let td4div1 = document.createElement('div');
                td4div1.className = 'd-flex d-flex flex-column-reverse';
                let td4but1 = document.createElement('button');
                td4but1.className = 'btn btn-info';
                td4but1.type = 'button';
                td4but1.innerHTML = '<span class="icon-new-tab"></span> Copy link';
                td4but1.id = file[i].hash;
                td4but1.onclick = copyLink;
                let td4br = document.createElement('br');
                let td4but2 = document.createElement('button');
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

                //tr.appendChild(td3);
                tb.appendChild(tr);
            }
            let tab = document.getElementById('table');
            //arrTablTd.length > 0 ? tab.style.display = 'block' : tab.style.display = 'none';
            arrTablTd.length > 0 || arrJson.length > 0 ? tab.removeAttribute('hidden') : tab.setAttribute('hidden', 'true')
            let elemIpfs = document.getElementsByClassName('elementIpfs');
            let uploadGolos = document.getElementById('upload-golos');
        }
    })

}

function iter() {
    for (let i = 0; i < arrIpfs.length; i++) {
        test(arrIpfs[i]);
    }
    if (arrIpfs.length != 0) swal({html:'Added successfully! Check the table!'})
    arrIpfs = [];
}
const upload = document.getElementById('upload-btn');
upload.addEventListener("click", iter, false);

//init Dropzone
Dropzone.options.dropzone = {
    //accept file mime-type
    acceptedFiles: 'image/jpeg, image/jpg, image/png',
    dictDefaultMessage: 'Drag&Drop files here or click to select files',
    autoProcessQueue: false,
    init: function() {
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
                //!!!!!This is for version without buffer
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
            let _this = this;
            //remove all files
            document.getElementById("upload-btn").addEventListener("click", function() {
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
        app : 'golosimages/0.1',
        canonical : `https://golosimages.com#${username}/${constPermlik}`, 
        app_account : 'golosapps',
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
        if ( ! err) {
            arrGolos.clear();

            let uploadGolos = document.getElementById('upload-golos');
            arrGolos.size > 0 ? uploadGolos.removeAttribute('hidden') : uploadGolos.setAttribute('hidden', 'true')

            swal({html:'Images added'})
        } else console.error(err);
    }); // add post
}
async function uploadToGolos() {
    if ( wif == '' ) {
        await auth();
    } else {
        golos.api.getContent(username, constPermlik, function(err, result) {
            result.id == 0 ? sendRequest(wif, username, 'post') : sendRequest(wif, username, 'comment');
            if ( err ) swal(err);
        });
    }   
}
//get comments
function getComments() {
    golos.api.getContentReplies('golos', constPermlik, function(err, result) {
    });
}

function renderTableFromJson() {
    const tb = document.getElementById('tbody');
    const tab = document.getElementById('table');
    arrTablTd.length > 0 || arrJson.length > 0 ? tab.removeAttribute('hidden') : tab.setAttribute('hidden', 'true');
    for (let i = 0; i < arrJson.length; i++) {
        let tr = document.createElement('tr');
        tr.className = ' ' + arrJson[i] + ' ';
        let td1 = document.createElement('td');
        let img = document.createElement('img');
        let a1 = document.createElement('a');
        a1.href = arrJson[i];
        a1.target = '_blank';
        a1.className = "d-flex align-items-center flex-column";
        img.src = arrJson[i];
        /*img.src = 'https://www.w3schools.com/images/w3schools_green.jpg';*/
        img.heigth = 100;
        img.width = 100;


        a1.appendChild(img);
        //img.onclick = handle;
        let td2 = document.createElement('td');
        td2.className = "text-center"
        /*const result = arrJson[i] / 1000000;
        td2.innerHTML = result.toFixed(2);*/
        let td3 = document.createElement('td');
        //td2.id = file[i].hash;
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
        td3opt1.innerHTML = 'Links for view'
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
        input3input1.className = 'form-control td3-input' + arrJson[i];
        input3input1.value = arrJson[i];
        input3input1.type = 'text';
        input3input1.id = arrJson[i];

        td3.appendChild(input3div1);
        input3div1.appendChild(input3input1);


        let td4 = document.createElement('td');
        let td4div1 = document.createElement('div');
        td4div1.className = 'd-flex justify-content-around';
        let td4but1 = document.createElement('button');
        td4but1.className = 'btn btn-success';
        td4but1.type = 'button';
        td4but1.innerHTML = '<span class="icon-checkmark"></span> Copy link';
        td4but1.id = arrJson[i];
        td4but1.onclick = copyLink;

        /*let td4but2 = document.createElement('button');
        td4but2.className = 'btn btn-outline-secondary';
        td4but2.type = 'button';
        td4but2.innerHTML = 'Select to save';
        td4but2.id = file[i];
        td4but2.onclick = copyToGolos;
        */
        td4.appendChild(td4div1);
        td4div1.appendChild(td4but1);
        /* td4div1.appendChild(td4but2);
         */
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
        swal({html:'Check table for records'});
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


async function getUrls() {
    if (wif == '') {
        await auth();
    } else {
        golos.api.getContent(username, constPermlik, function(err, result) {
            result.id == 0 ? swal({html:'You have\'t got records in IPFS'}) : getPostJson(username, constPermlik, result);
            if ( err )swal(err);
        });
    }
}

document.getElementById('golos-urls').onclick = getUrls;

document.getElementById('upload-golos').addEventListener('click', uploadToGolos, false);

document.getElementById('aboutGolosImagesCallBtn').addEventListener('click', ()=>{
    swal({
        title: 'About this project!',
        html: `<div>
            <p class="float-left text-left">
            GolosImages - this microservice for storing images on the  blockchain <a target="_blank" href="https://golos.io">Golos</a> and <a target="_blank" href="https://ipfs.io/">IPFS</a>. This platform is a thin client, that works without a backend (only frontend and blockchain) directly on the GitHub Pages (through CloudFlare).
            </p>
            <ul class="float-left text-left">
            We use:
            <li><a target="_blank" href="https://github.com/GolosChain/golos-js">Golos.js</a> - the JavaScript API for Golos blockchain;</li>
            <li><a target="_blank" href="https://github.com/twbs/bootstrap">Bootstrap</a> - the most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web;</li>
            <li><a target="_blank" href="http://www.dropzonejs.com">Dropzone</a> - DropzoneJS is an open source library that provides drag’n’drop file uploads with image previews;</li>
            <li><a target="_blank" href="https://github.com/padolsey/findAndReplaceDOMText">FindAndReplaceDOMText</a> - searches for regular expression matches in a given DOM node and replaces or wraps each match with a node or piece of text that you can specify;</li>
            <li><a target="_blank" href="https://www.i18next.com">I18next</a> - is an internationalization-framework written in and for JavaScript;</li>
            <li><a target="_blank" href="https://github.com/ipfs/js-ipfs-api">Js-ipfs-api</a> - A client library for the IPFS HTTP API, implemented in JavaScript;</li>
            <li><a target="_blank" href="https://github.com/limonte/sweetalert2">SweetAlert2</a> - a beautiful, responsive, customizable, accessible replacement for JavaScript's popup boxes.</li>
            </ul>
            </div>`,
        type: 'info',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-success btn-lg',
        confirmButtonText: '<span class="icon-checkmark"></span> Cool!',
        position: 'top',
        showCloseButton: true
    });
}, false);
