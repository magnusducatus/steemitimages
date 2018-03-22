
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
                let navbar = document.getElementById('li-lang');
                navbar.style.display="block";
                if (!document.getElementById('language')) {
                    let button = document.createElement('button');
                    button.className = `btn btn-info my-2 my-sm-0`;
                    button.id = `language`;
                    button.innerHTML = `<span class="icon-earth"></span> Language`;
                    button.addEventListener('click', async () => {
                        var inputOptions = new Promise((resolve) => {
                            resolve({
                                'ru': '<img src="graphics/flags/ru.svg" height="30" width="40" style="border-radius: 0.25em"> Русский',
                                'en': '<img src="graphics/flags/en.svg" height="30" width="40" style="border-radius: 0.25em"> English'
                            })
                        })
                        const {
                            value: language
                        } = await swal({
                            title: 'Select language',
                            input: 'radio',
                            inputOptions: inputOptions,
                            showCancelButton: true,
                            showCloseButton: true,
                            confirmButtonText: `<div> <span class="icon-checkmark"></span> Ok </div>`,
                            inputValidator: (value) => {
                                return !value && 'You need to choose something!'
                            }
                        })
                        if (language) {
                            initLang(language);
                        }
                    }, false);
                    navbar.appendChild(button);
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