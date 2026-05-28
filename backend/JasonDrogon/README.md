# 默认后端

## 单体架构 README

### 注意分层

```tex
Controller：HTTP 入口层，负责接收请求、返回响应
Service：业务逻辑层，负责真正处理业务
Router：在 Drogon 里通常写在 Controller 的 METHOD_LIST 里
Filter：中间件层 负责鉴权 日志 CORS 限流等横切逻辑
```
