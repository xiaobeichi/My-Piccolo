#include "runtime/function/framework/component/attack/attack_component.h"

#include "runtime/function/global/global_context.h"
#include "runtime/function/input/input_system.h"

namespace Piccolo
{
    void AttackComponent::postLoadResource(std::weak_ptr<GObject> parent_object) { m_parent_object = parent_object; }

    AttackComponent::~AttackComponent() {}

    void AttackComponent::tick(float delta_time)
    {
        unsigned int command = g_runtime_global_context.m_input_system->getGameCommand();
        if ((command & (unsigned int)GameCommand::addHealth))
        {
            printf("add health");
            m_attack.m_health += 10;
        }
        else if ((command & (unsigned int)GameCommand::subHealth))
        {
            m_attack.m_health -= 10;
        }
    }
} // namespace Piccolo
