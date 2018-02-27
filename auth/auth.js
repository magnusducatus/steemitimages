golos.config.set('websocket', 'wss://ws.testnet3.golos.io');
golos.config.set('chain_id', '5876894a41e6361bde2e73278f07340f2eb8b41c2facd29099de9deef6cdb679');
var wif;
swal({
    title: 'Input username && password or private posting key',
    html:'<p><div class="input-group mb-3">' +
        '<div class="input-group-prepend">' +
        '<span class="input-group-text" id="username" required>@</span>' +
        '</div>' +
        '<input id="input-user"type="text" class="form-control" placeholder="Username" aria-label="username" aria-describedby="username" required>' +
        '</div>' +
        '<p><div class="input-group mb-3">' +
        '<input id="input-pass" type="password" class="form-control" placeholder="password or private posting key" aria-label="password or posting key" aria-describedby="password" required>' +
        '<div class="input-group-prepend">' +
        '<span class="input-group-text" id="password"></span>' +
        '</div>' +
        '</div>',
    showCancelButton: true,
    closeOnConfirm: false,
    preConfirm: async () => {
        const { username, pass } = await getInputsVal();
        if( username.length<=0 || pass.length<=0) {

        }
        else await checker(username, pass);

    }
})

async function getInputsVal() {
    let username = document.getElementById('input-user').value;
    let pass = document.getElementById('input-pass').value;
    return {
        username,
        pass
    };
}

async function checker(username, pass) {
    this.user = username;
    this.pass = pass; // мастер-пароль
    this.pass.length == 51 && this.pass.match(/5[A-Z]/) ? console.log('приватный ключ', this.pass) :
        golos.api.getAccounts([this.user], function(err, response) {
            if (!err) {
                const roles = ['posting'];
                let keys = golos.auth.getPrivateKeys(this.user, this.pass, roles);
                console.log(keys);
                if (response[0].posting.key_auths[0][0] == keys.postingPubkey) {
                    wif = keys.posting;
                    console.log('всё правильно');
                } else console.log('не правильный логин и\или мастер-пароль!');
            }
        });
}