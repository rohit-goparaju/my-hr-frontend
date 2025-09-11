export function matchPasswords(p1 , p2){
    return (p1 === p2);
}

export function validateImageFileFormat(file){
    const imgFormat = /\.(jpg|jpeg|png)$/i;
    return imgFormat.test(file.name);
}
