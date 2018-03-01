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
             /*let base64 = window.btoa(data.target.result);
             obj.body = base64;*/
             obj.body = buffer.Buffer(data.target.result);
             /* obj.body = data.target.result;*/
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
