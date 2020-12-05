import { toDataURL } from '../services/ToDataURL.js';

export function saveImg(file, callback){
    let image1;
    let f = file.current.files[0];
    if (f) {
        image1 = URL.createObjectURL(f);
        toDataURL(
            image1,
            function (dataUrl) {
                callback(dataUrl);
            }
        );
    }
}
