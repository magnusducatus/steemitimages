
    localStorage && localStorage.wif ? window.wif = localStorage.wif : window.wif = '';
    localStorage && localStorage.username ? window.username = localStorage.username : window.username = '';
    async function auth(cb = function(){}){
        const {value} = await swal({
        title:  document.getElementById('auth-title').innerHTML,
        html:`${document.getElementById('auth-html-logorpass').innerHTML}
                <p><div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="username" required>@</span>
                    </div>
                    <input id="input-user"type="text" class="form-control" placeholder="Username" aria-label="username" aria-describedby="username" required>
                </div></p>
                <p><div>
                        <input id="input-pass" type="password" class="form-control" placeholder="Master password" aria-label="Password" aria-describedby="Password" required>
                   </div>
                <p><hr class="bg-secondary">${document.getElementById('auth-html-or').innerHTML}<hr class="bg-secondary">
                <p><h5>${document.getElementById('auth-html-postKey').innerHTML}</h5>
                <p><div>
                    <input id="input-private" type="password" class="form-control" placeholder="Private posting key" aria-label="Private posting key" aria-describedby="Private posting key" required>
                </div>
                <br>
                <div class="form-check">
                    <label class="form-check-label">
                      <input id="logged" class="form-check-input" type="checkbox" value="">
                      ${document.getElementById('auth-html-keepLog').innerHTML}
                    </label>
                </div>`,
        showCancelButton: true,
        closeOnConfirm: true,
        showCloseButton: true,
        footer:`<div class="d-flex flex-column  align-items-center">
                    <div style="width:293%" class="text-center">
                        ${document.getElementById('auth-html-or').innerHTML}<hr class="bg-light">
                    </div>
                    <a class="swal2-actions" target="_blank" href="https://golos.io/create_account">
                        <button type="button" class="swal2-cancel swal2-styled" aria-label="" style="display: inline-block; background-color: #297dce;"><span class="icon-info"></span> Sign Up</button>
                    </a>
                </div>`,
        preConfirm: async () => {
                const { login, pass, priv, log } = await getInputsVal();
                if( login.length <= 0 && pass.length <= 0 && priv.length <= 0) {
                     return new Promise( resolve => {
                            let login = document.getElementById('input-user');
                            let pass = document.getElementById('input-pass');
                            let priv = document.getElementById('input-private'); 
                         swal.showValidationError(
                                `Please enter your login and master password or only your private posting key`
                            );
                         login.setAttribute('class','form-control is-invalid');
                         pass.setAttribute('class','form-control is-invalid');
                         priv.setAttribute('class','form-control is-invalid');
                         resolve('hel');
                        });
                } else {
                    return {login, pass, priv, log}; 
                } 
            }
        })
        await checker(value.login, value.pass, value.priv, value.log, cb);
    }
    async function getInputsVal() {
        let login = document.getElementById('input-user').value,  
            pass = document.getElementById('input-pass').value, 
            priv = document.getElementById('input-private').value,
            log = document.getElementById('logged').checked;
        return {
            login,
            pass,
            priv,
            log
        };
    }

    async function checker(username, pass, priv, log, cb) {
        this.check;
        this.user = username;
        this.pass = pass;
        this.private = priv;
        try {
            this.private.length == 51 && this.private.match(/5[A-Z]/) ? wif = this.private 
                                                                  : this.response = await golos.api.getAccounts([this.user]);
                                                              } catch(e){
                                                                swal({
                                                                  type: 'error',
                                                                  title: `${document.getElementById('auth-swal-log-title').innerHTML}`,
                                                                  html: `${document.getElementById('auth-swal-log-html').innerHTML}`,
                                                                })
                                                              }
        
        
        if(wif!=''){
            getPublicKey(log, cb);
        } else {
            const roles = ['posting'];
            try {
                let keys = await golos.auth.getPrivateKeys(this.user, this.pass, roles);
                if (response[0].posting.key_auths[0][0] == keys.postingPubkey) {
                    wif = keys.posting;
                    getPublicKey(log, cb);
                } else throw Error();;  
            } catch(e){
                swal({
                  type: 'error',
                  html: `${document.getElementById('auth-masterorlogin-error').innerHTML}`
                })

            }
        }
    }

    async function getPublicKey(log, cb){
        try {
            let resultWifToPublic = await golos.auth.wifToPublic(wif);
            log ? localStorage.wif = wif : '';
            let result = golos.api.getKeyReferences([resultWifToPublic], function(err, result) {
                if (!err) {
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
    }

function logOutProcc(){
        let li = document.createElement('li');
        li.className = `nav-item d-flex align-items-center`;
        li.id = `li-log`;
        li.innerHTML = `<button class="btn btn-primary my-2 my-sm-0" id="logout"><span class="icon-exit"></span> LogOut</button>`;
        document.getElementById('navbar-right').appendChild(li);
        document.getElementById('logout').addEventListener('click', function(e){
            document.getElementById('navbar-right').removeChild(document.getElementById('li-log'));
            localStorage.removeItem('wif');
            localStorage.removeItem('username');
            window.username = '';
            window.wif = '';
            //location.reload();
        })
    }