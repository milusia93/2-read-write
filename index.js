const fs = require('fs');
const path = require('path');
const saveData = require('./save-data')

saveData(path.join(__dirname, 'data'), path.join(__dirname, 'users'), true);
// saveData(path.join(__dirname, 'data'), path.join(__dirname, 'users'));