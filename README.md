
..* [npm install --save firebase]

..*For the promise, I had to save the data from user.user into a variable because the user didn't have the nested properties such as .email which I needed. Turns out the data I needed was inside user.user and 

.then(user => {
            //The user object has another .user which contains the .email etc that is needed.
            let myData = user.user;