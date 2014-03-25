monitor-api
===========

monitor api nodejs

npm install,
executar mongod para iniciar mongo
node app.js

http://localhost:3001

app.get('/add/:website', routes.add)
-> add pagina para resultados

app.get('/test/:website*', routes.test);
->testar unica url

app.get('/todos', routes.todos);
->Verificar todas as url adicionadas

app.get('/remove/:website*', routes.remove)
-> remover uma url dos testes
