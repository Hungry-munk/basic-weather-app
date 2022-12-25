function celsiusToFarenheit(number) {
    return Math.round((number * 9) / 5.0 + 32.0);
}
function FarenheitToCelsus(number) {
    return Math.round(((number - 32.0) * 5.0) / 9.0);
}
function mileToKilometer(number) {
    return Math.round(number / 1.6);
}
function kilometerToMile(number) {
    return Math.round(number * 1.6);
}

export function convertMetric() {
    const tempContainers = [...document.querySelectorAll('.tempContainer')];
    const distanceContainer = document.querySelector('.distanceContainer');
    tempContainers.forEach((container) => {
        container.textContent = FarenheitToCelsus(parseInt(container.textContent));
    });
    distanceContainer.textContent = mileToKilometer(parseInt(distanceContainer.textContent));
}

export function convertImperical() {
    const tempContainers = [...document.querySelectorAll('.tempContainer')];
    const distanceContainer = document.querySelector('.distanceContainer');
    tempContainers.forEach((container) => {
        container.textContent = celsiusToFarenheit(parseInt(container.textContent));
    });
    distanceContainer.textContent = kilometerToMile(parseInt(distanceContainer.textContent));
}
