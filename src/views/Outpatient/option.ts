export const options = (t: I18nt) => [
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
