import * as React from "react";
// 主要頁面都一樣<獨立出來引用
import PageBase from "@/components/PageBase";
import { useRouter } from "next/router";
import API from "@/controller/api.js";

// 插件
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function Add() {
    const router = useRouter();
    const api = new API();
    // photo
    const [photo, setPhoto] = React.useState({
        view: "",
        file: {}
    });

    // user
    const [user, setUser] = React.useState({
        is_active: false,
        role_id: 1
    });
    // profile
    const [profile, setProfile] = React.useState({});

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setPhoto({
                ...photo,
                view: reader.result,
                file: file
            });
        };
        reader.readAsDataURL(file);
    };

    const handleInputChange = (event: {
        target: { name: any; value: any };
    }) => {
        const { name, value } = event.target;
        if (name === "username" || name === "password") {
            setUser({
                ...user,
                [name]: value
            });
        } else {
            setProfile({
                ...profile,
                [name]: value
            });
        }
    };

    const handleSelect = (event: { target: { value: any } }) => {
        const role_id = event.target.value;
        setUser({
            ...user,
            role_id: role_id
        });
    };

    const handleSwitch = (event: { target: { checked: any } }) => {
        const isChecked = event.target.checked;
        setUser({
            ...user,
            is_active: isChecked
        });
    };

    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();

        if (user.username && user.password) {
            profile.user_create = user;
        }
        api.AddUser(router, profile, photo.file);
    };

    return (
        <PageBase>
            <h1 style={{ marginBottom: 12 }}>新增會員</h1>
            <Card sx={{ minWidth: 275 }}>
                <CardContent sx={{ display: "flex", justifyContent: "center" }}>
                    <div>
                        <h3>會員資料</h3>
                        <div style={{ border: "1px solid" }}></div>
                        <div style={{ display: "flex" }}>
                            <div>
                                <table>
                                    <tbody>
                                        <tr style={{}}>
                                            <td>
                                                <label htmlFor="">姓氏:</label>
                                            </td>
                                            <td>
                                                <TextField
                                                    margin="normal"
                                                    id=""
                                                    label="姓氏"
                                                    name="first_name"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <label htmlFor="">名字:</label>
                                            </td>
                                            <td>
                                                <TextField
                                                    margin="normal"
                                                    id=""
                                                    label="名字"
                                                    name="last_name"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="">暱稱:</label>
                                            </td>
                                            <td>
                                                <TextField
                                                    margin="normal"
                                                    id=""
                                                    label="暱稱"
                                                    name="nick_name"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <label htmlFor="">國家:</label>
                                            </td>
                                            <td>
                                                <TextField
                                                    margin="normal"
                                                    id=""
                                                    label="國家"
                                                    name="country"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="">城市:</label>
                                            </td>
                                            <td>
                                                <TextField
                                                    margin="normal"
                                                    id=""
                                                    label="城市"
                                                    name="city"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <label htmlFor="">區域:</label>
                                            </td>
                                            <td>
                                                <TextField
                                                    margin="normal"
                                                    id=""
                                                    label="區域"
                                                    name="state"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="">
                                                    E-mail:
                                                </label>
                                            </td>
                                            <td>
                                                <TextField
                                                    margin="normal"
                                                    id=""
                                                    label="E-mail"
                                                    name="email"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <label htmlFor="">地址:</label>
                                            </td>
                                            <td>
                                                <TextField
                                                    margin="normal"
                                                    id=""
                                                    label="地址"
                                                    name="address"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="">電話:</label>
                                            </td>
                                            <td>
                                                <TextField
                                                    margin="normal"
                                                    id=""
                                                    label="電話"
                                                    name="Tel"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <h3>登入資料</h3>
                                <div style={{ border: "1px solid" }}></div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <label htmlFor="">帳號:</label>
                                            </td>
                                            <td>
                                                <TextField
                                                    margin="normal"
                                                    id=""
                                                    label="帳號"
                                                    name="username"
                                                    variant="outlined"
                                                    size="small"
                                                    placeholder="請輸入電子郵件"
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <label htmlFor="">密碼:</label>
                                            </td>
                                            <td>
                                                <TextField
                                                    margin="normal"
                                                    id=""
                                                    label="密碼"
                                                    name="password"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="">
                                                    會員權限:
                                                </label>
                                            </td>
                                            <td>
                                                <FormControl
                                                    sx={{
                                                        margin: 2,
                                                        width: "50%"
                                                    }}
                                                >
                                                    <InputLabel id="demo-simple-select-label">
                                                        會員權限
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={user.role_id}
                                                        label="會員權限"
                                                        onChange={handleSelect}
                                                    >
                                                        <MenuItem value={1}>
                                                            管理者
                                                        </MenuItem>
                                                        <MenuItem value={2}>
                                                            內部使用者
                                                        </MenuItem>
                                                        <MenuItem value={3}>
                                                            外部使用者
                                                        </MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </td>
                                            <td>
                                                <label htmlFor="">
                                                    帳號啟動:
                                                </label>
                                            </td>
                                            <td>
                                                <FormControlLabel
                                                    sx={{
                                                        margin: 2,
                                                        width: "50%"
                                                    }}
                                                    control={
                                                        <Switch
                                                            onChange={
                                                                handleSwitch
                                                            }
                                                        />
                                                    }
                                                    label={undefined}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div
                                style={{
                                    padding: "40px"
                                }}
                            >
                                <img
                                    src={
                                        photo.view == ""
                                            ? "/defaultPhoto.webp"
                                            : photo.view
                                    }
                                    alt=""
                                    width={200}
                                    height={200}
                                />
                                <div>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="success"
                    >
                        新增
                    </Button>
                </CardActions>
            </Card>
        </PageBase>
    );
}

const style = {
    title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    list: { width: "100%", background: "#ffffff" },
    rows: { display: "flex", justifyContent: "space-between" }
};
