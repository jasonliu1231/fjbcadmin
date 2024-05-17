import * as React from "react";
// 主要頁面都一樣獨立出來引用
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
    const api = new API();
    const router = useRouter();

    const [tutoring, setTutoring] = React.useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTutoring({
            ...tutoring,
            [name]: value
        });
    };

    const handleSubmit = () => {
        api.addTutoring(router, tutoring);
    };

    return (
        <PageBase>
            <h1 style={{ marginBottom: 12 }}>新增分校</h1>
            <Card sx={{ minWidth: 275 }}>
                <CardContent sx={{ display: "flex", justifyContent: "center" }}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label htmlFor="">分校名稱:</label>
                                </td>
                                <td>
                                    <TextField
                                        margin="normal"
                                        id=""
                                        label="分校名稱"
                                        name="name"
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
                        </tbody>
                    </table>
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
