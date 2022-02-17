import { Element, CodeLineElement } from "./element"
import { AddMenu, EditMenu } from './menu'
import { withCode, withCodeLine } from './plugin'
import { CodeDcorate } from "./deorate"
import { Leaf } from "./leaf"

const Code = {
    type: 'code',
    IsBlock: true,
    AddMenu,
    EditMenu,
    Element,
    Plugin: withCode,
    Decorate: CodeDcorate,
    Leaf
}

const CodeLine = {
    type: 'codeLine',
    IsBlock: false,
    Element: CodeLineElement,
    Plugin: withCodeLine,
}

export { Code, CodeLine }