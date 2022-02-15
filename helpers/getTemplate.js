const getTemplate=( name, token)=> {
    return   `
     <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="robots" content="noindex,nofollow">
    <title>Ample Template by WrapPixel</title>
    <link rel="canonical" href="https://www.wrappixel.com/templates/ampleadmin/" />
    <!-- Favicon icon -->
    <link rel="icon" type="image/png" sizes="16x16" href="../assets/logo-disney.png">
</head>

<body style="margin:0px; background: #f8f8f8; ">
    <div width="100%" style="background: #f8f8f8; padding: 0px 0px; font-family:arial; line-height:28px; height:100%;  width: 100%; color: #514d6a;">
        <div style="max-width: 700px; padding:50px 0;  margin: 0px auto; font-size: 14px">
            <table border="0" cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 20px">
                <tbody>
                    <tr>
                        <td style="vertical-align: top; padding-bottom:30px;" align="center">
                        <a href="#" target="_blank">
                        <h1> Disney API</h1>
                      </a>
                            </td>
                    </tr>
                </tbody>
            </table>
            <table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                <tbody>
                    <tr>
                        <td style="background:#2962FF; padding:20px; color:#fff; text-align:center;"> Welcome to the Disney Api, ${name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) } ! </td>
                    </tr>
                </tbody>
            </table>
            <div style="padding: 40px; background: #fff;">
                <table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                    <tbody>
                        <tr>
                            <td>
                                <p>You account has been created, Welcome to Disney Api! Please verify your email address below.
                                              </tr>

                        <td colspan="2">
                            <center>
                                <a href="http://${process.env.HOST}:${process.env.PORT}/auth/confirm/${token}" style="display: inline-block; padding: 11px 30px; margin: 20px 0px 30px; font-size: 15px; color: #fff; background: #2962FF; border-radius: 60px; text-decoration:none;">Verify email</a>
                            </center>
                         
                    </tr>
                    </tbody>
                </table>
            </div>
            <div style="text-align: center; font-size: 12px; color: #b2b2b5; margin-top: 20px">
                <p> Powered by warppixel
                    <br>
                    <a href="javascript: void(0);" style="color: #b2b2b5; text-decoration: underline;">Unsubscribe</a> </p>
            </div>
        </div>
    </div>
</body>

</html>
    `
}

module.exports= getTemplate