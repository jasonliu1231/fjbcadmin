import * as React from "react";
import { ChangeEvent, MouseEvent, ReactNode, useContext, useState } from 'react'
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Link from 'next/link';

export default function Login() {
  return (
    <div style={style.body}>
        123
    </div>
  );
}

const style = {
  body: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    padding: "8px",
    width: "100%",
  },

  loginMark: {
    display: "flex",
    justifyContent: "space-between",
  },
};
