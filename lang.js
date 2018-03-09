let choosen= '';
function initLang(lang) {
    choosen = lang;
    i18next
        .use(i18nextXHRBackend)
        .init({
            lng: lang,
            debug: false,
            backend: {
                loadPath: '/langs/' + lang + '.json'
            },
            allowMultiLoading: false,
        }, function(err, t) {
            let navbar = document.getElementById('rigth');
            let li = document.createElement('li');
            li.className="nav-item";
            navbar.appendChild(li);
            if ( ! document.getElementById('language') ) {
                let button = document.createElement('button');
                button.className = `btn btn-primary my-2 my-sm-0`;
                button.id = `language`;
                button.innerHTML = `Language`;
                button.addEventListener('click', async ()=>{
                    var inputOptions = new Promise((resolve) => {
                        resolve({
                          'ru': '<img src="svg/ru.svg" height="40" width="40"> Russian',
                          'en': '<img src="svg/en.svg" height="40" width="40"> English'
                        })
                    })
                    const {value: language} = await swal({
                                                          title: 'Select language',
                                                          input: 'radio',
                                                          inputOptions: inputOptions,
                                                          inputValidator: (value) => {
                                                            return !value && 'You need to choose something!'
                                                          }
                                                    })
                 if (language) {
                         initLang(language);    
                    }
                 /*   swal({
                        title: '<h3><span class="translate" id="authtitle">To continue, you need to choose language!</h3>',
                        html:`<div class="navbar-nav d-flex justify-content-start flex-end">
                                <div class="nav-item"><img src="https://www.w3schools.com/images/w3schools_green.jpg" height="40" width="40"> <button type="button" class="btn btn-primary"  onclick = "initLang('ru')"> Russian</button></div>
                                <br>
                                <div class="nav-item"><img src="https://www.w3schools.com/html/img_chania.jpg" height="40" width="40"</img> <button type="button" class="btn btn-primary" onclick = "initLang('en')"> English</button></div>
                            </div>`,
                    });*/
                },false);
                li.appendChild(button);
            }
            updateContent(choosen);
        });

}


function updateContent() {
    let array = i18next.services.resourceStore.data[choosen].translation
    for (let i in array) {
        console.log('i',i,'arr',array[i]);
        findAndReplaceDOMText(document.body, {
                find: i,
                replace: array[i]
            }
        );
    }
}