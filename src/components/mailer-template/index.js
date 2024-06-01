import React from "react";

const MailerTemplate = ({ children }) => {
  return (
    <div style={{ backgroundColor: "lightgray", padding: "20px" }}>
      {children}
    </div>
  );
};

export default MailerTemplate;