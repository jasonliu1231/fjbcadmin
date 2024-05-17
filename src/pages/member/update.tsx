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

export default function Update() {
    const router = useRouter();
    const api = new API();
    // display
    const [isShow, setIsShow] = React.useState(false);
    const [isShow2, setIsShow2] = React.useState(false);
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

    const handleIsShow = () => {
        setIsShow(true);
        setIsShow2(true);
    };

    const handleIsShow2 = () => {
        setIsShow2(true);
    };

    const handleFileChange = (event: { target: { files: any[] } }) => {
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

    const handleProfileChange = (event: {
        target: { name: any; value: any };
    }) => {
        const { name, value } = event.target;
        setProfile({
            ...profile,
            [name]: value
        });
    };

    const handleUserChange = (event: {
        target: { name: any; value: any };
    }) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value
        });
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

    async function deleteProfile(event: {
        target: { parentNode: { parentNode: { childNodes: any } } };
    }) {
        const check = confirm(`請問你確定要刪除嗎？`);
        if (check) {
            api.deleteProfile(router, profile.id, false);
        }
    }

    const handleUserSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();

        // 如果修改的部分有密碼，讓他執行密碼修改 api
        if (user.password && user.password2 && user.password == user.password2) {
            api.ChangePassword(router, user, user.id);
        }

        // 執行使用者修改
        api.updateUser(router, user, user.id);
    };

    const handleProfileSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();

        // 照片有更新，執行修改照片 api
        if (photo.file !== "") {
            api.postPhoto(photo.file, profile.id);
        }

        // 執行會員修改
        api.updateProfile(profile.id, profile);
    };

    React.useEffect(() => {
        (async () => {
            const url = new URLSearchParams(window.location.search);
            const id = url.get("id");
            const response = await api.getProfile(id);
            const resPhoto = await api.getPhoto(id);
            if (resPhoto.byteLength !== 0) {
                const p = Buffer.from(resPhoto, "binary").toString("base64");
                setPhoto({
                    ...photo,
                    view: "data:/image/png;base64," + p
                });
            }
            setProfile(response);
            setUser(response.user);
        })();
    }, []);

    return (
        <PageBase>
            <h1 style={{ marginBottom: 12 }}>會員明細</h1>
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
                                                    onChange={handleProfileChange}
                                                    value={
                                                        profile.first_name || ""
                                                    }
                                                    focused={
                                                        !!profile.first_name
                                                    }
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
                                                    onChange={handleProfileChange}
                                                    value={
                                                        profile.last_name || ""
                                                    }
                                                    focused={
                                                        !!profile.last_name
                                                    }
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
                                                    onChange={handleProfileChange}
                                                    value={
                                                        profile.nick_name || ""
                                                    }
                                                    focused={
                                                        !!profile.nick_name
                                                    }
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
                                                    onChange={handleProfileChange}
                                                    value={
                                                        profile.country || ""
                                                    }
                                                    focused={!!profile.country}
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
                                                    onChange={handleProfileChange}
                                                    value={profile.city || ""}
                                                    focused={!!profile.city}
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
                                                    onChange={handleProfileChange}
                                                    value={profile.state || ""}
                                                    focused={!!profile.state}
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
                                                    onChange={handleProfileChange}
                                                    value={profile.email || ""}
                                                    focused={!!profile.email}
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
                                                    onChange={handleProfileChange}
                                                    value={
                                                        profile.address || ""
                                                    }
                                                    focused={!!profile.address}
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
                                                    onChange={handleProfileChange}
                                                    value={profile.Tel || ""}
                                                    focused={!!profile.Tel}
                                                />
                                            </td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button
                                                    onClick={handleProfileSubmit}
                                                    variant="contained"
                                                    color="success"
                                                >
                                                    修改會員資料
                                                </Button>
                                            </td>
                                            <td>
                                                <Button
                                                    onClick={deleteProfile}
                                                    variant="contained"
                                                    color="error"
                                                >
                                                    刪除會員資料
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <h3>登入資料</h3>
                                <div style={{ border: "1px solid" }}></div>
                                {isShow || (user && user.username) ? (
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <label htmlFor="">
                                                        帳號:
                                                    </label>
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
                                                        onChange={
                                                            handleUserChange
                                                        }
                                                        value={
                                                            user &&
                                                            user.username
                                                        }
                                                        focused={
                                                            user &&
                                                            !!user.username
                                                        }
                                                    />
                                                </td>
                                                <td></td>
                                                <td>
                                                    {user && user.username && (
                                                        <Button
                                                            onClick={
                                                                handleIsShow2
                                                            }
                                                            variant="contained"
                                                            color="info"
                                                        >
                                                            修改密碼
                                                        </Button>
                                                    )}
                                                </td>
                                            </tr>
                                            <tr
                                                style={{
                                                    display: isShow2
                                                        ? ""
                                                        : "none"
                                                }}
                                            >
                                                <td>
                                                    <label htmlFor="">
                                                        {user && user.username
                                                            ? "修改密碼："
                                                            : "新增密碼："}
                                                    </label>
                                                </td>
                                                <td>
                                                    <TextField
                                                        margin="normal"
                                                        id=""
                                                        label={
                                                            user &&
                                                            user.username
                                                                ? "修改密碼："
                                                                : "新增密碼："
                                                        }
                                                        name="password"
                                                        variant="outlined"
                                                        size="small"
                                                        onChange={
                                                            handleUserChange
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <label htmlFor="">
                                                        確認密碼:
                                                    </label>
                                                </td>
                                                <td>
                                                    <TextField
                                                        margin="normal"
                                                        id=""
                                                        label="確認密碼"
                                                        name="password2"
                                                        variant="outlined"
                                                        size="small"
                                                        onChange={
                                                            handleUserChange
                                                        }
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
                                                            onChange={
                                                                handleSelect
                                                            }
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
                                                                checked={
                                                                    user &&
                                                                    user.is_active
                                                                }
                                                            />
                                                        }
                                                        label={undefined}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Button
                                                        onClick={
                                                            handleUserSubmit
                                                        }
                                                        variant="contained"
                                                        color="success"
                                                    >
                                                        修改使用者
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                ) : (
                                    <div style={{ marginTop: 5 }}>
                                        <Button
                                            onClick={handleIsShow}
                                            variant="contained"
                                            color="info"
                                        >
                                            新增使用者
                                        </Button>
                                    </div>
                                )}
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
                <CardActions sx={{ justifyContent: "center" }}></CardActions>
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
