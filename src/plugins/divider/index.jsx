import { EditMenu, AddMenu } from "./menu"
import { Element } from "./element"
import { withDivider } from "./plugin"

const Divider = {
    type: 'divider',
    IsBlock: true,
    Level: 1,
    AddMenu,
    EditMenu,
    Element,
    Plugin: withDivider,
}

export { Divider }