if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path:'Mesh-3ayez-Doctor-ACL/.env'});
}
console.log(process.env.secretKey);
