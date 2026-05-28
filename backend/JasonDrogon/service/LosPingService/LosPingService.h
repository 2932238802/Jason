#pragma once

#include <json/json.h>

namespace LosService {
class LosPingService {
public:
  Json::Value ping() const;
};
} // namespace LosService
