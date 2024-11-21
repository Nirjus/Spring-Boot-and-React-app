export function base64ToFile(base64Data, imageType, imageOriginalName) {
    // Decode base64 string
    const byteString = atob(base64Data);
    
    // Create an array of 8-bit unsigned integers
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
    }
    
    // Create Blob from byte array
    const blob = new Blob([byteArray], { type: imageType });
    
    // Create a File if you need a File object (for form submissions, etc.)
    const file = new File([blob], imageOriginalName, { type: imageType });
    
    return file;
}