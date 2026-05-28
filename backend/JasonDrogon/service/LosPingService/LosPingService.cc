#include "LosPingService/LosPingService.h"
namespace LosService {

/**
 * @brief LosPingService
 *
 * @return Json::Value
 */
Json::Value LosPingService::ping() const {
  Json::Value result;
  result["code"] = 0;
  result["message"] = "pong";
  return result;
}

} // namespace LosService