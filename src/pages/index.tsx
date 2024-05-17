import * as React from "react";
import { useRouter } from "next/router";
import API from "@/controller/api.js";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Index() {
  const router = useRouter();
  const api = new API();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleUsernameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div style={style.body}>
      <Card sx={{ maxWidth: 350, maxHeight: 800 }}>
        <CardMedia
          component="img"
          alt="FJBC"
          image="/2019_FJBC_Logo_gary.png"
          sx={{ padding: "8px" }}
        />
        <CardContent>
          <div style={style.input}>
            <TextField
              label="信箱"
              variant="outlined"
              fullWidth
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div style={style.input}>
            <FormControl
              value={password}
              onChange={handlePasswordChange}
              fullWidth
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                密碼
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="password"
              />
            </FormControl>

          </div>
          {/* <div style={style.loginMark}>
            <label>
              <Checkbox defaultChecked />
              {"記住密碼"}
            </label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link href="/loginfo/resetpsword">忘記密碼?</Link>
            </div>
          </div> */}
        </CardContent>
        <CardActions>
          <div style={style.input}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => api.Login(router, username, password)}
            >
              登入
            </Button>
          </div>
        </CardActions>
      </Card>
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
