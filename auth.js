let $modalAuth = document.createElement('div'),
    $divSign = document.createElement('div'),
    $divMain = document.createElement('div');

$modalAuth.id = 'modal-auth',
    $divSign.id = 'sign';

$divSign.innerHTML = 'Sign Up',
    $divMain.setAttribute('hidden', 'true');
$modalAuth.innerHTML = `<div class="modal" tabindex="-1" role="dialog" id="auth">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">
                    To continue, you need to login!
                </h5>
                <button type="button" id="change-node-close" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <h5>Please enter your login and master password</h5>
                <form id="form-login-pass" class="d-flex flex-column">
                    <div class="form-group">
                        <label for="input-user">Username</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="input-group-text">@</div>
                            </div>
                            <input type="text" class="form-control" id="input-user" placeholder="Username" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="input-pass">Master password</label>
                        <input id="input-pass" type="password" class="form-control" placeholder="Master password" aria-label="Password" aria-describedby="Password" required>
                    </div>
                    <div class="form-group form-check">
                        <input id="logged" class="form-check-input" type="checkbox" value="">
                        <label class="form-check-label">Keep me logged</label>
                    </div>
                    <button type="submit" id="log-pass-log" class="btn btn-success align-self-start" ><span class="icon-enter"></span> Log in</button>
                </form>
                <div>
                <hr>
                <div class="d-flex justify-content-center">
                OR
                </div>
                <hr>
                </div>
                <h5>Please enter only your private posting key</h5>
                <form id="form-priv" class="d-flex flex-column">
                    <div class="form-group">
                        <label for="input-private">Private posting key</label>
                        <input id="input-private" type="password" class="form-control" placeholder="Private posting key" aria-label="Private posting key" aria-describedby="Private posting key" required>
                    </div>
                    <div class="form-group form-check">
                        <input id="logged-private" class="form-check-input" type="checkbox" value="">
                        <label for="logged-private" class="form-check-label">Keep me logged</label>
                    </div>
                    <div class="align-self-start">
                        <button type="submit" id="log-private" class="btn btn-success"><span class="icon-enter"></span> Log in</button>
                    </div>
                </form>
                <div class="d-flex flex-column" style="width:100%">
                    <div>
                    <hr class="bg-light">
                    <div class="text-center">
                        OR
                    </div>
                    <hr class="bg-light">
                    </div>
                    <div>
                        <a class="align-self-center" target="_blank" href="https://signup.steemit.com/">
                        <button type="button" class="btn btn-lg btn-block btn-primary" aria-label="" style="display: inline-block; background-color: #297dce;"><span class="icon-clipboard"></span> Sign Up</button>
                        </a>
                    </div>
                </div>
            </div>
                
        </div>
    </div>
</div>
`;
$divMain.innerHTML = `
        <div id="auth-true" hidden="true">
            Authorization was successful!
        </div>
        <div id="privKey-incorrect" hidden="true">
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
$divMain.appendChild($divSign);
document.getElementsByTagName('body')[0].appendChild($divMain);
document.getElementsByTagName('body')[0].appendChild($modalAuth);
let modalAuth = new Modal(document.getElementById('auth'));
localStorage && localStorage.wif ? window.wif = JSON.parse(localStorage.wif) : window.wif = '';
localStorage && localStorage.username ? window.username = localStorage.username : window.username = '';

localStorage.wif && localStorage.username ? logOutProcc() : '';

document.getElementById('form-login-pass').addEventListener('submit', async (e) => {
    e.preventDefault();
    let log = document.getElementById('logged').checked,
        user = document.getElementById('input-user').value,
        pass = document.getElementById('input-pass').value;
    try {
        response = await steem.api.getAccounts([user]);
    } catch (e) {
        swal({
            type: 'error',
            title: `${ document.getElementById('auth-swal-log-title').innerHTML }`,
            html: `${ document.getElementById('auth-swal-log-html').innerHTML }`,
        })
    }
    
    try {
        let keys = await steem.auth.getPrivateKeys(user, pass, roles);
        if (response[0].posting.key_auths[0][0] == keys.postingPubkey) {
            username = user;
            wif = keys;
            let txt = JSON.stringify(keys);
            if(log) {
                localStorage.wif = txt; 
                localStorage.username = username;
            }
            modalAuth.hide();
            swal({
                type: 'success',
                position: 'top-end',
                title: 'Success',
                html: document.getElementById('auth-true').innerHTML,
                toast: true,
                timer: 1500,
                showConfirmButton: false
            });
            logOutProcc();
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
        let resultWifToPublic = await steem.auth.wifToPublic(priv);
        log ? localStorage.wif = priv : '';
        console.log('resultWifToPublic',resultWifToPublic);
        steem.api.getKeyReferences([resultWifToPublic], function(err, result) {
            if (!err) {
                result.forEach(function(item) {
                    console.log('item',item)
                    username = item[0];
                    log ? localStorage.username = username : '';
                });
                modalAuth.hide();
                logOutProcc();
                swal({
                    type: 'success',
                    position: 'top-end',
                    title: 'Success',
                    html: document.getElementById('auth-true').innerHTML,
                    toast: true,
                    timer: 1500,
                    showConfirmButton: false
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
window.roles;

async function auth(bc = function() {}, role = ['posting']) {
    cb = bc;
    roles = role;
    if(wif == '') modalAuth.show();
    else cb();
    
}

function logOutProcc() {
    let li = document.createElement('li');
    li.className = `nav-item d-flex align-items-center`;
    li.id = `li-log`;
    li.innerHTML = `<button class="btn btn-outline-primary my-2 my-sm-0" id="logout"><span class="icon-exit"></span> ${ document.getElementById('logout-text').innerHTML }</button>`;
    document.getElementById('navbar-right').appendChild(li);
    document.getElementById('logout').addEventListener('click', function() {
        document.getElementById('navbar-right').removeChild(document.getElementById('li-log'));
        swal({
            position: 'top-end',
            type: 'success',
            title: `${document.getElementById('logout-swal').innerHTML}`,
            showConfirmButton: false,
            toast: true,
            timer: 1500
        })
        localStorage.removeItem('wif');
        localStorage.removeItem('username');
        window.username = '';
        window.wif = '';
        //location.reload();
    })
}