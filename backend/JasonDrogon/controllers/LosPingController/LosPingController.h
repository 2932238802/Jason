#pragma once

#include <drogon/HttpController.h>

namespace LosController {


/**
 * @brief LosPingController
 * - 服务器测试器
 */
class LosPingController : public drogon::HttpController<LosPingController> {
public:
  METHOD_LIST_BEGIN
  ADD_METHOD_TO(LosPingController::ping, "/api/ping", drogon::Get);
  METHOD_LIST_END


public: // jk
  void ping(const drogon::HttpRequestPtr &req,
            std::function<void(const drogon::HttpResponsePtr &)> &&callback);
};

} // namespace LosController
