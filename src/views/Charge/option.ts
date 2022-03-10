import { ComposerTranslation } from 'vue-i18n'

export const options = (t: ComposerTranslation) => [
  {
    prop: 'id',
    label: 'ID',
    width: 100,
  },
  {
    prop: 'project',
    label: t('table.charge.project'),
  },
  {
    prop: 'name',
    label: t('table.charge.name'),
  },
  {
    prop: 'amount',
    label: t('table.charge.amount'),
  },
  {
    prop: 'signature',
    label: t('table.charge.signature'),
  },
  {
    prop: 'date',
    label: t('table.charge.date'),
    width: 120,
  },
  {
    prop: 'action',
    label: t('table.charge.action'),
    width: 210,
  },
]
