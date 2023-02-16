// External library imports - utilities before UI components

// Custom imports - hooks, utilities, components, configs, then styles

import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';


const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: +30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function Home() {


  return (
    <>
      <AppBar color="secondary" position='static'>
        <Toolbar>
          <Typography variant='h6'>
            Gradesheets
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <AddIcon />
          </IconButton>
          <IconButton color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Typography paragraph>
        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
        eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
        neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
        tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
        sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
        tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
        gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
        et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
        tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
        eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
        posuere sollicitudin aliquam ultrices sagittis orci a.
      </Typography>

    </>
  );
}