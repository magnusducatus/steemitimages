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
                 img.src = 'data:image/jpeg;base64,' + _arrayBufferToBase64(data.body);
                 img.align = "middle";
                 img.className = "text-center";
                 img.heigth = 100;
                 img.width = 100;
                 let div1 = document.createElement('div');
                 div1.innerHTML = 'size: ' + file[i].size;
                 let td2 = document.createElement('td');
                 //td2.id = file[i].hash;
                 td2.className = "text-center";
                 //td2.onclick = handle; 

                 let input2div1 = document.createElement('div');
                 input2div1.className = 'input-group mb-3';
                 let input2input1 = document.createElement('input');
                 input2input1.className = 'form-control';
                 input2input1.value = host + file[i].hash;
                 input2input1.type = 'text';
                 input2input1.id = file[i].hash;
                 let input2div2 = document.createElement('div');
                 input2div2.className = 'input-group-append';
                 let input2but = document.createElement('button');
                 input2but.className = 'btn btn-outline-secondary';
                 input2but.type = 'button';
                 input2but.innerHTML = 'Copy link';
                 input2but.onclick = copyLink;
                 input2but.id = file[i].hash;
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

                 td2.appendChild(input2div1);
                 input2div1.appendChild(input2input1);
                 input2div1.appendChild(input2div2);
                 input2div2.appendChild(input2but);

                 td1.appendChild(img);
                 td1.appendChild(div1);
                 //td2.appendChild(input2);
                 //td3.appendChild(button3);
                 tr.appendChild(td1);
                 tr.appendChild(td2);
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
     if (arr1.length != 0) swal('Всё добавленно успешно!')
     arr1 = [];
 }
 const upload = document.getElementById('uploadBtn');
 upload.addEventListener("click", iter, false);