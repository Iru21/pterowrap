//from pterodactyl.js - modified
export default function format_url(url_: string): string {
    let url;
    if (/(?!127\.0{1,3}\.0{1,3}\.0{0,2}$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g.test(url_)) {
        if (/^http(s|):\/\//g.test(url_)) {
            url = url_;
        }
        else {
            url = `https://${url_}`;
        }
    }
    else {
        if (/^http(s|):\/\//g.test(url_)) {
            url = url_;
        }
        else {
            url = `https://${url_}`;
        }
    }
    if(/\/$/g.test(url)) url = url.slice(0, url.lastIndexOf('/'))
    if (!(/\/(api)$/g.test(url))) {
        if (/\/$/g.test(url)) {
            return url + 'api';
        }
        else {
            return url + '/api';
        }
    } else return url
}