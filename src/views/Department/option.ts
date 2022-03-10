import { ComposerTranslation } from 'vue-i18n'

export const options = (t: ComposerTranslation) => [
  {
    prop: 'id',
    label: 'ID',
    width: 100,
  },
  {
    prop: 'name',
    label: t('table.department.name'),
  },
  {
    prop: 'director',
    label: t('table.department.director'),
    width: 120,
  },
  {
    prop: 'date',
    label: t('table.department.date'),
    width: 120,
  },
  {
    prop: 'action',
    label: t('table.department.action'),
    width: 210,
  },
]
