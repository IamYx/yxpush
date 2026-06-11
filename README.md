# 云信用户标签管理后台

基于云信 IM 服务端 API 的用户标签管理和推送工具。

## 在线使用

https://iamyx.github.io/yxpush/

## 部署代理（Vercel）

由于云信 API 不支持浏览器直接调用 (CORS)，需要部署代理服务。

### 步骤

1. 打开 https://vercel.com ，用 GitHub 账号登录
2. 点 **Add New...** → **Project**
3. 找到并导入 **IamYx/yxpush** 仓库
4. 点 **Deploy**（无需任何配置，自动识别）
5. 部署完成后，复制你的 Vercel URL（如 `https://yxpush.vercel.app`）
6. 在前端页面的"代理地址"中填入此 URL

### 免费额度

Vercel 免费套餐：每月 100GB 带宽，足够个人使用。

## 功能

- 添加/覆盖/查询/删除/清空用户标签
- 根据标签条件发送推送消息

## 配置说明

首次使用需要在页面顶部填写：
1. **App Key** - 云信应用的 App Key
2. **App Secret** - 云信应用的 App Secret
3. **代理地址** - Vercel 部署后的 URL

配置保存在浏览器 localStorage 中。

## 参考文档

- [添加用户标签](https://doc.yunxin.163.com/messaging2/server-apis/DM2OTU4MjI)
- [覆盖用户标签](https://doc.yunxin.163.com/messaging2/server-apis/zY0NTU1MTc)
- [查询用户标签](https://doc.yunxin.163.com/messaging2/server-apis/TMyNzMxOTQ)
- [删除用户标签](https://doc.yunxin.163.com/messaging2/server-apis/zkzMTgzMzE)
- [清空用户标签](https://doc.yunxin.163.com/messaging2/server-apis/TgxNDI1MTQ)
- [标签推送](https://doc.yunxin.163.com/messaging2/server-apis/DA1NDQwNTc)
