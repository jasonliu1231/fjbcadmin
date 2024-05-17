import * as React from "react";
// 主要頁面都一樣獨立出來引用
import PageBase from "@/components/PageBase";
import { useRouter } from "next/router";
import API from "@/controller/api.js";
// 列表
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function List() {
    const api = new API();
    const router = new useRouter();

    const handleUpdate = (event) => {
        const id = event.target.value;
        router.push(`/tutoring/update?id=${id}`);
    };

    const handleInfo = (event) => {
        const id = event.target.value;
        router.push(`/tutoring/info?id=${id}`);
    };

    const [tutoring, setTutoring] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            const response = await api.getTutoringList();
            let list = [];
            response.forEach((i) => {
                list.push(i);
            });

            setTutoring(list);
        })();
    }, []);
    return (
        <PageBase>
            <h1>分校列表</h1>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    "& > :not(style)": {
                        m: 1
                    }
                }}
            >
                {tutoring.map((item, index) => (
                    <Paper elevation={10} key={index}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography
                                    sx={{ fontSize: 14 }}
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    所在地區：{item.city}
                                </Typography>
                                <Typography variant="h4" component="div">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2">
                                    分校電話：{item.Tel}
                                </Typography>
                                <Typography variant="body2">
                                    分校地址：{item.address}
                                </Typography>
                            </CardContent>
                            <CardActions
                                sx={{ justifyContent: "space-around" }}
                            >
                                <Button
                                    value={item.id}
                                    variant="contained"
                                    size="small"
                                    onClick={handleInfo}
                                >
                                    檢視分校資訊
                                </Button>
                                <Button
                                    value={item.id}
                                    color="success"
                                    variant="contained"
                                    size="small"
                                    onClick={handleUpdate}
                                >
                                    修改分校資訊
                                </Button>
                                {/* <Button
                                    color="error"
                                    variant="contained"
                                    size="small"
                                >
                                    刪除分校
                                </Button> */}
                            </CardActions>
                        </Card>
                    </Paper>
                ))}
            </Box>
        </PageBase>
    );
}
