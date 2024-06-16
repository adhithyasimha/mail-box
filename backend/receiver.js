const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

// Create a Supabase client
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqa3J0bXd3Zm9oeW9uYWZvdW12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1MTY5MjYsImV4cCI6MjAzNDA5MjkyNn0.coE-6KquwZi_KQlc893niek7iuSV-B7U46oNVGt3cp8';
const supabaseUrl = 'https://djkrtmwwfohyonafoumv.supabase.co';
const supabase = createClient(supabaseUrl, supabaseKey);

// Fetch data from the API
const apiUrl = 'http://15.207.118.14:5000/api/mail';
axios.get(apiUrl)
    .then(response => {
        // Extract the relevant data from the API response
        const emailData = {
            from_name: response.data.from.value[0].name,
            from_address: response.data.from.value[0].address,
            to_address: response.data.to.value[0].address,
            subject: response.data.subject,
            date: response.data.date,
            body: response.data.body,
            attachment: response.data.attachments.length > 0 ? response.data.attachments[0] : null
        };

        // Add the fetched data to the Supabase table
        supabase
            .from('receivemail')
            .insert(emailData)
            .then(response => {
                console.log('Data added to Supabase table:', response);
            })
            .catch(error => {
                console.error('Error adding data to Supabase table:', error);
            });
    })
    .catch(error => {
        console.error('Error fetching data from API:', error);
    });
