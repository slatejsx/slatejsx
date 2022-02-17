import { AddMenu } from "./menu"
import { Element } from "./element"
import { withHr } from "./plugin"

const Hr = {
    type: 'hr',
    IsBlock: true,
    Level: 1,
    AddMenu,
    Element,
    Plugin: withHr,
}

export { Hr }