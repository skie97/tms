import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TopicIcon from '@mui/icons-material/Topic';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import GradingIcon from '@mui/icons-material/Grading';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Home from '../Home';
import ManageCourses from '../ManageCourses';

const drawerWidth = 240;
const tempSqn = "XXX SQN"

export default function ClippedDrawer() {

  function getIcon(title: string) {
    switch(title) {
      case 'Personnel':
        return <GroupIcon/>;
      case 'Courses':
        return <TopicIcon/>;
      case 'Gradesheet Templates':
        return <AssignmentIcon/>;
      case 'Gradesheets':
        return <GradingIcon/>;
      default:
        return <></>;
    }
  }
  const navigate = useNavigate();

  const onNavi = (str: string) => {
    return navigate(`/${str}`);
  }

  const onNaviToManage = (str: string) => {
    return navigate(`/Manage${str}`);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Training Management System - {tempSqn}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Gradesheets'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => onNavi("Home")}
                >
                  <ListItemIcon>
                    {getIcon(text)}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Management Options
              </ListSubheader>
            }
          >
            {['Personnel', 'Courses', 'Gradesheet Templates'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => onNaviToManage(text)}
                >
                  <ListItemIcon>
                    {getIcon(text)}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/ManageCourses' element={<ManageCourses />} />
        </Routes>
      </Box>
    </Box>
  );
}