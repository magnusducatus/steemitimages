    let div1 = document.createElement('div'), div2 = document.createElement('div'), div3 = document.createElement('div'), divSign = document.createElement('div'),divMain = document.createElement('div');
    div1.id = 'place-username';
    div2.id = 'place-masterpass';
    div3.id = 'place-wif';
    divSign.id = 'sign';
    div1.innerHTML = 'Username';
    div2.innerHTML = 'Master password';
    div3.innerHTML = 'Private posting key';
    divSign.innerHTML = 'Sign Up';
    divMain.setAttribute('hidden','true')
    //document.getElementById('appender').appendChild(div1);
    divMain.innerHTML = `<div id="privKey-incorrect" hidden="true">
            Private key is incorrect!
        </div>
        <div id="auth-masterorlogin-error" hidden="true">
            Master Key or password is incorrect!
        </div>
        <div id="auth-swal-log-html" hidden="true">
            Your login is incorrect!
        </div>
        <div id="auth-swal-log-title" hidden="true">
            Login
        </div>
        <div id="auth-html-keepLog" hidden="true">Keep me logged</div>
        <div id="auth-html-postKey" hidden="true">
        Please enter only your private posting key
        </div>
        <div id="auth-html-or" hidden="true">
            OR
        </div>
        <div id="auth-title" hidden="true">
            <h3>To continue, you need to login!</h3>
        </div>
        <div id="auth-html-logorpass" hidden="true">
            <p><h5>Please enter your login and master password</h5></p>
        </div>`;
    divMain.appendChild(div1);
    divMain.appendChild(div2);
    divMain.appendChild(div3);
    divMain.appendChild(divSign);
    document.getElementsByTagName('body')[0].appendChild(divMain);
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
        if(!localStorage.i18nextLng) return navigator.language.split('-')[0];
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
                if (!document.getElementById('language')) {
                    let button = document.createElement('button');
                    button.className = `btn btn-info my-2 my-sm-0`;
                    button.id = `language`;
                    button.innerHTML = `<span class="icon-earth"></span> Language`;
                    li.appendChild(button);
                    button.addEventListener('click', async () => {
                        var inputOptions = new Promise((resolve) => {
                            resolve({
                                'en': '<img src="graphics/flags/en.svg" height="30" width="40" style="border-radius: 0.25em">',
                                'ru': '<img src="graphics/flags/ru.svg" height="30" width="40" style="border-radius: 0.25em">',
                                'ua': '<img src="graphics/flags/ua.svg" height="30" width="40" style="border-radius: 0.25em">',
                                'by': '<img src="graphics/flags/by.svg" height="30" width="40" style="border-radius: 0.25em">',
                                'cn': '<img src="graphics/flags/cn.svg" height="30" width="40" style="border-radius: 0.25em">'
                            })
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
                    navbar.appendChild(li);
                }
                updateContent(choosen);
            });

    }


    function updateContent() {
        let array = i18next.services.resourceStore.data[choosen].translation
        for (let i in array) {
            //console.log('FIND'+i+'REPLACE'+array[i])
            findAndReplaceDOMText(document.body, {
                find: i,
                replace: array[i]
            });
        }
    }