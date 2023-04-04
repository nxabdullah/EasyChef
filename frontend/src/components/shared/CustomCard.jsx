import React from 'react'
import '../../styles/custom-card.css';

function CustomCard({ title, children }) {
  return (
    <div class="card mt-4 custom-card">

      <div class="card-header">
          <h4 class="card-header-title">{ title }</h4>
      </div>

      <div class="card-body">
        {children}
      </div>
    </div>
  )
}

CustomCard.defaultProps = {
  title: 'Default Title',
};

export default CustomCard