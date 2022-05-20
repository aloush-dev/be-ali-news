const app = require('./app');
const { PORT = 9090 } = process.env.PORT;

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on ${PORT}...`);
});
