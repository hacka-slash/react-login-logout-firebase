import React, { Component } from 'react'
let firebase = require('firebase')

let firebaseConfig = {
    apiKey: "AIzaSyCjNLX_8ZQWadAOMR6eGUwQigRz1r9QENA",
    authDomain: "login-proj-3b469.firebaseapp.com",
    databaseURL: "https://login-proj-3b469.firebaseio.com",
    projectId: "login-proj-3b469",
    storageBucket: "login-proj-3b469.appspot.com",
    messagingSenderId: "554701302396",
    appId: "1:554701302396:web:5ff0665aad3c6fe450b7f9",
    measurementId: "G-3D8K7EXZWV"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

class Authen extends Component{
    login = (event) => {
        const email = this.refs.email.value;
        const password = this.refs.pass.value;
        
        //console.log(email, password)
        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword(email, password);
        
        promise.then(user => {
            let lgoutBn = document.getElementById('signOut');
            console.log(lgoutBn)
            lgoutBn.classList.remove('hide')

            let msg = 'Welcome ' + user.user.email;
            this.setState({msg})
        })
        
        promise.catch(e => {
            let err = e.message;
            console.log(err)
            this.setState({err: err})
        })    
    
    }

    signUp = async () => {
        const email = this.refs.email.value;
        const password = this.refs.pass.value;
        
        //console.log(email, password)
        const auth = firebase.auth();

        //We create an entry with the email and password, or attempt to. It returns a promise with our result.
        //The following auth.() returns a promise object:
            //This doesn't actually make an entry, but does see if it would be possible. 
        const promise = auth.createUserWithEmailAndPassword(email, password)

        //.then() is if promise is successful. .cath() is for errors:
            //if successful, we get a 'user' {} with a .email and .password, and others:
        promise
        .then(user => {
            //The user object has another .user which contains the .email etc that is needed.
            let myData = user.user;
            let msg = "Welcome " + myData.email;
            //Make an entry with a field of 'email':
            alert(msg)
            firebase.database().ref('/users/' + myData.uid).set({
                email: myData.email
            });
            console.log(myData.uid)
            this.setState({msg: msg})
        });
        promise
        .catch(e => {
            let err = e.message;
            console.log(err)
            this.setState({msg: err})
        })
    }

    signOut = () => {
        firebase.auth().signOut();
        let btn = document.getElementById("signOut");
        btn.classList.add('hide');
        this.setState({msg: ''})

    }

    constructor(props){
        super(props)

        this.state = {
            msg: ''
        }
        this.login = this.login.bind(this)
        this.signUp = this.signUp.bind(this)
        this.signOut = this.signOut.bind(this)
    }
    render(){
        return(
            <div>
                <input type="email" id="email" ref="email" placeholder="Enter your email" /> <br/>
                <input type="password" id="pass" ref="pass" placeholder="Enter your password" /> <br/>

                <div>{this.state.msg}</div>
                <button onClick={this.login}>Log In</button>
                <button onClick={this.signUp}>Sign Up</button>
                <button id="signOut" className="hide" onClick={this.signOut}>Log Out</button>
            </div>
        )
    }
}

export default Authen;