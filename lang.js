function initLang(lang) {
    i18next
        .use(i18nextXHRBackend)
        .init({
            lng: lang,
            debug: true,
            backend: {
                loadPath: '/langs/' + lang + '.json'
            },
            allowMultiLoading: false,
        }, function(err, t) {
            let navbar = document.getElementById('rigth');
            let li = document.createElement('li');
            li.className="nav-item";
            navbar.appendChild(li);
            let button = document.createElement('button');
            button.className = `btn btn-primary my-2 my-sm-0`;
            button.id = `language`;
            button.innerHTML = `Language`;
            button.addEventListener('click', ()=>{
                swal({
                    title: '<h3><span class="translate" id="authtitle">To continue, you need to choose language!</h3>',
                    html:`<ul class="navbar-nav d-flex justify-content-start flex-end">
                            <li class="nav-item"><img src="https://www.w3schools.com/images/w3schools_green.jpg" height="30" width="30"></img> <button type="button" class="btn btn-primary"> Russian</button></li>
                            <br>
                            <li class="nav-item"><img src="https://www.w3schools.com/html/img_chania.jpg" height="30" width="30"></img> <button type="button" class="btn btn-primary"> English</button></li>
                        </ul>`
                });
            },false);
            li.appendChild(button);
            updateContent();
        });

}


function updateContent() {
    let map = document.getElementsByClassName('translate');
    for (let i = 0; i < map.length; i++) {
        console.log(map[i]);
        document.getElementById(map[i].id).innerHTML = i18next.t(map[i].id);
    }
}

function changeLang(){
    
}
