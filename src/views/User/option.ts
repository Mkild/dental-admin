import type { ComposerTranslation } from 'vue-i18n'

export const options = (t: ComposerTranslation) => [
  {
    prop: 'id',
    label: 'ID',
    width: 100,
  },
  {
    prop: 'username',
    label: t('table.user.username'),
  },
  {
    prop: 'name',
    label: t('table.user.name'),
  },
  {
    prop: 'gender',
    label: t('table.user.gender'),
    width: 120,
  },
  {
    prop: 'phone',
    label: t('table.user.phone'),
    width: 140,
  },
  {
    prop: 'state',
    label: t('table.user.state'),
  },
  {
    prop: 'role',
    label: t('table.user.role'),
  },
  {
    prop: 'action',
    label: t('table.user.action'),
    width: 210,
  },
]
