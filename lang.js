    let div = document.createElement('div');
    div.innerHTML=`<div id="privKey-incorrect" hidden="true">
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
</div>
<div id="change-port-html-title" hidden="true">
    <h3>Input node address!</h3>
</div>
<div id="change-port-html" hidden="true">
                        <p><h5>Please enter remote address for ipfs-api</h5></p>
                        <p>
                        <div class="input-group mb-3">
                        <input id="input-api-protocol" type="text" class="form-control text-center" placeholder="protocol">
                        <input id="input-api-address" type="text" class="form-control text-center" placeholder="address">
                        <input id="input-api-port" type="text" class="form-control text-center" placeholder="port">
                        </div>
                        </p>
                        <p>
                        <p><h5>Please enter your node gateway remote address</h5></p>
                        <div class="input-group mb-3">
                        <input id="input-gateway-protocol" type="text" class="form-control text-center" placeholder="protocol">
                        <input id="input-gateway-address" type="text" class="form-control text-center" placeholder="address">
                        <input id="input-gateway-port" type="text" class="form-control text-center" placeholder="port">
                        </div>
                        </p>
                        </div>
    <div id="default-div-node" hidden="true">
        <p>
            <div class="d-flex flex-column  align-items-center swal2-actions">
                <button type="button" id="default-node" class="swal2-cancel swal2-styled" aria-label="" style="display: inline-block; background-color: #297dce;"><span class="icon-info"></span> Default</button>
            </div>
        </p>
    </div>
    <div id="image-added" hidden="true">
        Images added
    </div>
    <div id="check-table-for-records" hidden="true">
        Check table for records
    </div>
    <div id="no-records-IPFS" hidden="true">
        You have not got records in IPFS
    </div>
    <div id="about-html-title" hidden="true">About!</div>
    <div id="button-cool" hidden="true">
        <span class="icon-checkmark"></span> Cool!
    </div>
    <div id="about-html" hidden="true">
        <p class="float-left text-left">
        GolosImages - this microservice for storing images on the  blockchain <a target="_blank" href="https://golos.io">Golos</a> and <a target="_blank" href="https://ipfs.io/">IPFS</a>. This platform is a thin client, that works without a backend (only frontend and blockchain) directly on the GitHub Pages (through CloudFlare).
        </p>
        <ul class="float-left text-left">
        We use:
        <li><a target="_blank"  href="https://github.com/GolosChain/golos-js">Golos.js</a> - the JavaScript API for Golos blockchain;</li>
        <li><a target="_blank" href="https://github.com/twbs/bootstrap">Bootstrap</a> - the most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web;</li>
        <li><a target="_blank" href="http://www.dropzonejs.com">Dropzone</a> - DropzoneJS is an open source library that provides drag’n’drop file uploads with image previews;</li>
        <li><a target="_blank" href="https://github.com/lipis/flag-icon-css">Flag-icon-css</a> - a collection of all country flags in SVG;</li>
        <li><a target="_blank" href="https://github.com/padolsey/findAndReplaceDOMText">FindAndReplaceDOMText</a> - searches for regular expression matches in a given DOM node and replaces or wraps each match with a node or piece of text that you can specify;</li>
        <li><a target="_blank" href="https://www.i18next.com">I18next</a> - is an internationalization-framework written in and for JavaScript;</li>
        <li><a target="_blank" href="https://github.com/ipfs/js-ipfs-api">Js-ipfs-api</a> - a client library for the IPFS HTTP API, implemented in JavaScript;</li>
        <li><a target="_blank" href="https://github.com/limonte/sweetalert2">SweetAlert2</a> - a beautiful, responsive, customizable, accessible replacement for JavaScript's popup boxes.</li>
        </ul>
    </div>
    <div id="integration-html" hidden="true">
        <div>
                1. Add JavaScript in your HTML-page 
                <pre><code>&lt;script src=&quot;https://golosimages.com/inject.js&quot;&gt;&lt;/script&gt;</pre></code>
                2. Add button in your HTML-page
                <pre><code>&lt;button id=&quot;upload&quot; type=&quot;button&quot;&gt;Upload to IPFS&lt;/button&gt;</code></pre>
                3. Add eventListener for upload button
<div class="text-left"><pre><code>&lt;script&gt;
document.getElementById('upload').addEventListener('click', function() {
    uploadImageToIpfs(function(files) {
        console.log(files);
    })
});
&lt;/script&gt;</code></pre></div>
                4. You can set remote addresses to your IPFS node
                <div class="text-left"><pre><code>&lt;script&gt;
function initCustomConnection(){
    localStorage.connectionCustom = {
        api :{ protocol:'http',port:'5001',address:'91.201.41.253' },
        gateway: { protocol:'http', port:'7777', address:'91.201.41.253'}
    }
}
&lt;/script&gt;</code></pre></div>
        </div>
    </div>`
    document.body.appendChild(div);
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
            findAndReplaceDOMText(document.body, {
                find: i,
                replace: array[i]
            });
        }
    }