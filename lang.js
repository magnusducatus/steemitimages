let choosen = '';

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
            li.className = "nav-item";
            navbar.appendChild(li);
            if (!document.getElementById('language')) {
                let button = document.createElement('button');
                button.className = `btn btn-info my-2 my-sm-0`;
                button.id = `language`;
                button.innerHTML = `<span id="node" class="icon-earth"></span> Language`;
                button.addEventListener('click', async () => {
                    var inputOptions = new Promise((resolve) => {
                        resolve({
                            'ru': '<img src="svg/ru.svg" height="30" width="40" style="border-radius: 0.25em"> Русский',
                            'en': '<img src="svg/en.svg" height="30" width="40" style="border-radius: 0.25em"> English'
                        })
                    })
                    const {
                        value: language
                    } = await swal({
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
                }, false);
                li.appendChild(button);
            }
            updateContent(choosen);
        });

}


function updateContent() {
    let array = i18next.services.resourceStore.data[choosen].translation
    for (let i in array) {
        findAndReplaceDOMText(document.body, {
            find: i,
            replace: array[i]
        });
    }
}