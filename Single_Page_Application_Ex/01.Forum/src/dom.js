export function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        result[attr] = value;
    }


    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            //const node = document.createTextNode(e);
            result.innerHTML = e;
        } else {
            result.appendChild(e);
        }
    });

    return result;
}