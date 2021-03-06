function getScript(source, callback) {
    var script = document.createElement('script');
    var prior = document.getElementsByTagName('script')[0];
    script.async = 1;

    script.onload = script.onreadystatechange = function (_, isAbort) {
        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
            script.onload = script.onreadystatechange = null;
            script = undefined;

            if (!isAbort && callback) setTimeout(callback, 0);
        }
    };

    script.src = source;
    prior.parentNode.insertBefore(script, prior);
}

function onStartLoading() {
    document.getElementById('loading-spinner').classList.remove('d-none');
    document.getElementById('start-loading').disabled = true;
    getScript('https://code.jquery.com/jquery-3.5.1.min.js', () => {
        getScript('https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/js/bootstrap.min.js', () => {
            getScript('javascript/load-page.js', () => {})
        })
    });
}

