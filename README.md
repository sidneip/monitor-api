# MONITOR-API 

The sample APP to monitor their APIS or Websites.

Application HEARTBEAT ROUTE!

Basic useful feature list:

 * Add address(apis, websites) for monitor.
 * test address is on.
 * Verify status all address.
 * remove address.

UP Project and add features! :+1:

```
git clone https://github.com/sidneip/monitor-api.git
npm install
mongod
node app.js
```

###### .
```
app.get('/add/:website', routes.add)
app.get('/test/:website*', routes.test);
app.get('/todos', routes.todos);
app.get('/remove/:website*', routes.remove)
```
