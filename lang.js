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