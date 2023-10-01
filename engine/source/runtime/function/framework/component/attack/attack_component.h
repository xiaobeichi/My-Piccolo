#pragma once

#include "runtime/function/framework/component/component.h"
#include "runtime/resource/res_type/data/attack.h"

namespace Piccolo
{

    REFLECTION_TYPE(AttackComponent)
    CLASS(AttackComponent : public Component, WhiteListFields)
    {
        REFLECTION_BODY(AttackComponent)
    public:
        AttackComponent() = default;

        void postLoadResource(std::weak_ptr<GObject> parent_object) override;

        ~AttackComponent() override;

        void tick(float delta_time) override;

    private:
        META(Enable)
        Attack m_attack;
    };
} // namespace Piccolo