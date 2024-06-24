import React, { useState, useEffect } from 'react';
import InboxComponent from '../Inbox/inboxComponent';
import StarredComponent from './starredComponent'
import { createClient } from "@supabase/supabase-js";

function MailApp() {
  const [inboxMails, setInboxMails] = useState([]);
  const [starredMails, setStarredMails] = useState([]);
  const supabaseUrl = 'https://djkrtmwwfohyonafoumv.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqa3J0bXd3Zm9oeW9uYWZvdW12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1MTY5MjYsImV4cCI6MjAzNDA5MjkyNn0.coE-6KquwZi_KQlc893niek7iuSV-B7U46oNVGt3cp8';
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    const fetchMails = async () => {
      let { data, error } = await supabase
        .from('inboxMails')
        .select('*');
      
      if (error) console.error(error);
      else setInboxMails(data);
    };
    fetchMails();
  }, []);

  return (
    <div>
      <InboxComponent 
        inboxMails={inboxMails} 
        setInboxMails={setInboxMails}
        starredMails={starredMails}
        setStarredMails={setStarredMails}
      />
      <StarredComponent 
        starredMails={starredMails}
        setStarredMails={setStarredMails}
        setInboxMails={setInboxMails}
      />
    </div>
  );
}

export default MailApp;