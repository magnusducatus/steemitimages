let divLang = document.createElement('div');
divLang.innerHTML = `
    <div class="modal" tabindex="-1" role="dialog" id="modalLang">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Choose language</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            <div class="modal-body">
                <form  class="container" id="modal-lang-form">
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" id="btn-lang-success"><span class="icon-checkmark"></span> Ok</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><span class="icon-cross"></span> Cancel</button>
            </div>
            </div>
        </div>
    </div>`;
document.getElementsByTagName('body')[0].appendChild(divLang);
let modalLang = new Modal(document.getElementById('modalLang'));
let choosen = '',
    lngOption = {
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

function detectLang() {
    if (localStorage.lang) return localStorage.lang;
    if (!localStorage.i18nextLng) return navigator.language.split('-')[0];
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
                    modalLang.show();
                    const lang = {};
                    const arrLangs = [
                        {lang:'en', name:'English'}, 
                        {lang: 'ru', name: 'Русский'}, 
                        {lang: 'ua', name: 'України'}, 
                        {lang: 'by', name: 'Беларускі'}, 
                        {lang: 'cn', name: '中国'}, 
                        {lang: 'kr', name: '한국어'}, 
                        {lang: 'es', name: 'Español'}, 
                        {lang: 'fr', name: 'Français'}, 
                        {lang: 'it', name: 'Italiano'}, 
                        {lang: 'jp', name: '日本語'}, 
                        {lang: 'pl', name: 'Polski'}
                    ];
                    document.getElementById('modal-lang-form').innerHTML = '';
                    let i = 2,rowId = 0;
                    arrLangs.forEach(item => {
                        i++;
                        let divR = document.createElement('div');
                        let div = document.createElement('div');
                        
                        let checked, 
                            langCheck;
                        localStorage.lang ? langCheck = localStorage.lang : langCheck = navigator.language.split('-')[0];
                        langCheck == item.lang ? checked = 'checked' : checked = '';
                        div.className = `form-check col-4`;
                        div.innerHTML = `
                            <input class="form-check-input" type="radio" id=${item.lang} name="language" value=${item.lang} ${checked}>
                            <label class="form-check-label" for=${item.lang}><img class="img-thumbnail" src="http://golosimages.com/graphics/flags/${ item.lang }.svg"> ${ item.name }</label>
                        `;
                        if(i == 3) {
                            i=0;
                            rowId++;
                            divR.id = 'row'+rowId;
                            divR.className = 'row';
                            divR.appendChild(div);
                            document.getElementById('modal-lang-form').appendChild(divR);
                        } else document.getElementById('row'+rowId).appendChild(div);
                         

                    });
                    //document.getElementById('modalLang').getElementsByClassName('modal-body')[0].appendChild(lang[i]); 
                    /*var inputOptions = new Promise((resolve) => {
                        const lang = {}
                        const arrLangs = [
                            {lang:'en', name:'English'}, 
                            {lang: 'ru', name: 'Русский'}, 
                            {lang: 'ua', name: 'України'}, 
                            {lang: 'by', name: 'Беларускі'}, 
                            {lang: 'cn', name: '中国'}, 
                            {lang: 'kr', name: '한국어'}, 
                            {lang: 'es', name: 'Español'}, 
                            {lang: 'fr', name: 'Français'}, 
                            {lang: 'it', name: 'Italiano'}, 
                            {lang: 'jp', name: '日本語'}, 
                            {lang: 'pl', name: 'Polski'}
                        ];
                        arrLangs.forEach(item => {
                            lang[item.lang] = `<div><img src="http://golosimages.com/graphics/flags/${ item.lang }.svg" height="30" width="40" style="border-radius: 0.25em">${ item.name }</div>`;
                        });
                        resolve(lang)
                    })
                    const {
                        value: language
                    } = await swal({
                        title: 'Select language',
                        width: 600,
                        input: 'radio',
                        inputOptions: inputOptions,
                        inputValue: localStorage.lang ? localStorage.lang : navigator.language.split('-')[0],
                        showCancelButton: true,
                        showCloseButton: true,
                        confirmButtonText: `<div> <span class="icon-checkmark"></span> Ok </div>`,
                        inputValidator: (value) => {
                            return !value && 'You need to choose something!'
                        }
                    })
                    if (language) {
                        localStorage.lang = language;
                        language = 'en'? location.reload() : '';
                        initLang(language);
                    }
                */}, false);
                navbar ? navbar.appendChild(li) : '';
            }
            updateContent(choosen);
        });

}

document.getElementById('btn-lang-success').addEventListener('click', (e) => {
    let ss = document.getElementsByName('language'), 
        val;
    for(let i in ss) ss[i].checked ? val = ss[i].value : '';
        console.log(val)
    localStorage.lang = val;
    language = 'en'? location.reload() : '';
    initLang(language);
    modalLang.hide();
})

function updateContent() {
    let array = i18next.services.resourceStore.data[choosen].translation;
    for (let i in array) {
        findAndReplaceDOMText(document.body, {
            find: i,
            replace: array[i]
        });
    }
}
