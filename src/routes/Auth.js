import { firebaseInstance, authService } from 'fbase';
import React, { useState } from 'react';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {target: {name, value},} = event;
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    };


    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            let data;
            if(newAccount){
                //create Account
                data = await authService.createUserWithEmailAndPassword(email, password);
            }else{
                //Login
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        }catch(error){
            setError(error.message);
            //console.log(error);
        }
        
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);
    const socailLoginClick = async (event) => {
        const {target: { name },} = event;
        let provider;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else if(name === "github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
    }

    return (<div>
        <form onSubmit={onSubmit}>
            <input name="email" type="text" placeholder="email" value={email} onChange={onChange} required  />
            <input name="password" type="password" placeholder="password" value={password}  onChange={onChange} required />
            <input type="submit" value={newAccount ? "create Account":"Sign In"} />
            {error}
        </form>
        <span onClick={toggleAccount}> {newAccount ? "Sign In":"createAccount"}</span>
        <div>
            <button onClick={socailLoginClick} name="google">Continue with Google</button>
            <button onClick={socailLoginClick} name="github">Continue with gitHub</button>
        </div>
    </div>)
}
export default Auth;