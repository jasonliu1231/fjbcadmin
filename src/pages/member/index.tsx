import * as React from "react";
// 主要頁面都一樣<獨立出來引用
import PageBase from "@/components/PageBase";
import Box from "@mui/material/Box";
// 圖表
import { DataGrid } from "@mui/x-data-grid";
import API from "@/controller/api.js";

import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { json } from "stream/consumers";

export default function Index() {
    const columns = [
        { field: "id", headerName: "ID", width: 10 },
        { field: "first_name", headerName: "姓氏", width: 70 },
        { field: "last_name", headerName: "名字", width: 70 },
        { field: "nick_name", headerName: "暱稱", width: 70 },
        { field: "Tel", headerName: "電話", width: 70 },
        { field: "country", headerName: "國家", width: 70 },
        { field: "city", headerName: "縣市", width: 70 },
        {
            field: "address",
            headerName: "地址",
            width: 150
        },
        {
            field: "email",
            headerName: "電子郵件",
            width: 150
        },
        {
            field: "setting",
            headerName: "控制選項",
            width: 200,
            renderCell: () => {
                return <SettingBtn />;
            }
        }
    ];
    const api = new API();
    const router = useRouter();

    const updateProfile = async (event: {
        target: { parentNode: { parentNode: { childNodes: any } } };
    }) => {
        const e = event.target.parentNode.parentNode.childNodes;
        const id = e[1].textContent;
        router.push("/member/update?id=" + id);
    };

    async function deleteProfile(event: {
        target: { parentNode: { parentNode: { childNodes: any } } };
    }) {
        const e = event.target.parentNode.parentNode.childNodes;
        const id = e[1].textContent;
        const check = confirm(`請問你確定刪除 ID${id} 嗎？`);
        if (check) {
            api.deleteProfile(router, id, true);
        }
    }

    const SettingBtn = () => (
        <>
            <Button
                sx={{ margin: 1 }}
                variant="contained"
                color="success"
                size="small"
                onClick={updateProfile}
            >
                修改
            </Button>
            <Button
                sx={{ margin: 1 }}
                variant="contained"
                color="error"
                size="small"
                onClick={deleteProfile}
            >
                刪除
            </Button>
        </>
    );

    const [pid, setPid] = React.useState();
    const [list, setList] = React.useState({});
    const [search, setSearch] = React.useState("");
    const [rows, setRows] = React.useState([]);
    const [originRows, setOriginRows] = React.useState([]);

    const handleSearchChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setSearch(event.target.value);
    };

    const handleClickSearch = () => {
        let data: React.SetStateAction<never[]> = [];
        rows.forEach((item, index) => {
            if (item.name == search) {
                data.push(item);
            }
        });
        console.log(!search, originRows);
        if (!search) {
            setRows(originRows);
        } else {
            setRows(data);
        }
    };

    React.useEffect(() => {
        (async () => {
            const user = await JSON.parse(localStorage.getItem("user"));
            setPid(user.id);
            const response = await api.getProfileList();
            setList(response);
        })();
    }, []);

    React.useEffect(() => {
        let r = [];
        Object.keys(list).length != 0 &&
            list.forEach((item) => {
                if (item) {
                    // 检查 item.profile 是否存在
                    const listItem = {
                        id: item.id,
                        first_name: item.first_name,
                        last_name: item.last_name,
                        nick_name: item.nick_name,
                        tel: item.Tel,
                        address: item.address,
                        city: item.city,
                        country: item.country,
                        email: item.email,
                        state: item.state
                    };
                    if (pid !== item.id) {
                        r.push(listItem);
                    }
                }
            });
        setRows(r);
        setOriginRows(r);
    }, [list]);

    return (
        <PageBase>
            <div style={style.title}>
                <h1 style={{ marginBottom: 12 }}>會員列表</h1>
                <Box>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="搜尋會員"
                        inputProps={{ "aria-label": "search memner" }}
                        value={search}
                        onChange={handleSearchChange}
                    />
                    <IconButton
                        onClick={handleClickSearch}
                        type="button"
                        sx={{ p: "10px" }}
                        aria-label="search"
                    >
                        <SearchIcon />
                    </IconButton>
                </Box>
            </div>
            {rows.length != 0 && (
                <div style={style.list}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 }
                            }
                        }}
                    />
                </div>
            )}
        </PageBase>
    );
}

const style = {
    title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    list: { width: "100%", background: "#ffffff" }
};
