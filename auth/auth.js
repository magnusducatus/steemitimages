

swal({
  title: 'Input username && password or private posting key',
  html: '<p><div class="input-group mb-3">'+
  			'<div class="input-group-prepend">'+
    			'<span class="input-group-text" id="username">@</span>'+
  			'</div>'+
  			'<input id="input-user"type="text" class="form-control" placeholder="Username" aria-label="username" aria-describedby="username">'+
		'</div>'+
		'<p><div class="input-group mb-3">'+
  			'<input id="input-pass" type="password" class="form-control" placeholder="password or private posting key" aria-label="password or posting key" aria-describedby="password">'+
  			'<div class="input-group-prepend">'+
   				'<span class="input-group-text" id="password"></span>'+
  			'</div>'+
		'</div>',
  showCancelButton: true,
  closeOnConfirm: false,
  preConfirm: async ()=>{
  	const {username, pass} = await getInputsVal();
  	await checker(username, pass);

  }
})

async function getInputsVal(){
	let username = document.getElementById('input-user').value;
  	let pass = document.getElementById('input-pass').value;
  	return {username , pass};
}

async function checker(username, pass){
	this.user = username;
	this.pass = pass; // мастер-пароль
	this.pass[0] == 5 ? console.log('приватный ключ',this.pass) :
		golos.api.getAccounts([this.user], function(err, response) {
			if ( ! err) {
				// получение публичного ключа
				var roles = ['posting']; // параметр необязательный, если не указаывать, то вернутся все ключи
				var keys = golos.auth.getPrivateKeys(this.user, this.pass, roles);
				// проверка публичного ключа аккаунта и с полученым публичным ключом
        console.info(response[0].posting.key_auths[0][0]);
        console.info(keys);
				if (response[0].posting.key_auths[0][0] == keys.postingPubkey) console.log('правильный логин и мастер-пароль!');
				else console.log('не правильный логин и\или мастер-пароль!');
			}
		});
}
