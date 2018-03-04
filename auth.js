window.wif = '';
window.username ='';
async function auth(){
    swal({
    title: '<h3>To continue, you need to login!</h3>',
    html:'<p><h5>Please enter your login and master password</h5>'+
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
        '<p><hr class="bg-secondary">OR<hr class="bg-secondary">'+
        '<p><h5>Please enter only your private posting key</h5>'+
        '<p><div class="input-group mb-3">' +
        '<input id="input-private" type="password" class="form-control" placeholder="Private posting key" aria-label="Private posting key" aria-describedby="Private posting key" required>' +
        '<div class="input-group-prepend">' +
        '</div>' +
        '</div>',
    showCancelButton: true,
    closeOnConfirm: true,
    showCloseButton: true,
    confirmButtonColor: "#5cb85c",
    confirmButtonText: "Ok",
    preConfirm: async () => {
        const { username, pass, priv } = await getInputsVal();
        if( username.length <= 0 && pass.length <= 0 && priv.length <= 0) {
            console.log('Введите какоенибудь значение');
        } else await checker(username, pass, priv);  
        }
    })
}


async function getInputsVal() {
    let username = document.getElementById('input-user').value;
    let pass = document.getElementById('input-pass').value;
    let priv = document.getElementById('input-private').value;
    return {
        username,
        pass,
        priv
    };
}

async function checker(username, pass, priv) {
    this.check;
    this.user = username;
    this.pass = pass;
    this.private = priv;
    
    this.private.length == 51 && this.private.match(/5[A-Z]/) ? wif = this.private 
                                                              : this.response = await golos.api.getAccounts([this.user]);
    
    if(wif!=''){
        console.log('приватный ключ', wif);
        getPublicKey(wif);

    } else {
        const roles = ['posting'];
        let keys = await golos.auth.getPrivateKeys(this.user, this.pass, roles);
        if (response[0].posting.key_auths[0][0] == keys.postingPubkey) {
            console.log('всё правильно');
            wif = keys.posting;
            getPublicKey(wif);
            
        } else console.log('не правильный логин и\или мастер-пароль!');  
    }
}

async function getPublicKey(wifPar){
    this.wif = wifPar;
    try{
        let resultWifToPublic = await golos.auth.wifToPublic(this.wif);
        console.log('wifToPublic', resultWifToPublic);
        golos.api.getKeyReferences([resultWifToPublic], function(err, result) {
        //console.log(err, result);
            if (!err) {
                result.forEach(function(item) {
                    console.log('getKeyReferences', 'username: [', item[0], ']');
                    username = item[0];

                });
            } else console.error(err);
        });
    } catch(e){
        console.log(e);
    }
}