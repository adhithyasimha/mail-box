import React, { useState } from 'react';
import { Button } from 'baseui/button';
import { Input } from 'baseui/input';
import { DisplayMedium } from 'baseui/typography';
import { createClient } from '@supabase/supabase-js';
import './style.css';

function Auth({ onAuthSuccess }) {
  const Title = 'Welcome to Mail Box ✉️';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  
  const supabaseUrl = 'supaurl';
  const supabaseKey = 'supakey';


  const supabase = createClient(supabaseUrl, supabaseKey);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) throw error;

      if (data) {
       
        if (data.password === password) {
          console.log('Successfully signed in:', data);
          onAuthSuccess(); // Call this function on successful authentication
        } else {
          setError('Invalid email or password');
        }
      } else {
        setError('User not found');
      }
    } catch (error) {
      console.error('Error signing in:', error.message);
      setError('An error occurred while signing in');
    }
  }

  return (
    <div className='auth-container'>
      <section className='visual'></section>
      <form onSubmit={handleSubmit}>
        <DisplayMedium marginBottom='scale500'>{Title}</DisplayMedium>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Input
          type='email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder='Email'
          required
        />
        <Input
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder='Password'
          required
        />
        <Button
          type='submit'
          overrides={{
            BaseButton: {
              style: () => {
                return {
                  width: '100%',
                  marginTop: '20px',
                };
              },
            },
          }}
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default Auth;