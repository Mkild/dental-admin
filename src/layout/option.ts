import type { ComposerTranslation } from 'vue-i18n'

export const options = (t: ComposerTranslation) => [
  {
    index: '/',
    label: t('aside.menu.home'),
    icon: 'bingfang',
    auth: 'visitor',
  },
  {
    index: '/notice',
    label: t('aside.menu.notice'),
    icon: 'dangan',
    auth: 'director',
  },
  {
    index: '/department',
    label: t('aside.menu.department'),
    icon: 'keshi',
    auth: 'director',
  },
  {
    index: '/drug',
    label: t('aside.menu.drug'),
    icon: 'yaoping',
    auth: 'doctor',
  },
  {
    index: '/record',
    label: t('aside.menu.record'),
    icon: 'bingli',
    auth: 'doctor',
  },
  {
    index: '/charge',
    label: t('aside.menu.charge'),
    icon: 'qingling',
    auth: 'director',
  },
  {
    index: '/income',
    label: t('aside.menu.income'),
    icon: 'fufei',
    auth: 'director',
  },
  {
    index: '/outpatient',
    label: t('aside.menu.outpatient'),
    icon: 'yiyuan',
    auth: 'doctor',
  },
  {
    index: '/user',
    label: t('aside.menu.user'),
    icon: 'yisheng',
    auth: 'director',
  },
  {
    index: '/feedback',
    label: t('aside.menu.feedback'),
    icon: 'xitong',
    auth: 'visitor',
  },
]
