const crypto = require('crypto');

function hashPwd(pwd){
    return crypto.createHmac('sha256', "secret!") //more information: https://nodejs.org/api/crypto.html
        .update(pwd)
        .digest('hex');
}

const jwtSecret =  'aklsdjfklöasjdcma8sd90ziklasdföasdf$ädasöfü pi340qkrlöam,dflöäasf';



module.exports = {hashPwd, jwtSecret};
