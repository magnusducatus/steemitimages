var ipfs = window.IpfsApi({
    host: '91.201.41.253',
    port: '5001',
    protocol: 'http'
});

golos.config.set('websocket', 'wss://ws.testnet3.golos.io');

golos.config.set('chain_id', '5876894a41e6361bde2e73278f07340f2eb8b41c2facd29099de9deef6cdb679');

const host = 'http://91.201.41.253:7777/ipfs/';
//for add to IPFS
var arr1 = [];
//for check table
var arr2 = [];
//for send to Golos
var arrGolos = new Set();

function handle(e) {
    console.log(e.target.id);
    window.open(host + e.target.id);
}

function copyToGolos(e) {
    arrGolos.add(e.target.id);
    console.log('arrGolos', arrGolos.size);
    let uploadGolos = document.getElementById('uploadGolos');
    arrGolos.size > 0 ? uploadGolos.removeAttribute('hidden') : uploadGolos.setAttribute('hidden', 'true')
}

function copyLink(e) {
    this.id = e.target.id;
    document.getElementById(this.id).value = host + this.id;
    document.querySelector('#' + this.id).select();
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
                tr.className = ' ' + file[i].hash + ' ';
                let td1 = document.createElement('td');
                let img = document.createElement('img');
                let a1 = document.createElement('a');
                a1.href = host + file[i].hash;
                a1.target = '_blank';
                img.src = 'data:image/jpeg;base64,' + _arrayBufferToBase64(data.body);
                img.heigth = 100;
                img.width = 100;
                a1.appendChild(img);
                //img.onclick = handle;
                let td2 = document.createElement('td');
                td2.className = "text-center"
                const result = file[i].size / 1000000;
                td2.innerHTML = result.toFixed(2);
                let td3 = document.createElement('td');
                //td2.id = file[i].hash;
                td3.className = "text-center";
                //td2.onclick = handle; 
                let input3div1 = document.createElement('div');
                input3div1.className = 'input-group mb-3';
                let input3input1 = document.createElement('input');
                input3input1.onclick = copyLink;
                input3input1.className = 'form-control';
                input3input1.value = host + file[i].hash;
                input3input1.type = 'text';
                input3input1.id = file[i].hash;
                td3.appendChild(input3div1);
                input3div1.appendChild(input3input1);

                let td4 = document.createElement('td');
                let td4div1 = document.createElement('div');
                td4div1.className = 'input-group-append';
                let td4but1 = document.createElement('button');
                td4but1.className = 'btn btn-outline-secondary';
                td4but1.type = 'button';
                td4but1.innerHTML = 'Copy link';
                td4but1.id = file[i].hash;

                let td4but2 = document.createElement('button');
                td4but2.className = 'btn btn-outline-secondary';
                td4but2.type = 'button';
                td4but2.innerHTML = 'Select to save';
                td4but2.id = file[i].hash;
                td4but2.onclick = copyToGolos;
                td4.appendChild(td4div1);
                td4div1.appendChild(td4but1);
                td4div1.appendChild(td4but2);
                /* let input2 = document.createElement('input');
                 input2.id = file[i].hash;
                 input2.value = host + file[i].hash;
                 input2.readonly = "true";*/
                /*  let td3 = document.createElement('td');
                  td3.className = "text-center";
                  let button3 = document.createElement('button');
                  button3.id = file[i].hash;
                  button3.type = 'button';
                  button3.onclick = copyLink;
                  button3.innerHTML = 'Copy link';
                  button3.className = 'btn btn-link';*/



                //input3div2.appendChild(input3but);

                td1.appendChild(a1);
                //td2.appendChild(input2);
                //td3.appendChild(button3);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);

                //tr.appendChild(td3);
                tb.appendChild(tr);
            }
            let tab = document.getElementById('table');
            //arr2.length > 0 ? tab.style.display = 'block' : tab.style.display = 'none';
            arr2.length > 0 ? tab.removeAttribute('hidden') : tab.setAttribute('hidden', 'true')
            let elemIpfs = document.getElementsByClassName('elementIpfs');
            let uploadGolos = document.getElementById('uploadGolos');
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
const upload = document.getElementById('uploadBtn');
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
                let uploadBtn = document.getElementById('uploadBtn');
                uploadBtn.style.display = "block";
            };
            reader.readAsArrayBuffer(fileList);
            // Create the remove button
            var removeButton = Dropzone.createElement('<button class="btn btn-warning">Remove file</button>');
            // Capture the Dropzone instance as closure.
            var _this = this;
            //remove all files
            document.getElementById("uploadBtn").addEventListener("click", function() {
                _this.removeAllFiles();
                arr1 = [];
                let uploadBtn = document.getElementById('uploadBtn');
                uploadBtn.style.display = "none";
            });
            // Listen to the click event
            removeButton.addEventListener("click", function(e) {
                // Make sure the button click doesn't submit the form:
                e.preventDefault();
                e.stopPropagation();

                // Remove the file preview.
                _this.removeFile(file);
                let uploadBtn = document.getElementById('uploadBtn');

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
let golos_save_url_test = '';
// if permlink NOW be equal to BEFORE, before will change 
function send_comment(permlink, title, jsonMetadata) {
    this.parentAuthor = 'golos'; // for post creating, empty field
    this.parentPermlink = 'photo'; // main tag
    this.author = 'golos'; // post author
    this.wif = '5KYak1h6tjxgePymowyaY9LsdLLQWqKxTtsDYjQ9sPecUVyFBMn'; // private posting key
    this.permlink = '12345678'; // post url-adress
    this.title = 'titletag'; // post title
    this.jsonMetadata = {
        "qwer": "1234",
        "app2": "app2",
        'app3': 'app3',
        "qwer": "1234"
    }; // jsonMetadata - post metadata (pictures etc.)
    this.body = '45'; // post text
    golos.broadcast.comment(this.wif, this.parentAuthor, this.parentPermlink, this.author, this.permlink, this.title, this.body, this.jsonMetadata, function(err, result) {
        //console.log(err, result);
        if (!err) {
            console.log('comment', result);
            arrGolos.clear();
            console.log('size after + send', arrGolos.size);
        } else console.error(err);
    }); // add post
}
// if parentPerm == perm - ok
function send_post(wifPar) {
    this.jsonMetadata = {};
    arrGolos.forEach((value) => {
        this.jsonMetadata[value] = value;
    });
    this.jsonMetadata = JSON.stringify(this.jsonMetadata);

    this.parentAuthor = ''; // for post creating, empty field
    this.parentPermlink = 'photo'; // main tag
    this.author = 'golos'; // post author
    this.wif = wifPar; //'5KYak1h6tjxgePymowyaY9LsdLLQWqKxTtsDYjQ9sPecUVyFBMn'; // private posting key
    this.permlink = 'testphotook'; // post url-adress
    this.title = 'titlePhotoMeta'; // post title
    this.jsonMetadata = JSON.stringify(this.jsonMetadata); // jsonMetadata - post metadata (pictures etc.)
    this.body = this.jsonMetadata; // post text

    golos.broadcast.comment(this.wif, this.parentAuthor, this.parentPermlink, this.author, this.permlink, this.title, this.body, this.jsonMetadata, function(err, result) {
        //console.log(err, result);
        if (!err) {
            console.log('comment', result);
            arrGolos.clear();
            console.log('size after + send', arrGolos.size);
        } else console.error(err);
    }); // add post
}
let i = 0;

function inc() {
    i++;
}

function send_request(wifPar) {
    this.jsonMetadata = {};
    arrGolos.forEach((value) => {
        this.jsonMetadata[value] = value;
    });
    this.jsonMetadata = JSON.stringify(this.jsonMetadata);
    this.author = 'golos'; // post author
    this.wif = '5KYak1h6tjxgePymowyaY9LsdLLQWqKxTtsDYjQ9sPecUVyFBMn'; //'5KYak1h6tjxgePymowyaY9LsdLLQWqKxTtsDYjQ9sPecUVyFBMn'; // private posting key
    this.permlink = 'testphotook'; // post url-adress
    this.parentPermlink = 'photo'; // main tag
    golos_save_url_test != this.permlink ? this.parentAuthor = '' : this.parentAuthor = 'golos';
    golos_save_url_test != this.permlink ? this.parentPermlink = 'post' : this.parentPermlink = this.permlink;
    if (golos_save_url_test == this.permlink) {
        console.log('comment', i);
        this.parentAuthor = 'golos';
        this.parentPermlink = golos_save_url_test;
        this.permlink = this.parentPermlink + i++;
    } else {
        console.log('post', i);
        this.parentAuthor = '';
        this.parentPermlink = 'post';
    }
    this.title = 'titlePhotoMeta'; // post title
    this.body = this.jsonMetadata; // post text

    golos.broadcast.comment(this.wif, this.parentAuthor, this.parentPermlink, this.author, this.permlink, this.title, this.body, this.jsonMetadata, function(err, result) {
        //console.log(err, result);
        if (!err) {
            console.log('comment', result);
            arrGolos.clear();
            golos_save_url_test = this.permlink;
            inc();
            
            let uploadGolos = document.getElementById('uploadGolos');
            arrGolos.size > 0 ? uploadGolos.removeAttribute('hidden') : uploadGolos.setAttribute('hidden', 'true')
            
            console.log('size after + send', arrGolos.size);
            console.log('golos_save_url_test + send', golos_save_url_test);
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
        send_request(wif);
    }


}
//get comments
function get_comments() {
    golos.api.getContentReplies('golos', 'photo', function(err, result) {
        console.log(err, result);
    });
}
// if input parent of comment return comment
async function get_content() {
    /*   if(wif=='') {
         await auth();
         console.log('no wif');  
       }
       else {
           console.log('wif ', wif);
           send_request(1,1,1);
       }*/
    this.author = 'golos';
    this.permlink = 'photo';
    golos.api.getContent(author, permlink, function(err, result) {
        console.log(err, result);
        if (!err) {
            console.log('getContent', result.title);
        } else console.error(err);
    });
}
let golosUrls = document.getElementById('golosUrls');
golosUrls.onclick = get_content;
let uploadGolos = document.getElementById('uploadGolos');
uploadGolos.addEventListener('click', uploadToGolos, false);