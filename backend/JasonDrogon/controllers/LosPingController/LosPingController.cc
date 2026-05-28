#include "LosPingController/LosPingController.h"
#include "LosPingService/LosPingService.h"


namespace LosController {


void LosPingController::ping(const drogon::HttpRequestPtr &req,
                             std::function<void(const drogon::HttpResponsePtr &)> &&callback) {
  (void)req;
  LosService::LosPingService service;
  Json::Value result = service.ping();
  auto response = drogon::HttpResponse::newHttpJsonResponse(result);
  callback(response);
}

} // namespace LosController
