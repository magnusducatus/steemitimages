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
    /*async function auth(cb = function(){}){
        const {value} = await swal({
        title:  document.getElementById('auth-title').innerHTML,
        html: `${ document.getElementById('auth-html-logorpass').innerHTML }
                <p><div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="username" required>@</span>
                    </div>
                    <input id="input-user"type="text" class="form-control" placeholder=${ document.getElementById('place-username').innerHTML } aria-label="username" aria-describedby="username" required>
                </div></p>
                <p><div>
                        <input id="input-pass" type="password" class="form-control" placeholder=${ document.getElementById('place-masterpass').innerHTML } aria-label="Password" aria-describedby="Password" required>
                   </div>
                <p><hr>${ document.getElementById('auth-html-or').innerHTML }<hr>
                <p><h5>${ document.getElementById('auth-html-postKey').innerHTML }</h5>
                <p><div>
                    <input id="input-private" type="password" class="form-control" placeholder=${ document.getElementById('place-wif').innerHTML } aria-label="Private posting key" aria-describedby="Private posting key" required>
                </div>
                <br>
                <div class="form-check">
                    <label class="form-check-label">
                      <input id="logged" class="form-check-input" type="checkbox" value="">
                      ${ document.getElementById('auth-html-keepLog').innerHTML }
                    </label>
                </div>`,
        showCancelButton: true,
        closeOnConfirm: true,
        showCloseButton: true,
        footer:`<div class="d-flex flex-column" style="width:100%">
                    <div class="text-center">
                        ${ document.getElementById('auth-html-or').innerHTML } 
                    </div>
                    <hr class="bg-light" style="width:100%">
                    <a class="swal2-actions" target="_blank" href="https://golos.io/create_account">
                        <button type="button" class="swal2-cancel swal2-styled" aria-label="" style="display: inline-block; background-color: #297dce;"><span class="icon-info"></span> ${ document.getElementById('sign').innerHTML }</button>
                    </a></div>
                `,
        preConfirm: async () => {
                
            }
        })

    }

    

  
*/

 document.getElementById('form-login-pass').addEventListener('submit', async (e) => {
             e.preventDefault();
             let log = document.getElementById('logged').checked, 
                user = document.getElementById('input-user').value,
                pass = document.getElementById('input-pass').value;
        try {
            response = await golos.api.getAccounts([user]);
        } catch(e){
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
        } catch(e){
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
                if ( ! err ) {
                    result.forEach(function(item) {
                        username = item[0];
                        log ? localStorage.username = username : '';
                    });
                    cb();
                } else swal(err);
            });
        } catch(e){
            swal({
                  type: 'error',
                  html: document.getElementById('privKey-incorrect').innerHTML
                })
        }
    })
    window.cb;
async function auth(bc = function(){}){
    cb = bc;
    /*document.getElementById('log-pass-log').addEventListener('click', async ()=>{
        let login = document.getElementById('input-user').value,  
                    pass = document.getElementById('input-pass').value, 
                    priv = document.getElementById('input-private').value,
                    log = document.getElementById('logged').checked;
        if( login.length <= 0 && pass.length <= 0 && priv.length <= 0) {
             document.getElementById('input-user').setAttribute('class','form-control is-invalid');
             document.getElementById('input-pass').setAttribute('class','form-control is-invalid');
             document.getElementById('input-private').setAttribute('class','form-control is-invalid');
        }
        else if(login.length <= 0 && pass.length > 0){
            console.log('insert log to');
            document.getElementById('input-user').setAttribute('class','form-control is-invalid');
            document.getElementById('input-pass').setAttribute('class','form-control is-valid');
            document.getElementById('input-private').setAttribute('class','form-control');
        }
        else if(login.length > 0 && pass.length <= 0){
            console.log('insert pass to')
             document.getElementById('input-user').setAttribute('class','form-control is-valid');
             document.getElementById('input-pass').setAttribute('class','form-control is-invalid');
             document.getElementById('input-private').setAttribute('class','form-control');
        }
        else if(login.length > 0 && pass.length <= 0 && priv.length > 0 || login.length >= 0 && pass.length > 0 && priv.length > 0){
            console.log('only priv or only log&pass');
            document.getElementById('input-user').setAttribute('class','form-control is-invalid');
             document.getElementById('input-pass').setAttribute('class','form-control is-invalid');
             document.getElementById('input-private').setAttribute('class','form-control is-invalid');
        }
         else {
            await checker(login, pass, priv, cb, log);
            //return { login, pass, priv, log }; 
        } 
    },{once:true});
    document.getElementById('log-private').addEventListener('click', async ()=>{
        console.log('private');
        let login = document.getElementById('input-user').value,  
                    pass = document.getElementById('input-pass').value, 
                    priv = document.getElementById('input-private').value,
                    log = document.getElementById('logged-private').checked;
        if( login.length <= 0 && pass.length <= 0 && priv.length <= 0) {
                     console.log('insert log or pass or priv');
                     document.getElementById('input-user').setAttribute('class','form-control is-invalid');
             document.getElementById('input-pass').setAttribute('class','form-control is-invalid');
             document.getElementById('input-private').setAttribute('class','form-control is-invalid');
        }
        else if( login.length > 0 || pass.length > 0) {
                     console.log('Only priv || Log&pass')
                    document.getElementById('input-user').setAttribute('class','form-control is-invalid');
                    document.getElementById('input-pass').setAttribute('class','form-control is-invalid');
                    document.getElementById('input-private').setAttribute('class','form-control is-invalid');
                }
        else if(priv.length <= 0 && login.length > 0 || pass.length > 0) {
            document.getElementById('input-user').setAttribute('class','form-control');
            document.getElementById('input-pass').setAttribute('class','form-control');
            document.getElementById('input-private').setAttribute('class','form-control is-invalid'); 
        }
        else{
            await checker(login, pass, priv, cb, log)
        }
    },{once:true});    
    */
    //await checker(value.login, value.pass, value.priv, value.log, cb);
}
async function checker(username, pass, priv, cb, log) {
   
    }
  /*async function getPublicKey(log, cb){
        try {
            let resultWifToPublic = await golos.auth.wifToPublic(wif);
            log ? localStorage.wif = wif : '';
            let result = golos.api.getKeyReferences([resultWifToPublic], function(err, result) {
                if ( ! err ) {
                    result.forEach(function(item) {
                        username = item[0];
                        log ? localStorage.username = username : '';
                    });
                    cb();
                } else swal(err);
            });
        } catch(e){
            swal({
                  type: 'error',
                  html: document.getElementById('privKey-incorrect').innerHTML
                })
        }
    }*/
function logOutProcc(){
        let li = document.createElement('li'); 
        li.className = `nav-item d-flex align-items-center`; 
        li.id = `li-log`; 
        li.innerHTML = `<button class="btn btn-primary my-2 my-sm-0" id="logout"><span class="icon-exit"></span> Logout</button>`;
        document.getElementById('navbar-right').appendChild(li);
        document.getElementById('logout').addEventListener('click', function(){
            document.getElementById('navbar-right').removeChild( document.getElementById('li-log') );
            swal({
              position: 'top-end',
              type: 'success',
              title: 'Вы вышли',
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