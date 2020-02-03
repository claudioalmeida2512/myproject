import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListDocs from '../cadastros/ListDocs';
import ListaTipos from '../cadastros/ListaTipos';
import ListaFuncoes from '../cadastros/ListaFuncoes';
import ListaCargos from '../cadastros/ListaCargos';
import ListaDeparts from '../cadastros/ListaDeparts';
import ListaUsers from '../cadastros/ListaUsers';
import FormLogin from '../base/FormLogin';
import { logout } from '../../base/auth';
import { isAuthenticated,getUser } from '../../base/auth';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const options = [
  'Atualizações',
  'Usuarios',
  'Tipos de Documentos',
  'Documentos',
  'Departamentos',
  'Cargos',
  'Funções',
  
];

const caminho = [
  <></>,
  <ListaUsers />,
  <ListaTipos />,
  <ListDocs />,
  <ListaDeparts />,
  <ListaCargos />,
  <ListaFuncoes />,
   <FormLogin />,
];


export default function TopBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  
  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);

  };

  const handleMenuItemClick = (event: React.MouseEvent, index: number) => {
    setSelectedIndex(isAuthenticated() ? index : 0);
    setAnchorEl(null);
  };
  const myUser = isAuthenticated() ? "Ola ,"+getUser()+" !   " : "" ;

  const handleClose = (item) => {
    setAnchorEl(null);
  };

  const home = () => {
    setSelectedIndex(0);;
  };

  const sair = () => {
    if ( !isAuthenticated()  ) {
      setSelectedIndex(7);
    }else {
      logout();
      setSelectedIndex(0);
    }
    
  }
   

  return (
    
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon onClick={handleClick} />
          </IconButton>

          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <HomeIcon onClick={home} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            SGI
          </Typography>
          <span onClick={sair}> { myUser }
             <Button color="inherit" >{ isAuthenticated()  ? 'Logout' : 'Login'  }</Button>
          </span>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {options.map((option, index) => (
              <MenuItem
                key={option}
                disabled={index === 0}
                selected={index === selectedIndex}
                onClick={event => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
      {caminho[selectedIndex]}
    </div>
  );
}