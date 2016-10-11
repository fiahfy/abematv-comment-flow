let a = 'b'

console.log(a);

setTimeout(() => {
// const target = document.getElementById('some-id');
const target = document.querySelector('[class*=styles__comment-list-wrapper___]>div');
console.log(document);
console.log(target);

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    console.log(mutation.type);
  });
});

const config = { attributes: false, childList: true, characterData: false };

observer.observe(target, config);
}, 5000)
