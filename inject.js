let ipfsApi = document.createElement('script');
ipfsApi.src = 'https://unpkg.com/ipfs-api@9.0.0/dist/index.min.js';
(document.head||document.documentElement).appendChild(ipfsApi);
let golosImagesApi = document.createElement('script');
//golosImagesApi.src = 'https://golosimages.com/api.js';
golosImagesApi.src = 'api.js';
document.getElementsByTagName('body')[0].appendChild(golosImagesApi);
