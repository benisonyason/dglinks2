import React from 'react';
import { Breadcrumb } from 'react-bootstrap';

export default function CheckoutSteps(props) {
  return (
    <div className='minicontent'>
          <Breadcrumb>
      <Breadcrumb.Item className={props.step1 ? 'active' : ''}>Sign-In</Breadcrumb.Item>
      <Breadcrumb.Item className={props.step2 ? 'active' : ''}>KYC Details</Breadcrumb.Item>
      <Breadcrumb.Item className={props.step3 ? 'active' : ''}>Payment</Breadcrumb.Item>
      <Breadcrumb.Item className={props.step4 ? 'active' : ''}>Place Order</Breadcrumb.Item>
    </Breadcrumb>

    </div>
  );
}
