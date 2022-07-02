class PlusOne {
  constructor(color, element, id) {
    this.color = color;
    this.elemnt = element;
    // this.id = 'plus_' + id;
    this.animateElement = document.createElement('div');
    this.animateElement.classList.add('plus_animation');
    this.createTheElement();
    this.startAnimation();
  }
  createTheElement() {
    this.animateElement.innerHTML = `
    <div class="plus_animation" >
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <g>
    <text font-weight="normal" stroke="${this.color}" x="50%" y="50%" xml:space="preserve" text-anchor="start" font-family="'Catamaran'" font-size="50" id="svg_1" fill="${this.color}">+1</text>
    </g>
    </svg></div>
  `;
    this.elemnt.appendChild(this.animateElement);
    // this.startAnimation();
  }
  startAnimation() {
    const animateTime = generateRandomIntegerInRange(800, 1000);
    const left = generateRandomIntegerInRange(20, 80);
    this.animateElement.animate(
      [
        // keyframes
        { top: '50%', left: '50%', opacity: '1' },
        { top: '0%', left: left + '%', opacity: '0' },
      ],
      {
        // timing options
        duration: animateTime,
        iterations: 1,
        fill: 'both',
      },
    );
    setTimeout(() => {
      this.animateElement.remove();
    }, animateTime);
  }
}
function generateRandomIntegerInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
