const ToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.substring(reader.result.indexOf(",") + 1));
    reader.onerror = reject;
});

export default ToBase64;