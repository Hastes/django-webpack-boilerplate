import barba from '@barba/core';

console.log('hello world');

// dummy example to illustrate rules and hooks
barba.init({
  transitions: [{
    name: 'dummy-transition',

    // apply only when leaving `[data-barba-namespace="home"]`
    from: 'home',

    // apply only when transitioning to `[data-barba-namespace="products | contact"]`
    to: {
      namespace: [
        'products',
        'contact'
      ]
    },

    // apply only if clicked link contains `.cta`
    custom: ({ current, next, trigger }) => trigger.classList && trigger.classList.contains('cta'),

    // do leave and enter concurrently
    sync: true,

    // available hooks…
    beforeAppear() {},
    appear() {},
    afterAppear() {},
    beforeLeave() {},
    leave() {},
    afterLeave() {},
    beforeEnter() {},
    enter() {},
    afterEnter() {}
  }]
});
