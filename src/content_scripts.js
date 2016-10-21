


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
  // console.log(target);
  if (!target) {
    return;
  }

function fix() {
  const container = document.querySelector('[class*=styles__tv-container___]>[class*=styles__resize-screen___]');
  // const ob = new MutationObserver((mutations) => {
  //   console.log('fire');
    // container.style.width = window.innerWidth + 'px!important';
    // container.style.height = window.innerHeight + 'px!mportant';
    const width = window.innerWidth + 'px!important';
    const height = window.innerHeight + 'px!important';
  // });
  // const cf = { attributes: true, childList: false, characterData: false };
  // ob.observe(container, cf);
  const s = document.styleSheets[0];
  const ss = `
  [class*=styles__tv-container___]>[class*=styles__resize-screen___] {
    width: ${width};
    height: ${height};
  }
  `
  s.insertRule(ss, s.cssRules.length);
}
  fix();
  window.addEventListener('resize', fix);



  let i = 0;
  let lines = [];
  const observer = new MutationObserver((mutations) => {
    const elements = target.querySelectorAll('[class*=styles__animation___]>div>div');
    if (elements.length > 10) {
      return;
    }
    // console.log(elements);
    for (let element of elements) {
      const comment = element.querySelector('p').innerHTML;
      // console.log(comment);
console.log(lines);
      let index = lines.findIndex((item) => {
        return !item;
      });
      console.log(index);
      if (index === -1) {
        lines.push(comment);
        index = lines.length - 1;
      } else {
        lines[index] = comment;
      }
      const top = (20 * index) + 'px';


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
      top: ${top};
      `);

      div.addEventListener('animationend', () => {
        // console.log('end = ' + comment);
        div.parentNode.removeChild(div);
        lines[index] = null;
        // console.log(index);
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
