var jwt = require('jsonwebtoken');

const token = jwt.sign({
  exp: Math.floor(Date.now() / 1000) + (3 * 3),
  data: 'foodbar'
}, 'qwertyuiop');


function checkTokenExpire(token, secret) {
  try {
    var decoded = jwt.verify(token, secret);
    console.log(decoded.data);
    return false;
  } catch (err) {
    if (err.name == 'TokenExpiredError') {
      console.log('Token has expired');
      return true;
    } else {
      console.log('Token verification failed:', err.message);
      return null;
    }
  }
}

const isExpired = checkTokenExpire(token, 'qwertyuiop');
console.log('token expired', isExpired);

setTimeout(() => {
  const isExpiredLater = checkTokenExpire(token, 'qwertyuiop'); 
  console.log('token expired after timeout', isExpiredLater);
}, 70000);  



// have aa token vadu login ma kar pachhi aav batava ane security key ne kale je rite manage karelu ae rite kar je
