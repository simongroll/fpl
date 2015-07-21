Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: '404',
  loadingTemplate: 'loading',
  yieldTemplates: {
    'header': { to: 'header' },
    'sidebar': { to: 'sidebar' },
    'footer': { to: 'footer' }
  }
});
