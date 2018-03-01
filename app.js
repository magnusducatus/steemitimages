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

 function handle(e) {
     console.log(e.target.id);
     window.open(host + e.target.id);
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
                 const result = file[i].size/1000000;
                 td2.innerHTML = result.toFixed(2);
                 let td3 = document.createElement('td');
                 //td2.id = file[i].hash;
                 td3.className = "text-center";
                 //td2.onclick = handle; 

                 let input3div1 = document.createElement('div');
                 input3div1.className = 'input-group mb-3';
                 let input3input1 = document.createElement('input');
                 input3input1.className = 'form-control';
                 input3input1.value = host + file[i].hash;
                 input3input1.type = 'text';
                 input3input1.id = file[i].hash;
                 let input3div2 = document.createElement('div');
                 input3div2.className = 'input-group-append';
                 let input3but = document.createElement('button');
                 input3but.className = 'btn btn-outline-secondary';
                 input3but.type = 'button';
                 input3but.innerHTML = 'Copy link';
                 input3but.onclick = copyLink;
                 input3but.id = file[i].hash;
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

                 td3.appendChild(input3div1);
                 input3div1.appendChild(input3input1);
                 input3div1.appendChild(input3div2);
                 input3div2.appendChild(input3but);

                 td1.appendChild(a1);
                 //td2.appendChild(input2);
                 //td3.appendChild(button3);
                 tr.appendChild(td1);
                 tr.appendChild(td2);
                 tr.appendChild(td3);
                 //tr.appendChild(td3);
                 tb.appendChild(tr);
             }
             let tab = document.getElementById('table');
             //arr2.length > 0 ? tab.style.display = 'block' : tab.style.display = 'none';
             arr2.length > 0 ? tab.removeAttribute('hidden') : tab.setAttribute('hidden', 'true')
             let elemIpfs = document.getElementsByClassName('elementIpfs');
             //for (let s = 0; s < elemIpfs.length; s++) elemIpfs[s].remove();

         }
     })

 }

 function iter() {
     console.log('length', arr1.length);
     for (let i = 0; i < arr1.length; i++) {
         test(arr1[i]);
     }
     if (arr1.length != 0) swal('Added successfully!','Check the table!')
     arr1 = [];
 }
 const upload = document.getElementById('uploadBtn');
 upload.addEventListener("click", iter, false);