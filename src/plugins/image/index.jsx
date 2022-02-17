import { EditMenu, AddMenu } from "./menu"
import { Element } from "./element"
import { withImage } from "./plugin"

const Image = {
    type: 'image',
    IsBlock: true,
    AddMenu,
    EditMenu,
    Element,
    Plugin: withImage,
}

export { Image }