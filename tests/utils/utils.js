require('dotenv').config({
    path: process.env.NODE_ENV === 'development' ? '.env.test' : '.env'
  });

  
console.log(process.env.NODE_ENV);
console.log(process.env.DB_URL);