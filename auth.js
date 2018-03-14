
    localStorage && localStorage.wif ? window.wif = localStorage.wif : window.wif = '';
    window.username = '';
    async function auth(){
        const {value} = await swal({
        title: document.getElementById('auth-header').innerHTML,
        html:document.getElementById('auth-html').innerHTML,
        showCancelButton: true,
        closeOnConfirm: true,
        showCloseButton: true,
        footer:document.getElementById('auth-footer').innerHTML,
        preConfirm: async () => {
                const { login, pass, priv, log } = await getInputsVal();
                if( login.length <= 0 && pass.length <= 0 && priv.length <= 0) {
                     return new Promise( resolve => {
                            let login = document.getElementById('input-user');
                            let pass = document.getElementById('input-pass');
                            let priv = document.getElementById('input-private'); 
                         swal.showValidationError(
                                document.getElementById('auth-enter').innerHTML
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
        await checker(value.login, value.pass, value.priv, value.log);
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

    async function checker(username, pass, priv, log) {
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
                                                                  title: 'Login',
                                                                  html: document.getElementById('log-incorrect').innerHTML,
                                                                })
                                                              }
        
        
        if(wif!=''){
            getPublicKey(wif, log);
        } else {
            const roles = ['posting'];
            try {
                let keys = await golos.auth.getPrivateKeys(this.user, this.pass, roles);
                if (response[0].posting.key_auths[0][0] == keys.postingPubkey) {
                    wif = keys.posting;
                    getPublicKey(wif, log);
                } else throw Error();;  
            } catch(e){
                swal({
                  type: 'error',
                  title: 'Error',
                  html: document.getElementById('key-pass-incorrect').innerHTML
                })

            }
        }
    }

    async function getPublicKey(wifPar, log){
        this.wif = wifPar;
        try {
            let resultWifToPublic = await golos.auth.wifToPublic(this.wif);
            log ? localStorage.wif = wif : '';
            golos.api.getKeyReferences([resultWifToPublic], function(err, result) {
                if (!err) {
                    result.forEach(function(item) {
                        username = item[0];
                        swal({
                          type: 'success',
                          title: 'Success',
                          html: document.getElementById('auth-good').innerHTML
                        })
                    });
                } else swal(err);
            });
        } catch(e){
            swal({
                  type: 'error',
                  title: 'Error',
                  html: document.getElementById('private-key-good').innerHTML
                })
        }
    }
