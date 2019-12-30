//Server to mimic APIs for desktop

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const app = express();

router.use(bodyParser.json());

const name = 'mock-api.desktop.local';
const port = process.env.PORT || 5000;

//Login
function authCreate(req, res) {
  //create token
  let token = null,
    error = null;
  const { auth } = req.body;
  const { username, password } = auth;
  if (username && password) {
    //mock authentication
    const names = String(username).split('.');
    const firstName = names[0];
    const lastName = names[1] ? names[1] : 'Agent';
    const userData = {
      username,
      firstName,
      lastName
    };
    token = userData;
  } else {
    //no token to be given
    error = 'Invalid Credentails';
  }
  res.json({ access_token: token, error });
}
router.post('/api/auth', authCreate);

app.use(router);
app.listen(port, () => console.log(`${name} listening on port ${port}`));
