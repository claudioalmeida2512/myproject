const knex = require('./database');
const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const jwt = require('jsonwebtoken');
const config = require('./config');
const bcrypt = require('bcrypt');

const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['*'],
  allowHeaders: ['*'],
  exposeHeaders: ['*']
})



const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0',
});
server.use(restify.plugins.bodyParser());
server.pre(cors.preflight)
server.use(cors.actual)

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});

server.get('/list/:table', (req, res, next) => {
  knex(req.params.table)
    .then((dados) => {
      //console.log(dados) ;
      res.send(dados);
    
    }, next
    
    )
});


server.get('/list/:table/:left/:idA/:idB', (req, res, next) => {
  knex.select('*')
    .from(req.params.table)
    .leftOuterJoin(req.params.left, req.params.idA, req.params.idB)
    .then((dados) => {
     res.send(dados);
    
    }, next
    
    )
});

server.post('/create/:table', (req, res, next) => {
  //console.log(">> " + JSON.stringify(req.body));
  var cUsername = req.body.username;
  var cEmail = req.body.email;
  var cPass = req.body.pass;
  var cuser_dep = req.body.user_dep;
  var cuser_funcao = req.body.user_funcao;
  var dUser_criado = new Date();
  //console.log("Pass:" + cPass + " Sal:" + config.SALT_ROUNDS);
  //encryptando a password
  const hash = bcrypt.hashSync(cPass, config.SALT_ROUNDS);
  //console.log("hash:" + hash);
  
  const dataToInsert = {
    username: cUsername,
    email: cEmail,
    pass: hash,
    user_dep: cuser_dep,
    user_funcao: cuser_funcao,
    user_criado: dUser_criado,
  };
  //console.log("dados:" + JSON.stringify(dataToInsert));
  knex(req.params.table)
    .insert(dataToInsert)
    .then((dados) => {
      res.send(dados);
    }, next)
});


server.post('/generic/:table', (req, res, next) => {
  console.log(">> " + JSON.stringify(req.body));
  const dataToInsert = req.body;
  knex(req.params.table)
    .insert(dataToInsert)
    .then((dados) => {
      res.send(dados);
    }, next)
});



server.get('/pesq/:table/:field/:value', (req, res, next) => {
  const { table , field , value } = req.params ;

  knex(table)
    .where(field, value)
    .first()
    .then((dados) => {
      if (!dados)
        return res.send(new Error('Usuario não encontrado!'));
      console.log(dados);
      res.send(dados);
    }, next)
});

server.post('/auth/authenticate', (req, res, next) => {
  const email = req.body.email;
  console.log(email);
  knex('users')
    .select('id', 'username', 'email','pass')
    .where('email', email)
    .first()
    .then((dados) => {
      if (!dados) {
        const err = new Error('Usuario não encontrado!')
        console.log(err.message);
        return res.send(err);
      }
      let tokenData = {
        id: dados.id,
        name: dados.username,
        email: dados.email

      }
      //compara a senha do usuario
      if  (bcrypt.compareSync(req.body.senha, dados.pass)) {
        let genetedToken = jwt.sign(tokenData, config.JWT_KEY, { expiresIn: '60m' });
        let generetedData = {
          user: tokenData,
          token: genetedToken
        }
        res.send(generetedData);

      } else {
        const err = new Error('Senha Invalida!');
        console.log(JSON.stringify(err));
        return res.send(err);
      }

    }, next)
});

server.put('/update/:id', (req, res, next) => {
  const { id } = req.params;

  knex('users')
    .where('id', id)
    .update(req.body)
    .then((dados) => {
      if (!dados)
        return res.send(new Error('Usuario não encontrado!'));
      res.send('Dados atualizados !!');
    }, next)
});

server.del('/delete/:id', (req, res, next) => {
  const { id } = req.params;

  knex('users')
    .where('id', id)
    .delete()
    .then((dados) => {
      if (!dados)
        return res.send(new Error('Usuario não encontrado!'));
      res.send('Dados excluidos !!');
    }, next)
});