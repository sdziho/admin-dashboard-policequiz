import React from "react";
import { AppBar } from "react-admin";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  title: {
    flex: 1,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    marginLeft: -10,
  },
  spacer: {
    flex: 1,
  },
  logo: {
    maxWidth: "55px",
    margin: "0 auto",
  },
  toolbar: {
    width: "90%",
    height: "40px",
  },
});

const CustomAppBar = (props) => {
  const classes = useStyles();
  return (
    <AppBar {...props} color="secondary">
      <Toolbar className={classes.toolbar}>
        <img
          src="https://i.imgur.com/MBwrQY7.png"
          alt="logo"
          className={classes.logo}
        />
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
