export async function fetch({method = 'GET', url, body = null}) {
    const options = {
        body: body ? JSON.stringify(body) : body,
        method,
        headers: {'Content-Type': 'application/json'}
    };

    const response = await window.fetch(url, options);

    if (response.ok) {
        if (response.status == "204") return null;

        const resBody = await response.json();
        return resBody;
    }
    return null;
}
