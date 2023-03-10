import React from 'react'

function Error({ error }) {

    return (
        <div className="error-messages">
            Error: {error}
        </div>
    );
  }

  export default Error