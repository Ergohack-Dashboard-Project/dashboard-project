import {
  AccountBalanceOutlined,
  AutoGraphOutlined,
  DashboardOutlined,
  FiberSmartRecordOutlined,
  HomeOutlined,
  MenuOutlined,
} from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useState } from 'react';

// TODO: Change these icons for more appropriate ones if available
const navLinks = [
  {
    label: 'Token',
    link: '/token-info',
    value: 'info',
    icon: <FiberSmartRecordOutlined />,
  },
  {
    label: 'Staking',
    link: '/staking',
    value: 'staking',
    icon: <AutoGraphOutlined />,
  },
  {
    label: 'Home',
    link: '/',
    value: '/',
    icon: <HomeOutlined />,
  },
  {
    label: 'Dashboard',
    link: '/dashboard',
    value: 'dashboard',
    icon: <DashboardOutlined />,
  },
  {
    label: 'More',
    link: 'sidemenu',
    value: 'sidemenu',
    icon: <MenuOutlined />,
  },
];

// Styles
const root = { position: 'fixed', bottom: -1, width: '100vw' };

const BottomNav = () => {
  const [value, setValue] = useState('/');

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation showLabels value={value} sx={root} onChange={handleChange}>
      {navLinks.map((link, i) => (
        <BottomNavigationAction
          key={`${i}_${link.label}`}
          label={link.label}
          value={link.value}
          icon={link.icon}
        />
      ))}
    </BottomNavigation>
  );
};

export default BottomNav;
