const fs = require('fs');
const path = require('path');

function saveData(oldpath, newPath, bool) {
    console.log(bool);
    fs.readdir(oldpath, function (err, files) {
        if (err) {
            console.log(err);
        } else {

            fs.mkdir(newPath, function (err) {
                if (err) {
                    if (err.code === 'EEXIST') {
                        console.log('Folder juz istnieje');
                        return;
                    }
                    console.log(err);
                } else {
                    console.log('Stworzono folder');
                }
            });

            fs.readdir(newPath, function (err, data) {
                if (err) {
                    console.log(err);
                } else if ((data.length === 0) || ((data.length > 0) && (bool === true))) {

                    console.log('Zapisano pliki');

                    fs.readFile(path.join(oldpath, files[0]), 'utf-8', function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            // console.log(JSON.parse(data))
                            let usersData = JSON.parse(data);

                            for (let userData of usersData) {
                                // console.log(userData.id);
                                let splittedName = userData.name.split(" ");
                                let fname = splittedName[0];
                                let lname = splittedName[1];
                                let content =
                                    `Name: ${fname}\nSurname: ${lname}\nStreet: ${userData.address.street}\nZip Code: ${userData.address.zipcode}\nCity: ${userData.address.city}\nPhone: ${userData.phone}`;
                                fs.writeFile(path.join(newPath, (userData.id + userData.name) + '.txt'), content, function (err) {
                                    if (err) {
                                        console.log(err);
                                    }
                                });
                            }
                        }
                    });
                } else {
                    console.log('Nie nadpisano isntijących plików');
                }
            });
        }
    });
}

module.exports = saveData;