const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

// 允许跨域请求
app.use(cors());
// 解析 JSON 请求体
app.use(express.json());

// 创建 Nodemailer 传输器
const transporter = nodemailer.createTransport({
    service: 'QQ', // 使用 QQ 邮箱服务
    auth: {
        user: 'naprol@qq.com', // 你的 QQ 邮箱
        pass: '你的邮箱授权码', // 在 QQ 邮箱设置中获取授权码
    },
});

// 处理表单提交
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: 'naprol@qq.com', // 发件人
        to: 'naprol@qq.com', // 收件人
        subject: `新消息来自 ${name} (${email})`, // 邮件主题
        text: message, // 邮件内容
    };

    // 发送邮件
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('发送邮件失败:', error);
            res.status(500).json({ message: '发送失败，请稍后重试。' });
        } else {
            console.log('邮件已发送:', info.response);
            res.json({ message: '消息已成功发送！' });
        }
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});
