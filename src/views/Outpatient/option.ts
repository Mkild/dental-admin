import { ComposerTranslation } from 'vue-i18n'

export const options = (t: ComposerTranslation) => [
  {
    prop: 'id',
    label: 'ID',
    width: 100,
  },
  {
    prop: 'date',
    label: t('table.outpatient.date'),
  },
  {
    prop: 'total',
    label: t('table.outpatient.total'),
  },
  {
    prop: 'editor',
    label: t('table.outpatient.editor'),
  },
  {
    prop: 'action',
    label: t('table.outpatient.action'),
    width: 210,
  },
]
