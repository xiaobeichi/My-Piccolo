#pragma once

#include "runtime/core/meta/reflection/reflection.h"

namespace Piccolo
{
    REFLECTION_TYPE(Attack)
    CLASS(Attack, Fields)
    {
        REFLECTION_BODY(Attack);

    public:
        float m_health {0.0f};
        float m_baseAttack {0.0f};
    };
} // namespace Piccolo