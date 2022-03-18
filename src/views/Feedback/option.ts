export const options = (t: I18nt) => [
  {
    prop: 'id',
    label: 'ID',
    width: 100,
  },
  {
    prop: 'title',
    label: t('table.feedback.title'),
  },
  {
    prop: 'date',
    label: t('table.feedback.date'),
    width: 120,
  },
  {
    prop: 'action',
    label: t('table.feedback.action'),
    width: 150,
  },
]
