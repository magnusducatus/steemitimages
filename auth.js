window.wif = '';
window.username = '';
async function auth(){
    const {value} = await swal({
    title: '<h3><span class="translate" id="authtitle">To continue, you need to login!</h3>',
    html:'<p><h5><span class="translate" id="authlogpass">Please enter your login and master password</span></h5>'+
        '<p><div class="input-group mb-3">' +
        '<div class="input-group-prepend">' +
        '<span class="input-group-text" id="username" required>@</span>' +
        '</div>' +
        '<input id="input-user"type="text" class="form-control" placeholder="Username" aria-label="username" aria-describedby="username" required>' +
        '</div>' +
        '<p><div class="input-group mb-3">' +
        '<input id="input-pass" type="password" class="form-control" placeholder="Master password" aria-label="Password" aria-describedby="Password" required>' +
        '<div class="input-group-prepend">' +
        '</div>' +
        '</div>'+
        '<p><hr class="bg-secondary"><span class="translate" id="author">OR</span><hr class="bg-secondary">'+
        '<p><h5><span class="translate" id="authwif">Please enter only your private posting key</span></h5>'+
        '<p><div class="input-group mb-3">' +
        '<input id="input-private" type="password" class="form-control" placeholder="Private posting key" aria-label="Private posting key" aria-describedby="Private posting key" required>' +
        '<div class="input-group-prepend">' +
        '</div>' +
        '</div>',
    showCancelButton: true,
    closeOnConfirm: true,
    showCloseButton: true,
    preConfirm: async () => {
            const { login, pass, priv } = await getInputsVal();
            if( login.length <= 0 && pass.length <= 0 && priv.length <= 0) {
                 return new Promise( resolve => {
                        let login = document.getElementById('input-user');
                        let pass = document.getElementById('input-pass');
                        let priv = document.getElementById('input-private'); 
                     swal.showValidationError(
                            '<span class="translate" id="autherr">Please enter your login and master password or only your private posting key</span>'
                        );
                     login.setAttribute('class','form-control is-invalid');
                     pass.setAttribute('class','form-control is-invalid');
                     priv.setAttribute('class','form-control is-invalid');
                     resolve('hel');
                    });
            } else {
                return {login, pass, priv}; 
            } 
        }
    })
    await checker(value.login, value.pass, value.priv);
}
async function getInputsVal() {
    let login = '',  pass = '', priv ='';
     login = document.getElementById('input-user').value;
     pass = document.getElementById('input-pass').value;
     priv = document.getElementById('input-private').value;
    return {
        login,
        pass,
        priv
    };
}

async function checker(username, pass, priv) {
    this.check;
    this.user = username;
    this.pass = pass;
    this.private = priv;
    try{
        this.private.length == 51 && this.private.match(/5[A-Z]/) ? wif = this.private 
                                                              : this.response = await golos.api.getAccounts([this.user]);
                                                          } catch(e){
                                                            swal({
                                                              type: 'error',
                                                              title: '<span class="translate" id="authcheckerlogin">Login</span>',
                                                              html: '<span class="translate" id="authcheckertext">Your login is incorrect!</span>',
                                                            })
                                                          }
    
    
    if(wif!=''){
        getPublicKey(wif);
    } else {
        const roles = ['posting'];
        try{
            let keys = await golos.auth.getPrivateKeys(this.user, this.pass, roles);
            if (response[0].posting.key_auths[0][0] == keys.postingPubkey) {
                wif = keys.posting;
                getPublicKey(wif);
            
            } else throw Error();;  
        } catch(e){
            swal({
              type: 'error',
              title: '<span class="translate" id="authprivatetitle">Error</span>',
              html: '<span class="translate" id="authprivatetext">Master Key or password is incorrect!</span>'
            })

        }
    }
}

async function getPublicKey(wifPar){
    this.wif = wifPar;
    try{
        let resultWifToPublic = await golos.auth.wifToPublic(this.wif);
        golos.api.getKeyReferences([resultWifToPublic], function(err, result) {
            if (!err) {
                result.forEach(function(item) {
                    username = item[0];
                    swal({
                      type: 'success',
                      title: '<span class="translate" id="authpublictitle">Success</span>',
                      html: '<span class="translate" id="authpublictext">Authorization was successful!</span>'
                    })
                });
            } else swal(err);
        });
    } catch(e){
        swal({
              type: 'error',
              title: '<span class="translate" id="authpublicerrtitle">Error</span>',
              htmlhtml: '<span class="translate" id="authpublicerrtext">Private key is incorrect!</span>'
            })
    }
}