import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import '../assets/Header.css';

const Header = () => {
  return (
    <header className="header">
      <Logo />
    </header>
  );
};

export default Header;
