(() => {

  const actions = {
    birdFlies(key) {
      if(key) {
        document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`;
      } else {
        document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`;
      }
    },
    birdFlies2(key) {
      if(key) {
        document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px, -${window.innerHeight * 0.7}px)`;
      } else {
        document.querySelector('[data-index="5"] .bird').style.transform = `translate(0, 0)`;
      }
    }
  }

  const stepElems = document.querySelectorAll('.step');
  const grahicElems = document.querySelectorAll('.graphic-item');
  let currentItem = grahicElems[0];
  let ioIndex;

  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = entries[0].target.dataset.index * 1;
  });

  for (let i = 0; i < stepElems.length; i++) {
    io.observe(stepElems[i]);
    stepElems[i].dataset.index = i;
    grahicElems[i].dataset.index = i;
  }

  function activate(action) {
    currentItem.classList.add('visible');
    if(action) {
      actions[action](true);
    }
  }

  function inactivate(action) {
    currentItem.classList.remove('visible');
    if(action) {
      actions[action](false);
    }
  }

  window.addEventListener('scroll', () => {
    let step;
    let boundingRect;

    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      step = stepElems[i];
      if (!step) continue;
      boundingRect =  step.getBoundingClientRect().top;

      if(boundingRect > window.innerHeight * 0.1 && boundingRect < window.innerHeight * 0.8) {
        inactivate(currentItem.dataset.action);
        currentItem = grahicElems[step.dataset.index];
        activate(currentItem.dataset.action);
      }
    }
  });

  window.addEventListener('load', () => {
    setTimeout(() => {
      scrollTo(0, 0)
    },100);
  });

  activate();

})();