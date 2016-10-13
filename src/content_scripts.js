


const wrapper = document.createElement('div');
wrapper.id = "acf-comment-wrapper";
wrapper.setAttribute('style', 'position: absolute; top: 0;');
document.body.appendChild(wrapper);

const target = document.querySelector('#main');
const observer = new MutationObserver(mutations => {
  console.log('main mutation');
  hook();
})
const config = {childList: true};
observer.observe(target, config);

function hook() {
  // const target = document.getElementById('some-id');
  const target = document.querySelector('[class*=styles__comment-list-wrapper___]>div');
  // console.log(document.body.innerHTML);
  console.log(target);
  if (!target) {
    return;
  }

  const containers = document.querySelectorAll('[class*=styles__tv-container___]>[class*=styles__container___]');
  for (let container of containers) {
    container.style.width = window.innerWidth;
  }
  console.log(containers);;

  let i = 0;
  const observer = new MutationObserver((mutations) => {
    const elements = target.querySelectorAll('[class*=styles__animation___]>div>div');

    // console.log(elements);
    for (let element of elements) {
      const comment = element.querySelector('p').innerHTML;
      // console.log(comment);

      const animationName = `translate-${++i}`;

      const div = document.createElement('div');
      div.innerHTML = comment;
      div.setAttribute('style', `
      position: absolute;
      left: 0;
      white-space: nowrap;
      display: inline-block;
      font-size: 20px;
      color: white;
      animation: ${animationName} 5s;
      animation-timing-function: linear;
      `);

      div.addEventListener('animationend', () => {
        // console.log('end = ' + comment);
        div.parentNode.removeChild(div);
      });
      document.querySelector('#acf-comment-wrapper').appendChild(div);

      const width = window.innerWidth - 310;
      const cW = div.offsetWidth;
      // console.log(cW);
      // console.log(element.offsetWidth);
      const keyframes = `
      @keyframes ${animationName} {
        0% { transform: translate(${width}px, 0px); }
        100% { transform: translate(-${cW}px, 0px); }
      }
      `
      // console.log(keyframes);
      const sheet = document.styleSheets[0];
      sheet.insertRule(keyframes, sheet.cssRules.length);
    }
  });

  const config = { attributes: false, childList: true, characterData: false };

  observer.observe(target, config);
}
