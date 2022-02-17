const onKeyDown = (editor, event) => {
    // 监听tab的快捷方式
    if (event.key == 'Tab' && editor.onTabDown()) {
        event.preventDefault();
    }
}

export { onKeyDown }