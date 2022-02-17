import { EditMenu, AddMenu } from "./menu"
import { Element } from "./element"
import { withCard } from "./plugin"

const Card = {
    type: 'card',
    IsBlock: true,
    AddMenu,
    EditMenu,
    Element,
    Plugin: withCard,
}

export { Card }