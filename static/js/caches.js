var dados2;

var dynamic = [
    '/',
    '/index.html',
    '/service-worker.js',
'/static/js/idb.js'

];


function cacheAssets(dynamic) {
    return new Promise(function (resolve, reject) {
        // open cache
        caches.open('dynamic-v1')
            .then(function (cache) {
                // the API does all the magic for us
                cache.addAll(dynamic)
              
                    .then(function () {
                        console.log('all assets added to cache')
                        resolve()
                    })
                    .catch(function (err) {
                        console.log('error when syncing assets', err)
                        reject()
                    })
            }).catch(function (err) {
                console.log('error when opening cache', err)
                reject()
            })
    });
}



var url = 'https://fotogeo-16a78.firebaseio.com/registro.json';
var networkDataReceived = false;

fetch(url)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        networkDataReceived = true;

        // console.log(data.foto + '<???>' + jhg);

        console.log('From web FETCH 3 >', data);
        var dataArray = [];
        for (var key in data) {
            dataArray.push(data[key].foto);




        };
    
    
        window.dados2 = dataArray;

        console.log(window.dados2);
        cacheAssets(dynamic, window.dados2)
            .then(function () {
                console.log('All assets cached', window.dados2)
            });


        return window.dados2;
    }).catch(function (err) {
        console.log(err);
    });


/*
fetch('https://fotogeo-16a78.firebaseio.com/registro.json', {
  method: 'GET',
  headers: {
       "key" : "Access-Control-Allow-Origin",
    "value" : "*",
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  mode: 'cors',
 // body: JSON.stringify({message: 'Does this work?'})
})
  .then(function(response) {
    console.log(response);
    return response.json();
  })
  .then(function(data) {
    console.log('From web FETCH 3 >', data);
        var dataArray = [];
        for (var key in data) {
            dataArray.push(data[key].foto); };
  })
  .catch(function(err) {
    console.log(err);
  });

// list of urls to be cached

// cache responses of provided urls





cacheAssets(dynamic, window.dados2)
  .then(function()  {
      console.log('All assets cached', window.dados2)
  });
*/




/*cacheAssets(dynamic, window.dados2 )
  .then(function ()  {
    
self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(function(res) {
              
              console.log('deucerto>>>>>>>>>>>>>>>>>>')
              return caches.open('dynamic22')
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());
                  return res;
                })
            });
        }
      })
  );
});
      console.log('All assets cached')
  });*/