import React, { useState } from 'react';
import { Button } from 'baseui/button';
import { Input } from 'baseui/input';
import { DisplayLarge, DisplayMedium } from 'baseui/typography';

import './style.css'

async function handleSubmit(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        var email_id = document.getElementById("email-input").value;
        var password = document.getElementById("password-input").value;
        console.log("email_id:", email_id);
        console.log("Password:", password);

        // // Make sure supabase is defined before using it
        // const response = await supabase.auth.signInWithPassword({
        //         email: email_id,
        //         password: password,
        // });
        // const { data, error } = response;
}

document.addEventListener("DOMContentLoaded", function() {
        var form = document.getElementById("auth-form");
        if (form) {
                form.addEventListener("submit", handleSubmit);
        } else {
                console.error("Element with id auth-form not found.");
        }
});


function Auth(){
    const Title = "Welcome to Mail Box";
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
            event.preventDefault(); // Prevent the default form submission behavior
            var email_id = document.getElementById("email-input").value;
            var password = document.getElementById("password-input").value;
            console.log("email_id:", email_id);
            console.log("Password:", password);
    
            // // Make sure supabase is defined before using it
            // const response = await supabase.auth.signInWithPassword({
            //         email: email_id,
            //         password: password,
            // });
            // const { data, error } = response;
    }

//design


    return(
        <div className='auth-container'>
            <section className='visual'></section>
            <form onSubmit={handleSubmit}>
                <DisplayMedium marginBottom="scale500">{Title}</DisplayMedium>
                <Input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email"
                    required
                    />
                <Input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password"
                    required
                    />
                <Button 
                    type="submit"
                    overrides={{
                        BaseButton: {
                            style: ({$theme }) => {
                                return {
                                    width: '100%',
                                    marginTop: '20px',
                                };
                            },
                        },
                    }}
                >Login</Button>
            </form>
        </div>
    );
}


export default Auth

