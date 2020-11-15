function updateAltText() {
  let images = document.querySelectorAll('img[alt]:not([alt=""]):not([src^="https://abs-0.twimg.com/emoji/"]):not([src^="https://pbs.twimg.com/profile_images/"]), video');

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    let imageWrapper = image.parentElement;

    // ignore if we've already added the alt text div
    if (image.closest('.tvat--wrapper1') === null) {
      let altText = image.getAttribute('alt') || image.getAttribute('aria-label');
      if (altText !== 'Embedded video') {

        // wrap tweetPhoto in <div> position: relative; height: 100%
        const wrapper1 = document.createElement("div");
        wrapper1.classList.add('tvat--wrapper1');
        imageWrapper.parentElement.insertBefore(wrapper1, imageWrapper);
        wrapper1.appendChild(imageWrapper);

        // wrap that in <div> display: flex; flex-direction: column; height: 100%
        const wrapper2 = document.createElement("div");
        wrapper2.classList.add('tvat--wrapper2');
        wrapper1.parentElement.insertBefore(wrapper2, wrapper1);
        wrapper2.appendChild(wrapper1);

        // alt text is child of second div, sibling of first
        // create alt text element
        if (altText === 'Image') {
          altText = '⚠️ Missing relevant alt text';
        }

        const altTextElement = document.createElement("div");
        altTextElement.classList.add('tvat--alttext');
        altTextElement.setAttribute('aria-hidden', true);
        const altTextContentNode = document.createTextNode(altText);

        altTextElement.appendChild(altTextContentNode);
          
        wrapper2.appendChild(altTextElement);
      }
    }
  }

  // hide things in the way
  const previewInterstitials = document.querySelectorAll('[data-testid="previewInterstitial"]');
  previewInterstitials.forEach((previewInterstitial) => {
    if (previewInterstitial.querySelector('.tvat--hidden') === null) {
      const items = document.evaluate("//*[text()[contains(.,'GIF') or contains(.,'ALT')]]", previewInterstitial, null, XPathResult.ANY_TYPE, null);
      const a = [];
      let item;
      while (item = items.iterateNext()) {
        a.push(item)
      }
      a.forEach((el) => {
        el.closest('[data-testid="previewInterstitial"] > *').classList.add('tvat--hidden')
      });
    }
  });
}

updateAltText();
setInterval(() => {
  updateAltText();
}, 1000);
