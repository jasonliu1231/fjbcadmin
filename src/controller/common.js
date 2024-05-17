export default class Common {

  ErrorMsg(msg) {
    let errorMsg = "";
    switch (msg) {
      // AUTO
      case "Incorrect email or password":
        errorMsg = "帳號密碼錯誤!";
        break;
      case "Inactive user":
        errorMsg = "帳號未啟用!";
        break;
      case "Inactive user":
        errorMsg = "帳號失效,需重新登入!";
        break;
      case "Could not validate credentials":
        errorMsg = "Refresh憑證驗證失敗,需重新登入!";
        break;
      case "Refresh token invalid":
        errorMsg = "Refresh憑證失效,,需重新登入!";
        break;
      case "User not found":
        errorMsg = "帳號失效,需重新登入!";
        break;
      case "Inactive user":
        errorMsg = "帳號未啟用,需重新登入!";
        break;
      case "Incorrect token":
        errorMsg = "Refresh憑證錯誤,需重新登入!";
        break;
      case "New Password should be different that the current one":
        errorMsg = "密碼錯誤!";
        break;
      case "Incorrect email or password":
        errorMsg = "新密碼不可和舊密碼相同!";
        break;
      // USER
      case "Email is already registered":
        errorMsg = "帳號密碼錯誤!";
        break;
      case "Incorrect email or password":
        errorMsg = "e-mail已經被註冊過!";
        break;
      case "create User fail":
        errorMsg = "註冊失敗!";
        break;
      case "User not found":
        errorMsg = "註冊失敗!";
        break;
      case "create User fail":
        errorMsg = "查無此帳號!";
        break;
      // 有變數，想一下如何處理
      case "Role '{roles}' is required for this action":
        errorMsg = "帳號沒有權限，無法使用API!";
        break;
    }
    return errorMsg;
  }
}
