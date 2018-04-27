let div1 = document.createElement('div'),
    div2 = document.createElement('div'),
    div3 = document.createElement('div'),
    divSign = document.createElement('div'),
    divMain = document.createElement('div');

div1.id = 'place-username',
    div2.id = 'place-masterpass',
    div3.id = 'place-wif',
    divSign.id = 'sign',
    div1.innerHTML = 'Username',
    div2.innerHTML = 'Master password',
    div3.innerHTML = 'Private posting key';

divSign.innerHTML = 'Sign Up',
    divMain.setAttribute('hidden', 'true');
//document.getElementById('appender').appendChild(div1);
divMain.innerHTML = `<div id="privKey-incorrect" hidden="true">
            Private key is incorrect!
        </div>
        <div id="logout-swal">
            You're logged out
        </div>
        <div id="logout-text">
            Logout
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
localStorage && localStorage.wif ? window.wif = localStorage.wif : window.wif = '';
localStorage && localStorage.username ? window.username = localStorage.username : window.username = '';

document.getElementById('form-login-pass').addEventListener('submit', async (e) => {
    e.preventDefault();
    let log = document.getElementById('logged').checked,
        user = document.getElementById('input-user').value,
        pass = document.getElementById('input-pass').value;
    try {
        response = await golos.api.getAccounts([user]);
    } catch (e) {
        swal({
            type: 'error',
            title: `${ document.getElementById('auth-swal-log-title').innerHTML }`,
            html: `${ document.getElementById('auth-swal-log-html').innerHTML }`,
        })
    }
    const roles = ['posting'];
    try {
        let keys = await golos.auth.getPrivateKeys(user, pass, roles);
        if (response[0].posting.key_auths[0][0] == keys.postingPubkey) {
            username = user
            wif = keys.posting;
            log ? localStorage.username = username : '';
            log ? localStorage.wif = wif : '';
            cb();
        } else throw Error();;
    } catch (e) {
        swal({
            type: 'error',
            html: `${ document.getElementById('auth-masterorlogin-error').innerHTML }`
        })

    }
})
document.getElementById('form-priv').addEventListener('submit', async (e) => {
    e.preventDefault();
    let log = document.getElementById('logged-private').checked,
        priv = document.getElementById('input-private').value;
    try {
        let resultWifToPublic = await golos.auth.wifToPublic(priv);
        log ? localStorage.wif = priv : '';
        let result = golos.api.getKeyReferences([resultWifToPublic], function(err, result) {
            if (!err) {
                result.forEach(function(item) {
                    username = item[0];
                    log ? localStorage.username = username : '';
                });
                cb();
            } else swal(err);
        });
    } catch (e) {
        swal({
            type: 'error',
            html: document.getElementById('privKey-incorrect').innerHTML
        })
    }
})

window.cb;

async function auth(bc = function() {}) {
    cb = bc;
}

function logOutProcc() {
    let li = document.createElement('li');
    li.className = `nav-item d-flex align-items-center`;
    li.id = `li-log`;
    li.innerHTML = `<button class="btn btn-primary my-2 my-sm-0" id="logout"><span class="icon-exit"></span> ${ document.getElementById('logout-text').innerHTML }</button>`;
    document.getElementById('navbar-right').appendChild(li);
    document.getElementById('logout').addEventListener('click', function() {
        document.getElementById('navbar-right').removeChild(document.getElementById('li-log'));
        swal({
            position: 'top-end',
            type: 'success',
            title: `${document.getElementById('logout-swal').innerHTML}`,
            showConfirmButton: false,
            timer: 1500
        })
        localStorage.removeItem('wif');
        localStorage.removeItem('username');
        window.username = '';
        window.wif = '';
        //location.reload();
    })
}