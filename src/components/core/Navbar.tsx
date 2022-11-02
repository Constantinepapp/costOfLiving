
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { themeStore } from '../../stores/ThemeStore'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { navigationStore } from '../../stores/NavigationStore';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;


export const Navbar = observer((props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        <Button onClick={e => themeStore.toggleTheme()} key={themeStore.theme} sx={{ color: '#fff' }}>
          {themeStore.theme}
        </Button>

      </List>
    </Box>
  )


  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar component="nav" sx={{ backgroundColor: themeStore.colors.navbar, color: themeStore.colors.fontColorPrimary }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
          </IconButton>
          <div onClick={handleDrawerToggle} >Budget app</div>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >

          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button onClick={e => navigationStore.setNavigation("BudgetCalculator")} sx={{ color: themeStore.colors.fontColorPrimary }}>
              COL Calculator
            </Button>
            <Button onClick={e => navigationStore.setNavigation("Summary")} sx={{ color: themeStore.colors.fontColorPrimary }}>
              Summary
            </Button>
            <Button onClick={e => themeStore.toggleTheme()} key={themeStore.theme} sx={{ color: themeStore.colors.fontColorPrimary }}>
              {themeStore.theme}
            </Button>

          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

    </>
  )
})
