function add(x,y){
   console.log('     [SP]  processing ', x , ' and ', y);
   var p = new Promise(function(resolveFn, rejectFn){
      setTimeout(function(){
         console.log('     [SP]  returning result');
         resolveFn(x + y);
      }, 5000)
   });
   return p;
}


function add(x,y){
   console.log('     [SP]  processing ', x , ' and ', y);
   var deferred = Promise.defer();
   sendAddResult(x,y,deferred);  
   return deferred.promise;
}

function sendAddResult(x,y,deferred){
 setTimeout(function(){
         console.log('     [SP]  returning result');
         deferred.resolve(x + y);
    }, 5000)	
}


