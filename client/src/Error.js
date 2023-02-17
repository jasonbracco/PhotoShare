import React from 'react'

function Error({ error }) {
    console.log(error)
    return (
        <div className="error-messages">
            Error: {error}
        </div>
    );
  }

  export default Error