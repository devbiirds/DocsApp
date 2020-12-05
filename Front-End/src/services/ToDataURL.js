import defSrc from '../services/DefaultSrc.js';

export function toDataURL (src, callback, outputFormat) {
    let img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        let canvas = document.createElement('CANVAS');
        let ctx = canvas.getContext('2d');
        let dataURL;
        canvas.height = this.naturalHeight;
        canvas.width = this.naturalWidth;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        return dataURL;
    };
    img.src = src;
    if (img.complete || img.complete === undefined) {
        img.src = defSrc;
        img.src = src;
    }
}