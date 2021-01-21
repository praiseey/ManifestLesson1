// we use pg library to
// request connection pool from postgres database
// psql -h traineedb.cgq0reqixqsd.us-east-1.rds.amazonaws.com -d postgres -U traineeUser password is traineePassword
const { Pool } = require('pg');

// we connect to pg using pool we requested
const pool = new Pool({
  user: 'traineeUser',
  host: 'traineedb.cgq0reqixqsd.us-east-1.rds.amazonaws.com',
  password: 'traineePassword',
  database: 'postgres',
  port: 5432,
  multipleStatements: true
});

// the pool emits an error on behalf of any idle clients
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// if no error on idel client, pool connects to database
pool.connect((err, client, done) => {
    //if there is an error with our database connection strings
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    //if no error then we have successfully connected 
    console.log('Connected to database');
    // do not call done(); - because we want to use this connection 
    // to create/insert/delete or select records from our database
    // sometime we might also want to export this connection for other resources
});

// insert a record into our table
pool.query(
    `INSERT INTO UserPraise2021 
                 (ID, COUNTRY, BUSINESS_NAME, FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, SKILL, PHONE, CREATED_DT)
                 VALUES 
                 ('1', 'Nigeria', 'Fast Food Ltd', 'Praise', 'Inua', 'praisepaul634@gmail.com', '2021Praise!', 'True', '8123456789', '2021-01-19'),
                 ('2', 'Ghana', 'Soul Food Ltd', 'Abena', 'Kwame', 'abenakwame@gmail.com', '2021Abena!', 'True', null, '2021-01-19'),
                 ('3', 'USA', 'Mall Shop Ltd', 'John', 'Paul', 'johnpaul@gmail.com', '2021John!', 'True', '8123456789', '2021-01-20'),
                 ('4', 'Canada', 'Welding Ltd', 'Sam', 'Smith', 'samsmith@gmail.com', '2021Smith!', 'True', '8123456789', '2021-01-21'),
                 ('5', 'Kenya', 'Market Square Ltd', 'Kelly', 'Tom', 'kellytom@gmail.com', '2021Kelly!', 'False', null, '2021-01-21')
                 `,
    (err, res) => {
      if(err) {
        console.log('Error or issue with table creation');
        console.log(err);
    } else {
        console.log('Inserted data into table successfully');
        console.log(res);
   }
  } 
);

pool.end();


// export connection
module.exports = pool;