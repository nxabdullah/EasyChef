import React from 'react'
import '../../styles/custom-card.css';

function CustomCard({ Title, children }) {
  return (
    <div class="card mt-4">

      <div class="card-header">
          <h4 class="card-header-title">{ Title }</h4>
      </div>

      <div class="card-body">
        {children}
      </div>
    </div>
  )
}

CustomCard.defaultProps = {
  Title: 'Default Title',
};

export default CustomCard