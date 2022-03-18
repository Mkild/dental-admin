export const steps = (t: I18nt) => [
  {
    element: '#guide',
    popover: {
      className: 'first-step-popover-class',
      title: t('header.guide.title'),
      description: t('header.guide.desc'),
      position: 'left',
    },
  },
  {
    element: '#collapse',
    popover: {
      className: 'second-step-popover-class',
      title: t('aside.collapse.title'),
      description: t('aside.collapse.desc'),
      position: 'right',
    },
  },
  {
    element: '#routes',
    popover: {
      className: 'third-step-popover-class',
      title: t('header.routes.title'),
      description: t('header.routes.desc'),
      position: 'bottom',
    },
  },
  {
    element: '#fullscreen',
    popover: {
      className: 'four-step-popover-class',
      title: t('header.fullscreen.title'),
      description: t('header.fullscreen.desc'),
      position: 'left',
      offset: 8,
    },
  },
]
