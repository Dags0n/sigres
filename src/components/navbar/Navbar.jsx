import * as React from 'react';
import {
  styled,
} from '@mui/material/styles';
import {
  Box,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  Typography,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar
} from '@mui/material';
import {
  Menu as MenuIcon,
} from '@mui/icons-material';

import LogoSigres from '../../assets/logo-sigres.png';
import CaraTranquilo from '../../assets/cara-tranquilo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import {
  faAnglesLeft,
  faBasketShopping,
  faGear,
  faHouseChimney,
  faListCheck,
  faStore,
  faUsers,
  faUsersGear,
} from '@fortawesome/free-solid-svg-icons';
import { faFileClipboard } from '@fortawesome/free-regular-svg-icons';
import { NavLink } from 'react-router-dom';

const drawerWidth = 200;

const hiddenPages = ['Chat', 'Adicionar Usuário', 'Usuário', 'Adicionar Produto', 'Produto'];

const pages = [
  {
    title: 'Início',
    url: '/',
    icon: faHouseChimney,
  },
  {
    title: 'Produtos',
    url: '/products',
    icon: faBasketShopping,
  },
  {
    title: 'Adicionar Produto',
    url: '/products/add',
    icon: faBasketShopping,
  },
  {
    title: 'Produto',
    url: '/products/info',
    icon: faBasketShopping,
  },
  {
    title: 'Mesas',
    url: '/tables',
    icon: faUsers,
  },
  {
    title: 'Relatórios',
    url: '/reports',
    icon: faFileClipboard,
  },
  {
    title: 'Estoque',
    url: '/stock',
    icon: faStore,
  },
  {
    title: 'Pedidos',
    url: '/orders',
    icon: faListCheck,
  },
  {
    title: 'Usuários',
    url: '/users',
    icon: faUsersGear,
  },
  {
    title: 'Adicionar Usuário',
    url: '/users/add',
    icon: faUsersGear,
  },
  {
    title: 'Usuário',
    url: '/users/info',
    icon: faUsersGear,
  },
  {
    title: 'Configurações',
    url: '/settings',
    icon: faGear,
  },
  {
    title: 'Chat',
    url: '/chat',
    icon: faFacebookMessenger,
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#2E2E48',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: '#2E2E48',
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const StyledImg = styled('img')(({ open }) => ({
  height: '50px',
  width: '70px',
  display: open ? 'block' : 'none',
  alignSelf: 'center',
  marginBottom: 20,
}));

const StyledTypography = styled(Typography)(({ open }) => ({
  px: 2,
  display: open ? 'flex' : 'none',
  flexDirection: 'column',
  textAlign: 'center',
  fontFamily: '"Press Start 2P", sans-serif',
  fontSize: 14,
  marginTop: '-35px',
  color: 'white',
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
  backgroundColor: '#2E2E48',
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function MiniDrawer(content) {
  const [open, setOpen] = React.useState(true);
  content = content.children;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[{ marginRight: 5 }, open && { display: 'none' }]}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            flexGrow={1}
            fontWeight={900}
            fontSize={24}
            fontFamily="Poppins"
          >
            {pages.find(page => window.location.pathname === page.url).title}
          </Typography>
          <NavLink
            key='Chat'
            to='/chat'
            disablePadding
          >
              <FontAwesomeIcon icon={faFacebookMessenger} color="white" style={{ height: 25 }} />
              <span style={{ fontSize: 'smaller', color: 'red', verticalAlign: '-2px' }}>2</span>
          </NavLink>
          <NavLink
            key='Configurações'
            to='/settings'
            disablePadding
          >
            <Avatar alt="User" src={CaraTranquilo} sx={{ width: 55, height: 55, marginLeft: 2 }} />
          </NavLink>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <FontAwesomeIcon icon={faAnglesLeft} color="white" />
          </IconButton>
        </DrawerHeader>
        <StyledTypography variant="h6" open={open}>
          SIG<span>RES</span>
        </StyledTypography>
        <StyledImg src={LogoSigres} alt="Logo Sigres" open={open} />
        <List>
          {pages.filter((page) => (!hiddenPages.includes(page.title))).map((page) => (
            <NavLink
              key={page.title}
              to={page.url}
              disablePadding
              style={({ isActive }) => ({
                borderLeft: isActive ? '5px solid #7E73FF' : '',
                display: 'block',
                textDecoration: 'none'
              })}
            >
              <ListItemButton
                sx={{ minHeight: 48, px: 2.5, justifyContent: open ? '' : 'center' }}
              >
                <ListItemIcon
                  sx={{ minWidth: 0, justifyContent: 'center', mr: open ? 3 : 'auto' }}
                >
                  <FontAwesomeIcon icon={page.icon} color="white" height={20} />
                </ListItemIcon>
                <ListItemText
                  primary={page.title}
                  sx={{ opacity: open ? 1 : 0, color: 'white' }}
                />
              </ListItemButton>
            </NavLink>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {content}
      </Box>
    </Box>
  );
}
