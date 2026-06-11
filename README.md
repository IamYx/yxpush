# 云信用户标签管理后台

基于云信 IM 服务端 API 的用户标签管理和推送工具。纯前端实现，可直接部署到 GitHub Pages。

## 功能

- **添加用户标签** - 批量为用户添加标签
- **覆盖用户标签** - 完全替换用户的历史标签
- **查询用户标签** - 查看用户已有的标签
- **删除用户标签** - 删除指定的标签
- **清空用户标签** - 清空用户的全部标签
- **标签推送** - 根据标签条件发送推送消息

## 在线使用

访问 GitHub Pages：`https://<你的用户名>.github.io/yxpush/`

## 本地使用

直接用浏览器打开 `index.html` 即可。

## 配置说明

首次使用需要在页面顶部填写：

1. **App Key** - 云信应用的 App Key
2. **App Secret** - 云信应用的 App Secret
3. **服务地址** - 选择中国大陆或海外节点

配置会自动保存在浏览器 localStorage 中，下次打开无需重新填写。

## 注意事项

1. **安全性**：App Secret 保存在浏览器本地，请勿在公共设备上使用
2. **跨域问题**：如果云信 API 不支持浏览器直接调用，可能会遇到 CORS 错误，需要联系云信开通或使用代理方案
3. **频率限制**：标签推送接口限制 1次/10分钟，100次/天

## API 限制

| 限制项 | 数值 |
|--------|------|
| 单次操作用户数 | 最多 100 |
| 单用户单次标签数 | 最多 10 |
| 单用户总标签数 | 最多 100 |
| 单应用总标签数 | 最多 1000 |
| 单个标签长度 | 最多 50 字符 |

## 参考文档

- [添加用户标签](https://doc.yunxin.163.com/messaging2/server-apis/DM2OTU4MjI)
- [覆盖用户标签](https://doc.yunxin.163.com/messaging2/server-apis/zY0NTU1MTc)
- [查询用户标签](https://doc.yunxin.163.com/messaging2/server-apis/TMyNzMxOTQ)
- [删除用户标签](https://doc.yunxin.163.com/messaging2/server-apis/zkzMTgzMzE)
- [清空用户标签](https://doc.yunxin.163.com/messaging2/server-apis/TgxNDI1MTQ)
- [标签推送](https://doc.yunxin.163.com/messaging2/server-apis/DA1NDQwNTc)
