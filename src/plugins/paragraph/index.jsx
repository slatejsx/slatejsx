import { Element, LinkElement, StarElement } from './element'
import { Leaf } from "./leaf"
import { LeafBar, LinkBar, StarBar } from './toolbar'
import { withParagraph, withLink, withStar } from './plugin'
import { Menu } from './menu'

const Paragraph = {
    type: 'paragraph',
    IsBlock: true,
    AddMenu: Menu,
    EditMenu: Menu,
    Element,
    Leaf,
    LeafBar,
    Plugin: withParagraph,
}

const Link = {
    type: 'link',
    IsBlock: false,
    Element: LinkElement,
    Plugin: withLink,
    LeafBar: LinkBar,
}

const Star = {
    type: 'star',
    IsBlock: false,
    Element: StarElement,
    Plugin: withStar,
    LeafBar: StarBar,
}

export { Paragraph, Link, Star }