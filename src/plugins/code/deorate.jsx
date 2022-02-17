import { Editor } from 'slate'
import Prism from 'prismjs'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markdown'

const CodeDcorate = (editor, [node, path]) => {
    // 判断是否设置了语言，并且是否支持对应语言
    if (!node.language) {
        return []
    }

    const grammar = Prism.languages[node.language];
    if (!grammar) {
        return []
    }

    if (!node.children) {
        return []
    }

    let texts = []
    for (let i = 0; i < node.children.length; i++) {
        const linePath = path.concat(i);

        texts = texts.concat(Editor.string(editor, linePath));
    }

    const tokens = Prism.tokenize(texts.join('\n'), grammar);
    const ranges = [];
    let offset = 0;
    let lineOrder = 0;

    const calculate = (childrenTokens, childrenType = null) => {
        const tokensForEach = (token, accu) => {
            if (typeof token === 'string') {
                if (token.indexOf('\n') > -1) {
                    const ts = token.split(/\n/)

                    offset = ts[ts.length - 1].length
                    lineOrder += ts.length - 1
                    return
                }

                if (!!childrenType) {
                    const linePath = path.concat(lineOrder);
                    ranges.push({
                        anchor: { path: linePath, offset },
                        focus: { path: linePath, offset: offset + token.length },
                        codeType: childrenType,
                    })
                }

                offset += token.length;
            } else {
                if (typeof token.content === 'string') {
                    const { content } = token;

                    if (content.indexOf('\n') > -1) {
                        const cs = content.split(/\n/);
                        for (let i = 0; i < cs.length; i++) {
                            const linePath = path.concat(lineOrder);
                            if (i === 0) {
                                ranges.push({
                                    anchor: { path: linePath, offset },
                                    focus: { path: linePath, offset: offset + cs[i].length },
                                    codeType: token.type,
                                });
                            } else {
                                ranges.push({
                                    anchor: { path: linePath, offset: 0 },
                                    focus: { path: linePath, offset: offset + cs[i].length },
                                    codeType: token.type,
                                });

                                offset = cs[i].length;
                            }

                            i < cs.length - 1 && lineOrder++;
                        }
                    } else {
                        const linePath = path.concat(lineOrder);
                        ranges.push({
                            anchor: { path: linePath, offset },
                            focus: { path: linePath, offset: offset + token.length },
                            codeType: token.type,
                        });

                        offset += token.length;
                    }
                } else {
                    calculate(token.content, token.alias || token.type);
                }
            }
        }

        childrenTokens.forEach(tokensForEach);
    }

    calculate(tokens)
    return ranges
}

export { CodeDcorate }