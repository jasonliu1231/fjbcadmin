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

export default function Me() {
    const router = useRouter();
    const api = new API();
    const [isShow, setIsShow] = React.useState(false);
    const [isCreate, setIsCreate] = React.useState(false);
    // photo
    const [photo, setPhoto] = React.useState({
        view: "",
        file: {}
    });
    // profile
    const [profile, setProfile] = React.useState({});
    // user
    const [user, setUser] = React.useState({});

    const handleIsShow = () => {
        setIsShow(true);
    };

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
        if (name === "current_password" || name === "new_password") {
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

    const handleUserSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();

        // 如果修改的部分有密碼，讓他執行密碼修改 api
        if (user.current_password && user.new_password) {
            api.ChangePasswordMine(router, user);
        }
    };

    const handleProfileSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();

        // 照片有更新，執行修改照片 api
        if (photo.file !== "") {
            api.postPhotoMine(photo.file);
        }

        // 執行會員修改
        console.log(isCreate)
        if (isCreate) {
            api.addMin(profile);
        } else {
            api.updateMin(profile);
        }
    };

    React.useEffect(() => {
        (async () => {
            // user
            const resUser = await api.getUserMine();
            setUser(resUser);
            // photo
            const resPhoto = await api.getPhotoMine();
            if (resPhoto.byteLength !== 0) {
                const p = Buffer.from(resPhoto, "binary").toString("base64");
                setPhoto({
                    ...photo,
                    view: "data:/image/png;base64," + p
                });
            }
            // profile
            const resProfile = await api.getProfileMine();
            if (Object.keys(resProfile).length === 0) {
                setIsCreate(true);
            }
            setProfile(resProfile);
        })();
    }, []);

    return (
        <PageBase>
            <h1 style={{ marginBottom: 12 }}>個人資料</h1>
            <Card sx={{ minWidth: 275 }}>
                <CardContent sx={{ display: "flex", justifyContent: "center" }}>
                    <div>
                        <h3>會員資料</h3>
                        <div style={{ border: "1px solid" }}></div>
                        <div style={{ display: "flex" }}>
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
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
                                                    onChange={handleInputChange}
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
                                                    onChange={handleInputChange}
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
                                                    onChange={handleInputChange}
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
                                                    onChange={handleInputChange}
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
                                                    onChange={handleInputChange}
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
                                                    onChange={handleInputChange}
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
                                                    onChange={handleInputChange}
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
                                                    onChange={handleInputChange}
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
                                                    onClick={
                                                        handleProfileSubmit
                                                    }
                                                    variant="contained"
                                                    color="success"
                                                >
                                                    修改會員資料
                                                </Button>
                                            </td>
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
                                                    label="無法修改"
                                                    name="username"
                                                    variant="outlined"
                                                    size="small"
                                                    color="error"
                                                    placeholder="請輸入電子郵件"
                                                    onChange={handleInputChange}
                                                    value={user.username || ""}
                                                    focused={!!user.username}
                                                    InputProps={{
                                                        readOnly: true
                                                    }}
                                                />
                                            </td>
                                            <td></td>
                                            <td>
                                                <Button
                                                    onClick={handleIsShow}
                                                    variant="contained"
                                                    color="info"
                                                >
                                                    修改密碼
                                                </Button>
                                            </td>
                                        </tr>
                                        <tr
                                            style={{
                                                display: isShow ? "" : "none"
                                            }}
                                        >
                                            <td>
                                                <label htmlFor="">
                                                    舊密碼:
                                                </label>
                                            </td>
                                            <td>
                                                <TextField
                                                    margin="normal"
                                                    id=""
                                                    label="舊密碼"
                                                    name="current_password"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <label htmlFor="">
                                                    新密碼:
                                                </label>
                                            </td>
                                            <td>
                                                <TextField
                                                    margin="normal"
                                                    id=""
                                                    label="新密碼"
                                                    name="new_password"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button
                                                    onClick={handleUserSubmit}
                                                    variant="contained"
                                                    color="success"
                                                >
                                                    修改使用者
                                                </Button>
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
