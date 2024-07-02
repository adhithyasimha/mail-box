import React, { useState, useEffect } from 'react';
import InboxComponent from '../Inbox/inboxComponent';
import StarredComponent from './starredComponent'
import { createClient } from "@supabase/supabase-js";

function MailApp() {
  const [inboxMails, setInboxMails] = useState([]);
  const [starredMails, setStarredMails] = useState([]);
  const supabaseUrl = 'supaurl';
  const supabaseKey = 'supakey';
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