    let choosen = '', lngOption = {
                                  // order and from where user language should be detected
                                  order: ['localStorage', 'navigator'],

                                  // keys or params to lookup language from
                                  lookupLocalStorage: 'i18nextLng',

                                  // cache user language on
                                  caches: ['localStorage'],

                                  // optional expire and domain for set cookie
                                  cookieMinutes: 10,
                                  cookieDomain: 'myDomain',
                                };
    const lngDetector = new i18nextBrowserLanguageDetector(null, lngOption);
    function detectLang(){
        if(localStorage.lang) return localStorage.lang;
        if( ! localStorage.i18nextLng ) return navigator.language.split('-')[0];
        else return localStorage.i18nextLng.split('-')[0];
    }
    function initLang(lang) {
        i18next
            .use(i18nextXHRBackend)
            .use(lngDetector)
            .init({
                lng: detectLang(),
                debug: false,
                backend: {
                    loadPath: '/langs/' + detectLang() + '.json'
                },
                allowMultiLoading: false,
            }, function(err, t) {
                choosen = detectLang();
                let navbar = document.getElementById('navbar-right');
                let li = document.createElement('li');
                li.className = `nav-item d-flex align-items-center`;
                li.id = `li-lang`;
                if ( ! document.getElementById('language' )) {
                    let button = document.createElement('button'); 
                    button.className = `btn btn-info my-2 my-sm-0`; 
                    button.id = `language`; 
                    button.innerHTML = `<span class="icon-earth"></span> Language`;
                    li.appendChild(button);
                    button.addEventListener('click', async () => {
                        var inputOptions = new Promise( (resolve) => {
                            const lang = {}
                            const arrLangs = [ 'en', 'ru', 'ua', 'by', 'cn' ];
                            arrLangs.forEach( item => {
                                lang[item] = `<img src="http://golosimages.com/graphics/flags/${ item }.svg" height="30" width="40" style="border-radius: 0.25em">`
                            });
                            resolve(lang)
                        })
                        const {
                            value: language
                        } = await swal({
                            title: 'Select language',
                            input: 'radio',
                            inputOptions: inputOptions,
                            inputValue: localStorage.lang?localStorage.lang:navigator.language.split('-')[0],
                            showCancelButton: true,
                            showCloseButton: true,
                            confirmButtonText: `<div> <span class="icon-checkmark"></span> Ok </div>`,
                            inputValidator: (value) => {
                                return !value && 'You need to choose something!'
                            }
                        })
                        if (language) {
                            localStorage.lang = language;
                            location.reload();
                            initLang(language);
                        }
                    }, false);
                    navbar ? navbar.appendChild(li) : '';
                }
                updateContent(choosen);
            });

    }


    function updateContent() {
        let array = i18next.services.resourceStore.data[choosen].translation;
        for (let i in array) {
            findAndReplaceDOMText(document.body, {
                find: i,
                replace: array[i]
            });
        }
    }