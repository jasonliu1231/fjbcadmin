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
import Link from "next/link";

export default function Info() {
    const api = new API();

    const [tutoringId, setTutoringId] = React.useState();
    const [info, setInfo] = React.useState({});
    React.useEffect(() => {
        (async () => {
            const url = new URLSearchParams(window.location.search);
            const id = url.get("id");
            const response = await api.getTutoring(id);
            setTutoringId(id);
            setInfo(response);
        })();
    }, []);

    return (
        <PageBase>
            <div>
                <h1>{info.name}</h1>
            </div>
        </PageBase>
    );
}
