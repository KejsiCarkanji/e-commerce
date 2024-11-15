import { useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import logo from '../../assets/evervogue-high-resolution-logo-transparent.png';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useCartContext } from '../../store/useCartContext';



export default function NavBars() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { totalProducts } = useCartContext();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['All', 'Totes', 'Backpacks', 'Clutches', 'Crossbody Bags'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => navigate('/products')}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['New arrivals', 'Best sellers', 'Sale'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider /> 
      <List>
        {['Add product', 'History'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => {
              (text === "Add product") ? navigate('/add-product') : navigate('/history')}}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      </Box>
  );

  return (
    <> 
    <Box sx={{ flexGrow: 1 }}> 
      <AppBar position="fixed" sx={{ backgroundColor: '#444' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Button
            
            sx={{ mr: 2 , flexGrow: 1 }}
            onClick={() => navigate('/')}
          >
          <img src={logo} alt='evervogue-high-resolution-logo-transparent.png' style={{width: '300px'}} />
          </Button>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <FavoriteIcon />
          </IconButton> 
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate('/cart')}
          >
            <Badge badgeContent={ totalProducts() } color="error">
            <ShoppingCartIcon />
            </Badge>
          </IconButton>        
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <PersonIcon />
          </IconButton>        
          </Toolbar>
      </AppBar>
    </Box>
    <Drawer open={open} onClose={toggleDrawer(false)}>
    {DrawerList}
  </Drawer>
  </>
  );
}