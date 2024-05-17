// 上方列表
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// 側邊欄位
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useRouter } from "next/router";
import API from "@/controller/api.js";

const HoverableElement = (props: { children: any }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const styles = {
        container: {
            whiteSpace: "nowrap",
            color: isHovered ? "#00ADB5" : "#eeeeee",
            padding: "10px",
            cursor: "pointer"
        }
    };

    return (
        <div
            style={styles.container}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {props.children}
        </div>
    );
};

export default function PageBase(props: {
    children:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | Iterable<React.ReactNode>
        | React.ReactPortal
        | Promise<React.AwaitedReactNode>
        | null
        | undefined;
}) {
    const api = new API();
    const router = useRouter();

    const items = [
        {
            category: "會員",
            details: ["個人資料", "會員列表", "新增會員"],
            url: ["/member/me", "/member", "/member/add"],
            role: [true, false, false] // 代表可否直接顯示
        },
        {
            category: "補教",
            details: ["新增分校", "分校列表"],
            url: ["/tutoring/add", "/tutoring/list"],
            role: [false, false]
        },
        {
            category: "權限",
            details: ["", "", "", ""],
            url: ["/", "/", "/", "/"],
            role: [true, false, false, false]
        }
    ];

    const [user, setUser] = React.useState();
    React.useEffect(() => {
        (async () => {
            const str = await localStorage.getItem("user");
            const data = JSON.parse(str);
            setUser(data);
        })();
    }, []);   

    return (
        <div style={style.body}>
            <div style={style.navbar}>
                {items.map((item, index) => {
                    return (
                        <Accordion
                            key={index}
                            sx={{
                                backgroundColor: "#393E46",
                                color: "#EEEEEE"
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ArrowDropDownIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <div style={{ fontSize: 20, fontWeight: 900 }}>
                                    {item.category}
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                {item.details.map((name, index) => {
                                    if (
                                        (item.role && item.role[index]) ||
                                        (user && user.role.id == 1)
                                    ) {
                                        return (
                                            <HoverableElement key={index}>
                                                <a href={item.url[index]}>
                                                    {name}
                                                </a>
                                            </HoverableElement>
                                        );
                                    }
                                })}
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
            </div>
            <div style={style.container}>
                <Box>
                    <AppBar
                        sx={{ backgroundColor: "#222831" }}
                        position="static"
                    >
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                href="/home"
                            >
                                <img
                                    src="/2019_FJBC_Logo_gary.png"
                                    alt="FJBC"
                                    width={30}
                                />
                            </IconButton>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1 }}
                            >
                                FJBC
                            </Typography>
                            <Button
                                color="inherit"
                                onClick={() => {
                                    api.Logout(router);
                                }}
                            >
                                Logout
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <div style={{ padding: "20px", width: "100%" }}>
                        {props.children}
                    </div>
                </Box>
            </div>
        </div>
    );
}

const style = {
    body: {
        display: "flex"
    },

    container: {
        width: "100%",
        minHeight: "100vh"
    },

    navbar: {
        backgroundColor: "#393E46",
        maxWidth: "300px",
        minWidth: "200px"
    },

    input: {
        padding: "8px",
        width: "100%"
    },

    loginMark: {
        display: "flex",
        justifyContent: "space-between"
    }
};
