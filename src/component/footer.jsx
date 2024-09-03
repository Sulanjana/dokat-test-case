import React from 'react';

const Footer = ({summary}) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Total Summary</p>
        <ul className="footer-links">
          <li><a href="/about">Allowance {summary.allowance}</a></li>
          <li><a href="/contact">Deduction {summary.deduction}</a></li>
          <li><a href="/privacy">Thp Amount {summary.thp_amount}</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
