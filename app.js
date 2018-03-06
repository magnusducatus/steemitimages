var ipfs = window.IpfsApi({
    host: '91.201.41.253',
    port: '5001',
    protocol: 'http'
});

golos.config.set('websocket', 'wss://ws.testnet3.golos.io');

golos.config.set('chain_id', '5876894a41e6361bde2e73278f07340f2eb8b41c2facd29099de9deef6cdb679');

const mid = '/ipfs/';
const host = 'http://91.201.41.253:7777';
//for add to IPFS
var arr1 = [];
//for check table
var arr2 = [];
//for send to Golos
var arrGolos = new Set();
//for add to table from json golos
var arrJson = [];

function handle(e) {
    console.log(e.target.id);
    window.open(host+mid+ e.target.id);
}

function copyToGolos(e) {
    let tr = document.getElementById('tr' + e.target.id);
    let but = document.getElementsByClassName(e.target.id);
    console.log(this);
    let elem;
    if (arrGolos.delete(e.target.id)) {
        console.log('срезал', e.target.id);
        tr.setAttribute('class', '');
        this.innerHTML = 'Select to save';
        elem = true;

    } else {
        console.log(arrGolos);
    }
    if (!elem) {
        arrGolos.add(e.target.id);
        tr.setAttribute('class', 'table-success');
        this.innerHTML = 'Select to unsave';
    }
    console.log('arrGolos', arrGolos.size);
    let uploadGolos = document.getElementById('upload-golos');
    arrGolos.size > 0 ? uploadGolos.removeAttribute('hidden') : uploadGolos.setAttribute('hidden', 'true')
}


function copyLinkGolos(e) {
    this.id = e.target.id;
    console.log(e.target);
    document.getElementById(this.id).value = this.id;
    document.getElementById(this.id).select();
    try {
        document.execCommand('copy');
    } catch (err) {
        console.log('Links not correctly works', err);
    }
}
function handleChange(e){
    let map = new Map([
        ['viewer-links',host+this.id],
        ['html-embed-medium','<a href="'+host+this.id+'"><img src="'+host+this.id+'" alt="'+this.id+'" border="0"></a><br /><a target="_blank" href="'+host+this.id+'">загрузить</a><br />'],
        ['html-embed-thumbnail','<a href="'+host+this.id+'"><img src="'+host+this.id+'" alt="'+this.id+'" border="0"></a>'],
        ['bbcode-embed-medium','[url='+host+this.id+'][img]'+host+this.id+'[/img][/url][url='+host+this.id+']загрузить[/url]'],
        ['bbcode-embed-thumbnail','[url='+host+this.id+'][img]'+host+this.id+'[/img][/url]'],
        ]);
    let link = map.get(e.target.value);
   document.getElementsByClassName('td3-input')[0].value = link;
}
function _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    console.log(typeof bytes);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}
function copyLinkGolos(e) {
    this.id = e.target.id;
    console.log(e.target);
    document.getElementById(this.id).value = this.id;
    document.getElementById(this.id).select();
    try {
        document.execCommand('copy');
    } catch (err) {
        console.log('Links not correctly works', err);
    }
}

function _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    console.log(typeof bytes);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}
//Функция самой отправки данных
function test(data) {
    const tb = document.getElementById('tbody');

    const files = [{
        path: data.name,
        content: data.body
    }];
    /*ipfs.files.add(new node.types.Buffer(data.body), function(err, file) {*/
    ipfs.files.add(files, function(err, file) {
        if (err) console.log(err);
        else {
            console.log(file);
            for (let i = 0; i < file.length; i++) {
                arr2.push(file);
                let tr = document.createElement('tr');
                tr.id = 'tr' + file[i].hash + '';
                let td1 = document.createElement('td');
                let img = document.createElement('img');
                let a1 = document.createElement('a');
                a1.href = host +mid+ file[i].hash;
                a1.target = '_blank';
                a1.className = "d-flex align-items-center flex-column";
                img.src = 'data:image/jpeg;base64,' + _arrayBufferToBase64(data.body);
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
                td3div2.className = 'input-group mb-3';
                let td3p1 = document.createElement('p');
                td3.appendChild(td3div2);
                td3div2.appendChild(td3p1);

                let td3select = document.createElement('select');
                td3select.id = file[i].hash;
                td3select.onchange = handleChange;

                let td3opg1 = document.createElement('optgroup');
                td3opg1.label = 'Ссылки';
                let td3opt1 = document.createElement('option');
                td3opt1.value='viewer-links';
                td3opt1.innerHTML = 'Ссылка на просмотр'
                let td3opg2 = document.createElement('optgroup');
                td3opg2.label = 'HTML-коды';
                let td3opt2 = document.createElement('option');
                td3opt2.value='html-embed-medium';
                td3opt2.innerHTML = 'HTML-код полноразмерного со ссылкой';
                let td3opt3 = document.createElement('option');
                td3opt3.value='html-embed-thumbnail';
                td3opt3.innerHTML = 'HTML-код миниатюры со ссылкой'
                let td3opg3 = document.createElement('optgroup');
                td3opg3.label = 'BB-коды';
                let td3opt4 = document.createElement('option');
                td3opt4.value='bbcode-embed-medium';
                td3opt4.innerHTML = 'HTML-код миниатюры со ссылкой'
                let td3opt5 = document.createElement('option');
                td3opt5.value='bbcode-embed-thumbnail';
                td3opt5.innerHTML = 'HTML-код миниатюры со ссылкой'

                td3p1.appendChild(td3select);
                td3select.appendChild(td3opg1);
                td3select.appendChild(td3opg2);
                td3select.appendChild(td3opg3);
                
                td3opg1.appendChild(td3opt1);
                td3opg2.appendChild(td3opt2);
                td3opg2.appendChild(td3opt3);
                td3opg3.appendChild(td3opt4);
                td3opg3.appendChild(td3opt5);
                
                

                let input3div1 = document.createElement('div');
                input3div1.className = 'input-group mb-3';
                let input3input1 = document.createElement('input');
                input3input1.onclick = copyLink;
                input3input1.className = 'form-control td3-input';
                input3input1.value = host + file[i].hash;
                input3input1.type = 'text';
                input3input1.id = file[i].hash;
                td3.appendChild(input3div1);
                input3div1.appendChild(input3input1);

            



                let td4 = document.createElement('td');
                let td4div1 = document.createElement('div');
                td4div1.className = 'd-flex d-flex flex-column-reverse';
                let td4but1 = document.createElement('button');
                td4but1.className = 'btn btn-info icon-new-tab';
                td4but1.type = 'button';
                td4but1.innerHTML = 'Copy link';
                td4but1.id = file[i].hash;
                td4but1.onclick = copyLink;

                let td4but2 = document.createElement('button');
                td4but2.className = 'btn btn-success icon-checkmark', file[i].hash;
                td4but2.type = 'button';
                td4but2.innerHTML = 'Select to save';
                td4but2.id = file[i].hash;
                td4but2.onclick = copyToGolos;
                td4.appendChild(td4div1);
                td4div1.appendChild(td4but1);
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
            //arr2.length > 0 ? tab.style.display = 'block' : tab.style.display = 'none';
            arr2.length > 0 || arrJson.length > 0 ? tab.removeAttribute('hidden') : tab.setAttribute('hidden', 'true')
            let elemIpfs = document.getElementsByClassName('elementIpfs');
            let uploadGolos = document.getElementById('upload-golos');
        }
    })

}

function iter() {
    console.log('length', arr1.length);
    for (let i = 0; i < arr1.length; i++) {
        test(arr1[i]);
    }
    if (arr1.length != 0) swal('Added successfully!', 'Check the table!')
    arr1 = [];
}
const upload = document.getElementById('upload-btn');
upload.addEventListener("click", iter, false);

//init Dropzone
Dropzone.options.dropzone = {
    //accept file mime-type
    acceptedFiles: 'image/jpeg, image/jpg, image/png',
    dictDefaultMessage: "Drag&Drop files here or click to select files",
    autoProcessQueue: false,
    init: function() {
        this.on("addedfile", function(file) {
            //second check for mime-type
            if (file.type != 'image/jpeg' || file.type != 'image/jpg' || file.type != 'image/png') {

            } else this.removeFile(file);
            //entity for send to IPFS

            //console.log(arr1);
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
                arr1.push(obj);
                let uploadBtn = document.getElementById('upload-btn');
                uploadBtn.style.display = "block";
            };
            reader.readAsArrayBuffer(fileList);
            // Create the remove button
            var removeButton = Dropzone.createElement('<button class="btn btn-danger icon-cancel-circle"></button>');
            // Capture the Dropzone instance as closure.
            var _this = this;
            //remove all files
            document.getElementById("upload-btn").addEventListener("click", function() {
                _this.removeAllFiles();
                arr1 = [];
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

                for (let i = 0; i < arr1.length; i++) {
                    file.name == arr1[i].name ? arr1.splice(i, 1) : '';
                }
                arr1.length > 0 ? uploadBtn.style.display = "block" : uploadBtn.style.display = "none";
            });

            // Add the button to the file preview element.
            file.previewElement.appendChild(removeButton);
            file.previewElement.setAttribute('class', 'dz-preview dz-processing dz-success dz-complete dz-image-preview elementIpfs');
            file.previewElement.setAttribute('align', 'center');
        });
    }

};
let const_permlik = 'golos-save-url-test';
// if permlink NOW be equal to BEFORE, before will change 
// if parentPerm == perm - ok
function send_request(wifPar, authorPar, status) {
    this.body = ''; // post text
    this.jsonMetadata = {
        image: []
    };
    arrGolos.forEach((value) => {
        console.log('arrGolos', value);
        this.jsonMetadata.image.push(host +mid+ value);
        this.body += '<p><img src="' + host +mid+ value + '"></img>';
    });
    this.jsonMetadata = JSON.stringify(this.jsonMetadata);
    this.author = authorPar; // post author
    this.wif = wifPar; // // private posting key
    //this.permlink = 'testphotook'; // post url-adress
    //this.parentPermlink = 'photo'; // main tag
    const_permlik != this.permlink ? this.parentAuthor = '' : this.parentAuthor = 'golos';
    const_permlik != this.permlink ? this.parentPermlink = 'post' : this.parentPermlink = this.permlink;
    if (status == 'comment') {
        console.log('comment');
        this.parentAuthor = this.author;
        this.parentPermlink = const_permlik;
        this.permlink = String(Math.floor(Math.random() * (10000 - 1 + 1)) + 1);
    } else {
        console.log('post');
        this.parentAuthor = '';
        this.parentPermlink = 'ipfsimage';
        this.permlink = const_permlik;
    }
    this.title = 'IPFS images'; // post title

    golos.broadcast.comment(this.wif, this.parentAuthor, this.parentPermlink, this.author, this.permlink, this.title, this.body, this.jsonMetadata, function(err, result) {
        //console.log(err, result);
        if (!err) {
            console.log('comment', result);
            arrGolos.clear();

            let uploadGolos = document.getElementById('upload-golos');
            arrGolos.size > 0 ? uploadGolos.removeAttribute('hidden') : uploadGolos.setAttribute('hidden', 'true')

            console.log('size after + send', arrGolos.size);
            console.log('permlink + send', const_permlik, status);
            swal('Изображения добавлены')
        } else console.error(err);
    }); // add post
}
async function uploadToGolos() {
    //arrGolos.forEach( (value,set) => console.log('value',value) )
    if (wif == '') {
        await auth();
        console.log('no wif');
    } else {
        console.log('wif ', wif);
        get_content(wif, username);
        //send_request(wif);
    }


}
//get comments
function get_comments() {
    golos.api.getContentReplies('golos', const_permlik, function(err, result) {
        console.log(err, result);
    });
}

function renderTableFromJson() {
    const tb = document.getElementById('tbody');
    const tab = document.getElementById('table');
    arr2.length > 0 || arrJson.length > 0 ? tab.removeAttribute('hidden') : tab.setAttribute('hidden', 'true');
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
        let input3div1 = document.createElement('div');
        input3div1.className = 'input-group mb-3';
        let input3input1 = document.createElement('input');
        input3input1.className = 'form-control';
        input3input1.value = arrJson[i];
        input3input1.type = 'text';
        input3input1.id = arrJson[i];

        td3.appendChild(input3div1);
        input3div1.appendChild(input3input1);

        let td4 = document.createElement('td');
        let td4div1 = document.createElement('div');
        td4div1.className = 'd-flex justify-content-around';
        let td4but1 = document.createElement('button');
        td4but1.className = 'btn btn-success icon-checkmark';
        td4but1.type = 'button';
        td4but1.innerHTML = 'Copy link';
        td4but1.id = arrJson[i];
        td4but1.onclick = copyLinkGolos;

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

function get_post_json(authorPar, permlinkPar, result) {

    this.postJ = JSON.parse(result.json_metadata);
    for (let i in this.postJ.image) arrJson.push(this.postJ.image[i]);
    console.log('arrJson.length', arrJson.length);
    if (result.children == 0) {
        swal('Это пока Ваша первая запись в IPFS');
        renderTableFromJson();
    } else {
        golos.api.getContentReplies(authorPar, permlinkPar, function(err, result) {
            console.log(err, result);
            for (let s in result) {
                if (result[s].author == authorPar) {
                    let arr = JSON.parse(result[s].json_metadata);
                    for (let i in arr.image) arrJson.push(arr.image[i]);
                } else continue;
            }
            console.log('arrJson.length repllies', arrJson.length);
            renderTableFromJson();
        });
    }




}

function get_post(authorPar) {
    this.author = authorPar;
    this.permlink = const_permlik;
    golos.api.getContent(this.author, this.permlink, function(err, result) {
        console.log(err, result);
        result.id == 0 ? swal('У Вас пока нет сохраннёных записей в IPFS') : get_post_json(this.author, this.permlink, result);
        if (!err) {
            console.log('getContent', result.title);
        } else console.error(err);
    });
}

async function get_urls(authorPar) {
    if (wif == '') {
        await auth();
        console.log('no wif');
    } else {
        console.log('wif ', wif);
        get_post(username);
        //send_request(wif);
    }
}
// if input parent of comment return comment
function get_content(wifPar, authorPar) {
    this.wif = wifPar;
    this.author = authorPar;
    this.permlink = const_permlik;
    golos.api.getContent(this.author, this.permlink, function(err, result) {
        console.log(err, result);
        result.id == 0 ? send_request(this.wif, this.author, 'post') : send_request(this.wif, this.author, 'comment');
        if (!err) {
            console.log('getContent', result.title);
        } else console.error(err);
    });
}

function about_gi() {
    swal({
        title: 'About this project!',
        html: '<div>' +
            '<p class="float-left text-left">' +
            'golosICO - platform for holding ICO companies on the blockchain <a target="_blank" href="https://golos.io">Golos</a>! This platform is a thin client, that works without a backend (only frontend and blockchain) directly on the GitHub Pages (through CloudFlare).' +
            '</p>' +
            '<ul class="float-left text-left">' +
            'We use:' +
            '<li><a target="_blank" href="https://github.com/GolosChain/golos-js">Golos.js</a> - the JavaScript API for Golos blockchain;</li>' +
            '<li><a target="_blank" href="https://github.com/twbs/bootstrap">Bootstrap</a> - the most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web;</li>' +
            '<li><a target="_blank" href="http://www.dropzonejs.com">Dropzone</a> - DropzoneJS is an open source library that provides drag’n’drop file uploads with image previews;</li>' +
            '<li><a target="_blank" href="https://github.com/ipfs/js-ipfs-api">Js-ipfs-api</a> - A client library for the IPFS HTTP API, implemented in JavaScript;</li>' +
            '<li><a target="_blank" href="https://github.com/limonte/sweetalert2">SweetAlert2</a> - a beautiful, responsive, customizable, accessible replacement for JavaScript\'s popup boxes.</li>' +
            '</ul>' +
            '</div>',
        type: 'info',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-success btn-lg',
        confirmButtonText: 'Cool!',
        position: 'top'
    });
}
let golosUrls = document.getElementById('golos-urls');
golosUrls.onclick = get_urls;

let uploadGolos = document.getElementById('upload-golos');
uploadGolos.addEventListener('click', uploadToGolos, false);

let about_golosimages_call_btn = document.getElementById('about_golosimages_call_btn');
about_golosimages_call_btn.addEventListener('click', about_gi, false);