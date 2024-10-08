import React, { useState } from 'react';
// import React from 'react';
import { OverlayTrigger, Tooltip, Card } from 'react-bootstrap'; // Ensure these are imported

const Quality = ({ name, msg }) => {
  const renderTooltip = (props) => (
    <Tooltip id="card-tooltip" {...props}>
      <Card style={{  border: 'none' }}>
        <Card.Body>
          <Card.Title style={{
            marginTop: '-15px',
            backgroundColor: '#eee',
            marginRight: '-18px',
            marginLeft: '-18px',
            padding: '7px',
            borderTopLeftRadius:'15px',
            borderTopRightRadius:'15px'
          }}>
            {name}
          </Card.Title>
          <Card.Text style={{ fontWeight: 'normal' }}>
            {msg}
          </Card.Text>
        </Card.Body>
      </Card>
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }} // Control the tooltip visibility delay
      overlay={renderTooltip}
    >
      <i
        className="fa-duotone fa-circle-info"
        style={{
          fontSize: '37px',
          display: 'block',
          cursor: 'pointer',
          color: '#7B7E8C',
        }}
      ></i>
    </OverlayTrigger>
  );
};

export default Quality;
