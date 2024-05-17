import Common from "@/controller/common.js";
const common = new Common();
const host = "http://172.16.150.25:8080/api";

function getToken() {
    let token;
    if (typeof window.localStorage !== "undefined") {
        // 可以安全地使用 localStorage
        // 這裡放置與 localStorage 相關的程式碼
        token = localStorage.getItem("access_token");
    } else {
        console.error("This browser does not support localStorage.");
        token = getToken();
    }
    return token;
}

function getRefreshToken() {
    let token;
    if (typeof window.localStorage !== "undefined") {
        // 可以安全地使用 localStorage
        // 這裡放置與 localStorage 相關的程式碼
        token = localStorage.getItem("refresh_token");
    } else {
        console.error("This browser does not support localStorage.");
        token = getRefreshToken();
    }
    return token;
}

export default class API {
    /*  AUTH 登入相關
        URL: /api/auth/...
    */

    // 登入
    async Login(router, user, psword) {
        if (user === "" || psword === "") {
            alert("帳號密碼請勿空白!");
            return;
        }

        let formData = new URLSearchParams();
        formData.append("username", user);
        formData.append("password", psword);
        const url = `${host}/auth/login`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.detail);
            }
            const data = await response.json();
            // 紀錄資訊
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            localStorage.setItem("user", JSON.stringify(data.user));
            const allow = data.user.role.id != 3;
            if (allow) {
                router.push("/home");
            } else {
                router.push("/");
            }
        } catch (error) {
            const msg = common.ErrorMsg(error.message);
            alert(error.message);
        }
    }

    // 登出
    async Logout(router) {
        const token = await getToken();
        const url = `${host}/auth/logout`;
        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                if (response.status == 403) {
                    await RefreshToken();
                    await Logout(router);
                }
            } else {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("profile");

                router.push("/");
            }
        } catch (error) {
            console.error(
                "There was a problem with your fetch operation:",
                error
            );
        }
    }

    // 刷新 OAuth2 驗證
    async RefreshToken() {
        const refresh_token = await getRefreshToken();
        const url = `${host}/auth/new_access_token`;
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${refresh_token}`
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail);
            }

            console.log("重新取得TOKEN");
            localStorage.setItem("access_token", data.access_token);
            return data;
        } catch (error) {
            console.log(error.message);
        }
    }

    // 修改密碼
    async ChangePasswordMine(router, user) {
        let access_token = await getToken();
        let refresh_token = await getRefreshToken();
        const url = `${host}/auth/change_password`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(user)
        };
        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            if (response.status === 403) {
                access_token = await this.RefreshToken(refresh_token);
                this.ChangePasswordMine(router, user);
            } else {
                const msg = common.ErrorMsg(data.detail);
                console.log(data.detail);
            }
        } else {
            router.push("/");
        }
    }

    // 修改本人使用者
    async getUserMine() {
        const url = `${host}/user/me`;
        let access_token = await getToken();
        let user = {};
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${access_token}`
            }
        };
        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) {
            if (response.status === 403) {
                access_token = await this.RefreshToken();
                user = await this.getUserMine();
            } else {
                const msg = common.ErrorMsg(data.detail);
                console.log(msg);
            }
        } else {
            user = data;
        }

        return user;
    }

    // 修改指定使用者
    async updateUser(router, user, id) {
        const url = `${host}/user/${id}`;
        let access_token = await getToken();
        let refresh_token = await getRefreshToken();
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(user)
        };
        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            if (response.status === 403) {
                access_token = await this.RefreshToken(refresh_token);
                this.updateUser(router, user, id);
            } else {
                const msg = common.ErrorMsg(data.detail);
                console.log(data.detail);
            }
        } else {
            window.location.reload();
        }
    }

    // 修改指定使用者密碼
    async ChangePassword(router, user, id) {
        let access_token = await getToken();
        let refresh_token = await getRefreshToken();
        const url = `${host}/auth/change_password/${id}`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(user)
        };
        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            if (response.status === 403) {
                access_token = await this.RefreshToken(refresh_token);
                this.ChangePassword(router, user, id);
            } else {
                const msg = common.ErrorMsg(data.detail);
                console.log(data.detail);
            }
        } else {
            window.location.reload();
        }
    }

    /*  profile 會員相關
        URL: /api/profile/...
    */

    // 新增會員
    async AddUser(router, profile, photoFile) {
        const url = `${host}/profile`;
        let access_token = await getToken();
        let refresh_token = await getRefreshToken();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(profile)
        };
        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            if (response.status === 403) {
                access_token = await this.RefreshToken(refresh_token);
                this.AddUser(router, profile, photoFile);
            } else {
                const msg = common.ErrorMsg(data.detail);
                console.log(data.detail);
            }
        } else {
            console.log(data);
            this.postPhoto(photoFile, data.id);
            router.push("/member");
        }
    }

    // 會員列表
    async getProfileList() {
        let access_token = await getToken();
        let userList = {};
        const url = `${host}/profile`;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            }
        };
        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) {
            if (response.status === 403) {
                access_token = await this.RefreshToken();
                userList = await this.getProfileList();
            } else {
                const msg = common.ErrorMsg(data.detail);
                console.log(msg);
            }
        } else {
            userList = data.profiles;
        }

        return userList;
    }

    // 取得自己的會員資訊
    async getProfileMine() {
        const url = `${host}/profile/me`;
        let access_token = await getToken();
        let profile = {};
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${access_token}`
            }
        };
        const response = await fetch(url, options);
        const text = await response.text();
        if (!response.ok) {
            if (response.status === 403) {
                access_token = await this.RefreshToken();
                profile = await this.getProfileMine();
            } else {
                const msg = common.ErrorMsg(data.detail);
                console.log(msg);
            }
        } else {
            if (text.trim().length > 0) {
                profile = await JSON.parse(text);
            }
        }

        return profile;
    }

    // 取得自己頭像
    async getPhotoMine() {
        const url = `${host}/profile/photo/me`;
        let access_token = await getToken();
        let file;
        const options = {
            method: "GET",
            responseType: "arraybuffer",
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        };
        const response = await fetch(url, options);
        const data = await response.arrayBuffer();
        if (!response.ok) {
            if (response.status === 403) {
                access_token = await this.RefreshToken();
                file = await this.getMine();
            } else {
                const msg = common.ErrorMsg(data.detail);
                console.log(msg);
            }
        } else {
            file = data;
        }

        return file;
    }

    // 新增個人頭像
    async postPhotoMine(file) {
        const url = `${host}/profile/photo/me`;
        let access_token = await getToken();
        let formData = new FormData();
        formData.append("file", file);
        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            body: formData
        };
        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) {
            if (response.status === 403) {
                access_token = await this.RefreshToken();
                await this.postPhotoMine(file);
            } else {
                const msg = common.ErrorMsg(data.detail);
                console.log(msg);
            }
        } else {
            window.location.reload();
        }
    }

    // 修改自己的會員資訊
    async updateMin(profile) {
        const url = `${host}/profile/me`;
        let access_token = await getToken();
        let refresh_token = await getRefreshToken();
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(profile)
        };
        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            if (response.status === 403) {
                access_token = await this.RefreshToken(refresh_token);
                this.updateMin(profile);
            } else {
                const msg = common.ErrorMsg(data.detail);
                console.log(data.detail);
            }
        } else {
            window.location.reload();
        }
    }

    // 新增自己的會員資訊
    async addMin(profile) {
        const url = `${host}/profile/me`;
        let access_token = await getToken();
        let refresh_token = await getRefreshToken();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(profile)
        };
        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            if (response.status === 403) {
                access_token = await this.RefreshToken(refresh_token);
                this.addMin(profile);
            } else {
                const msg = common.ErrorMsg(data.detail);
                console.log(data.detail);
            }
        } else {
            window.location.reload();
        }
    }

    // 取得指定會員資訊
    async getProfile(id) {
        const url = `${host}/profile/${id}`;
        let access_token = await getToken();
        let profile = {};
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${access_token}`
            }
        };
        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) {
            if (response.status === 403) {
                access_token = await this.RefreshToken();
                profile = await this.getProfile(id);
            } else {
                const msg = common.ErrorMsg(data.detail);
                console.log(msg);
            }
        } else {
            profile = data;
        }

        return profile;
    }

    // 取得指定頭像
    async getPhoto(id) {
        const url = `${host}/profile/photo/${id}`;
        let access_token = await getToken();
        let file;
        const options = {
            method: "GET",
            responseType: "arraybuffer",
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        };
        const response = await fetch(url, options);
        const data = await response.arrayBuffer();
        if (!response.ok) {
            if (response.status === 403) {
                access_token = await this.RefreshToken();
                file = await this.getPhoto(id);
            } else {
                const msg = common.ErrorMsg(data.detail);
                console.log(msg);
            }
        } else {
            file = data;
        }

        return file;
    }

    // 新增指定頭像
    async postPhoto(file, id) {
        const url = `${host}/profile/photo/${id}`;
        let access_token = await getToken();
        let formData = new FormData();
        formData.append("file", file);
        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            body: formData
        };
        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) {
            if (response.status === 403) {
                access_token = await this.RefreshToken();
                await this.postPhoto(file, id);
            } else {
                const msg = common.ErrorMsg(data.detail);
                console.log(msg);
            }
        } else {
            window.location.reload();
        }
    }

    // 刪除指定會員資訊
    async deleteProfile(router, id, needreset) {
        const url = `${host}/profile/${id}`;
        let access_token = await getToken();
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${access_token}`
            }
        };
        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) {
            if (response.status === 403) {
                access_token = await this.RefreshToken();
                await this.deleteProfile(router, id);
            } else {
                const msg = common.ErrorMsg(data.detail);
                console.log(msg);
            }
        } else {
            // 如果同頁面不會重新刷新直接重新載入畫面
            if (needreset) {
                window.location.reload();
            } else {
                router.push("/member");
            }
        }
    }

    // 修改會員資訊
    async updateProfile(id, profile) {
        const url = `${host}/profile/${id}`;
        let access_token = await getToken();
        let refresh_token = await getRefreshToken();
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(profile)
        };
        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            if (response.status === 403) {
                access_token = await this.RefreshToken(refresh_token);
                this.updateProfile(profile);
            } else {
                const msg = common.ErrorMsg(data.detail);
                console.log(data.detail);
            }
        } else {
            window.location.reload();
        }
    }

    /*  tutoring 分校相關
        URL: /api/tutoring/...
    */

    // 新增分校
    async addTutoring(router, tutoring) {
        const url = `${host}/tutoring`;
        let access_token = await getToken();
        let refresh_token = await getRefreshToken();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(tutoring)
        };
        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            if (response.status === 403) {
                access_token = await this.RefreshToken(refresh_token);
                this.addTutoring(router, tutoring);
            } else {
                const msg = common.ErrorMsg(data.detail);
                console.log(data.detail);
            }
        } else {
            router.push("/tutoring/list");
        }
    }

    // 取得分校列表
    async getTutoringList() {
        let access_token = await getToken();
        let list = {};
        const url = `${host}/tutoring`;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            }
        };
        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) {
            if (response.status === 403) {
                access_token = await this.RefreshToken();
                list = await this.getTutoringList();
            } else {
                const msg = common.ErrorMsg(data.detail);
                console.log(msg);
            }
        } else {
            list = data.tutorings;
        }

        return list;
    }

    // 取得分校資訊
    async getTutoring(id) {
        let access_token = await getToken();
        let list = {};
        const url = `${host}/tutoring/${id}`;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            }
        };
        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) {
            if (response.status === 403) {
                access_token = await this.RefreshToken();
                list = await this.getTutoring();
            } else {
                const msg = common.ErrorMsg(data.detail);
                console.log(msg);
            }
        } else {
            list = data;
        }

        return list;
    }

    // 更新分校資訊
    async updateTutoring(id, router, tutoring) {
        const url = `${host}/tutoring/${id}`;
        let access_token = await getToken();
        let refresh_token = await getRefreshToken();
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(tutoring)
        };
        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            if (response.status === 403) {
                access_token = await this.RefreshToken(refresh_token);
                this.updateTutoring(id, router, tutoring);
            } else {
                const msg = common.ErrorMsg(data.detail);
                console.log(data.detail);
            }
        } else {
            router.push("/tutoring/list");
        }
    }

    // 刪除分校
    async deleteTutoring(id, router) {
        const url = `${host}/tutoring/${id}`;
        let access_token = await getToken();
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${access_token}`
            }
        };
        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) {
            if (response.status === 403) {
                access_token = await this.RefreshToken();
                await this.deleteProfile(router, id);
            } else {
                const msg = common.ErrorMsg(data.detail);
                console.log(msg);
            }
        } else {
            router.push("/tutoring/list");
        }
    }

    /*  grade 課程相關
        URL: /api/grade/...
    */
}
