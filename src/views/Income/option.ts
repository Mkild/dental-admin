export const options = (t: I18nt) => [
  {
    prop: 'id',
    label: 'ID',
    width: 100,
  },
  {
    prop: 'date',
    label: t('table.income.date'),
  },
  {
    prop: 'total',
    label: t('table.income.total'),
  },
  {
    prop: 'editor',
    label: t('table.income.editor'),
  },
  {
    prop: 'action',
    label: t('table.income.action'),
    width: 210,
  },
]
