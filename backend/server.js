require('dotenv').config();
const app = require('./src/app.js')
require('./src/db/db.js')

app.listen(3000, () => {
    console.log('Server is running on PORT: 3000');
})