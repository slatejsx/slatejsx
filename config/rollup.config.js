import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
// import css from 'rollup-plugin-css-only'
import css from "rollup-plugin-import-css";
import {
    nodeResolve
} from '@rollup/plugin-node-resolve';

import commonjs from 'rollup-plugin-commonjs';

const env = process.env.NODE_ENV

export default {
    input: "src/index.jsx",
    output: {
        dir: "dist/",
        // 编译目标，es module
        format: 'esm',
        sourcemap: true,
    },
    plugins: [
        babel({
            exclude: "node_modules/**",
            include: ['src/**/*'],
            extensions: ['jsx', 'js'],
            babelHelpers: 'bundled'
        }),
        resolve(),
        nodeResolve({
            extensions: ['.mjs', '.js', '.json', '.node', '.jsx']
        }),
        css(),
        commonjs()
    ],
    external: (id) => /^(qss|react|antd|@ant-design\/icons|core-js|lodash)/.test(id),
}