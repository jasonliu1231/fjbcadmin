import "@/styles/globals.css";
import { useRouter } from "next/router";
import { AppProps } from "next/app";
import * as React from "react";

const App = ({
    Component,
    pageProps
}: AppProps & { isAuthenticated: boolean }) => {
    const router = useRouter();

    React.useEffect(() => {
        const access_token = localStorage.getItem("access_token");
        // 如果用戶未通過驗證且不在登入頁面，導航到登入頁面
        if (access_token == null && router.pathname !== "/") {
            router.push("/");
        }
    }, []);

    React.useEffect(() => {
        const handleBeforeUnload = () => {
            if (!isRefreshingPage()) {
                // localStorage.removeItem("access_token");
                // localStorage.removeItem("refresh_token");
                // localStorage.removeItem("profile");
            }
        };

        const handleUnload = () => {};

        const isRefreshingPage = () => {
            return (
                performance.navigation.type ===
                performance.navigation.TYPE_RELOAD
            );
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("unload", handleUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("unload", handleUnload);
        };
    }, []);

    return <Component {...pageProps} />;
};

export default App;
