const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

function toWord(n: number) : any {
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
    if (n < 1000) return ones[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' ' + toWord(n % 100) : '');
    if (n < 1000000) return toWord(Math.floor(n / 1000)) + ' thousand' + (n % 1000 ? ' ' + toWord(n % 1000) : '');
    if (n < 1000000000) return toWord(Math.floor(n / 1000000)) + ' million' + (n % 1000000 ? ' ' + toWord(n % 1000000) : '');
    if (n < 1000000000000) return toWord(Math.floor(n / 1000000000)) + ' billion' + (n % 1000000000 ? ' ' + toWord(n % 1000000000) : '');
    if (n < 1000000000000000) return toWord(Math.floor(n / 1000000000000)) + ' trillion' + (n % 1000000000000 ? ' ' + toWord(n % 1000000000000) : '');
}
const PriceUtil = {
    toWord,
}
export default PriceUtil;
