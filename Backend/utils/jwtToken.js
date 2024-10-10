export const sendToken = (message, user, res, statusCode) => {
    const token = user.getJWTToken();
    const option = {
        expire: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        htttOnly: true,

    };
    res.status(statusCode).cookie("token", token, option).json({
        success: true,
        user,
        message,
        token,
    })
};