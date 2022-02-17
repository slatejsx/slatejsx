import { EditMenu, AddMenu } from "./menu"
import { Element } from "./element"
import { withVideo } from "./plugin"

const Video = {
    type: 'video',
    IsBlock: true,
    AddMenu,
    EditMenu,
    Element,
    Plugin: withVideo,
}

export { Video }