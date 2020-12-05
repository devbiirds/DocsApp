export function goToPage(page) {
        setTimeout(document.location.href = page, 500)
    }

const hostURL = process.env.DOMAIN;
console.log("process.env.DOMAIN", process.env.DOMAIN)
export default hostURL;