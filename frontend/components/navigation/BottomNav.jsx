import {
  AccountBalanceOutlined,
  AutoGraphOutlined,
  DashboardOutlined,
  FiberSmartRecordOutlined,
  HomeOutlined,
  MenuOutlined,
} from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import router, { useRouter } from 'next/router';
import { useState } from 'react';
import SideDrawer from '../SideDrawer';

// TODO: Change these icons for more appropriate ones if available
const navLinks = [
  {
    label: 'Token',
    link: '/token-info',
    icon: <FiberSmartRecordOutlined />,
  },
  {
    label: 'Staking',
    link: '/staking',
    icon: <AutoGraphOutlined />,
  },
  {
    label: 'Home',
    link: '/',
    icon: <HomeOutlined />,
  },
  {
    label: 'Dashboard',
    link: '/dashboard',
    icon: <DashboardOutlined />,
  },
  {
    label: 'More',
    link: '',
    icon: <MenuOutlined />,
  },
];



// Styles
const root = { position: 'fixed', bottom: -1, width: '100vw' };

const BottomNav = () => {
  const [value, setValue] = useState('/');
  const router = useRouter();

  const handleChange = (_, newValue) => {
    setValue(newValue);
    router.push(newValue);
  };

  return (
    <BottomNavigation showLabels value={value} sx={root} onChange={handleChange}>
      {navLinks.map((link, i) => (
        <BottomNavigationAction
          key={`${i}_${link.label}`}
          label={link.label}
          value={link.link}
          icon={link.icon}
        />
      ))}
    </BottomNavigation>
  );
};

export default BottomNav;
