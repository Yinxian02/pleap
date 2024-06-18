const markDownToHtml = (markdown) => {
    const html = markdown
        .replace(/(?:\r\n|\r|\n)/g, '<br>')
        .replace(/(?:\*\*)(.*?)(?:\*\*)/g, '<strong>$1</strong>')
        .replace(/(?:\*)(.*?)(?:\*)/g, '<em>$1</em>')
        // .replace(/(?:\~\~)(.*?)(?:\~\~)/g, '<del>$1</del>')
        // .replace(/(?:\`)(.*?)(?:\`)/g, '<code>$1</code>')
        // .replace(/(?:\[(.*?)\]\((.*?)\))/g, '<a href="$2" target="_blank">$1</a>');
    // console.log(html);
    return html;
}

export { markDownToHtml };